/**
 * Import content/ into the database. Idempotent: safe to run repeatedly.
 *  - upserts sources and art forms by id
 *  - keeps an existing reviewer status (review_status is only set on first insert)
 *  - never deletes rows; child rows (states, pins, images, source links) are added if missing
 * Usage: DATABASE_URL=... npm run db:import     (or no DATABASE_URL for a local .pglite folder)
 */
import fs from 'node:fs';
import path from 'node:path';
import { sql } from 'drizzle-orm';
import { openDb, type Db } from './client.ts';
import { arts, artStates, artPins, artImages, artSources, sources } from './schema.ts';
import type { Art, Source } from '../src/lib/data.ts';

const chunk = <T>(xs: T[], n = 500) => Array.from({ length: Math.ceil(xs.length / n) }, (_, i) => xs.slice(i * n, i * n + n));

export function readContent(root = process.cwd()) {
  const dir = path.join(root, 'content', 'arts');
  const all = fs.readdirSync(dir).filter(f => f.endsWith('.json')).flatMap(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as Art[]);
  const src = JSON.parse(fs.readFileSync(path.join(root, 'content', 'sources.json'), 'utf8')) as Source[];
  return { arts: all, sources: src };
}

export async function importContent(db: Db, content = readContent()) {
  for (const part of chunk(content.sources)) {
    await db.insert(sources).values(part).onConflictDoUpdate({
      target: sources.id, set: { title: sql`excluded.title`, url: sql`excluded.url` } // `checked` is owned by reviewers
    });
  }
  for (const a of content.arts) {
    await db.insert(arts).values({
      id: a.id, name: a.name, category: a.category, tagline: a.tagline, color: a.color, motif: a.motif,
      facts: a.facts, art: a.art, artist: a.artist, place: a.place, history: a.history, future: a.future,
      reviewStatus: a.review_status
    }).onConflictDoUpdate({
      target: arts.id,
      set: {
        name: a.name, category: a.category, tagline: a.tagline, color: a.color, motif: a.motif,
        facts: a.facts, art: a.art, artist: a.artist, place: a.place, history: a.history, future: a.future,
        updatedAt: sql`now()`
        // review_status deliberately not updated: a reviewer's decision wins over the file
      }
    });
    await db.insert(artStates).values(a.states.map(state => ({ artId: a.id, state }))).onConflictDoNothing();
    if (a.pins.length) await db.insert(artPins).values(a.pins.map(p => ({ artId: a.id, ...p }))).onConflictDoNothing();
    if (a.images.length) await db.insert(artImages).values(a.images.map(i => ({ artId: a.id, kind: i.kind, file: i.file, alt: i.alt, caption: i.caption, author: i.author, license: i.license, sourceUrl: i.source_url }))).onConflictDoNothing();
    if (a.source_ids.length) await db.insert(artSources).values(a.source_ids.map(sourceId => ({ artId: a.id, sourceId }))).onConflictDoNothing();
  }
  return { arts: content.arts.length, sources: content.sources.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const h = await openDb({ dir: process.env.DATABASE_URL ? undefined : '.pglite' });
  await h.migrate();
  const r = await importContent(h.db);
  console.log(`imported ${r.arts} art forms and ${r.sources} sources into ${h.kind}`);
  await h.close();
}
