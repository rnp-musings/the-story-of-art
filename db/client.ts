/**
 * One way to open the database for scripts.
 *   - DATABASE_URL set  -> real Postgres (Supabase, Neon, local) via postgres-js
 *   - otherwise / --pglite -> embedded Postgres (PGlite): in memory, or persisted to a folder
 * Both return a Drizzle instance with the same schema, so scripts do not care which they got.
 */
import { drizzle as drizzlePg } from 'drizzle-orm/postgres-js';
import { migrate as migratePg } from 'drizzle-orm/postgres-js/migrator';
import { drizzle as drizzleLite } from 'drizzle-orm/pglite';
import { migrate as migrateLite } from 'drizzle-orm/pglite/migrator';
import postgres from 'postgres';
import { PGlite } from '@electric-sql/pglite';
import * as schema from './schema.ts';

export type Db = ReturnType<typeof drizzleLite<typeof schema>>;
export type Handle = { db: Db; kind: 'postgres' | 'pglite'; migrate: () => Promise<void>; close: () => Promise<void> };

export async function openDb(opts: { pglite?: boolean; dir?: string } = {}): Promise<Handle> {
  const url = process.env.DATABASE_URL;
  if (url && !opts.pglite) {
    const client = postgres(url, { max: 5, prepare: false }); // prepare:false works with pooled Supabase/Neon URLs
    const db = drizzlePg(client, { schema }) as unknown as Db;
    return {
      db, kind: 'postgres',
      migrate: () => migratePg(db as never, { migrationsFolder: 'db/migrations' }),
      close: () => client.end()
    };
  }
  // Note: construct PGlite with a real options object (or none); passing `undefined` first drops extensions silently.
  const lite = opts.dir ? new PGlite(opts.dir) : new PGlite();
  const db = drizzleLite(lite, { schema });
  return { db, kind: 'pglite', migrate: () => migrateLite(db, { migrationsFolder: 'db/migrations' }), close: () => lite.close() };
}
