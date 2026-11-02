import { and, asc, eq, ilike, or, sql } from 'drizzle-orm';
import type { Db } from './client.ts';
import { arts, artStates } from './schema.ts';

export type SearchOptions = { q?: string; category?: string; state?: string };

/** Search art forms by text, type and state. Mirrors the filters on the home page. */
export async function searchArts(db: Db, { q, category, state }: SearchOptions = {}) {
  const like = q?.trim() ? `%${q.trim().replace(/[%_]/g, m => '\\' + m)}%` : null;
  const stateIds = state
    ? sql`${arts.id} in (select ${artStates.artId} from ${artStates} where ${artStates.state} = ${state})`
    : undefined;
  return db.select({ id: arts.id, name: arts.name, category: arts.category, tagline: arts.tagline })
    .from(arts)
    .where(and(
      like ? or(ilike(arts.name, like), ilike(arts.tagline, like)) : undefined,
      category ? eq(arts.category, category) : undefined,
      stateIds
    ))
    .orderBy(asc(arts.name));
}
