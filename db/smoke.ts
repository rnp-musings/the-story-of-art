/**
 * Smoke test: in-memory Postgres (PGlite), apply migrations, import content twice,
 * and check that database filters agree with the JSON content.
 * Run: npm run db:smoke
 */
import assert from 'node:assert/strict';
import { openDb } from './client.ts';
import { importContent, readContent } from './import.ts';
import { searchArts } from './queries.ts';
import { arts } from './schema.ts';
import { count, eq } from 'drizzle-orm';

const content = readContent();
const h = await openDb({ pglite: true });
await h.migrate();

await importContent(h.db, content);
const first = (await h.db.select({ n: count() }).from(arts))[0].n;
assert.equal(first, content.arts.length, 'every art form imported');

// Idempotent, and a reviewer's status survives a re-import.
await h.db.update(arts).set({ reviewStatus: 'reviewed' }).where(eq(arts.id, content.arts[0].id));
await importContent(h.db, content);
assert.equal((await h.db.select({ n: count() }).from(arts))[0].n, first, 'second import adds no rows');
const kept = await h.db.select().from(arts).where(eq(arts.id, content.arts[0].id));
assert.equal(kept[0].reviewStatus, 'reviewed', 'reviewer status preserved');

// Filters agree with the JSON.
for (const category of [...new Set(content.arts.map(a => a.category))]) {
  const want = content.arts.filter(a => a.category === category).length;
  assert.equal((await searchArts(h.db, { category })).length, want, `category ${category}`);
}
for (const state of ['Kerala', 'Assam', 'Rajasthan']) {
  const want = content.arts.filter(a => a.states.includes(state)).length;
  assert.equal((await searchArts(h.db, { state })).length, want, `state ${state}`);
}
const kathak = await searchArts(h.db, { q: 'kathak' });
assert.ok(kathak.some(r => r.id === 'kathak'), 'text search finds Kathak');

console.log(`smoke ok (${h.kind}): ${first} art forms, filters agree with content`);
await h.close();
