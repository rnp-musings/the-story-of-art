/**
 * Postgres schema (Drizzle) for Story of Art.
 *
 * Source of truth for content is the JSON in /content (reviewed through git).
 * This schema mirrors those records one to one so the site can later be served from a database
 * (search, filters, admin review) without changing the content model. Ids are kebab-case slugs shared
 * by the JSON files, the database primary keys and the URLs.
 */
import { pgTable, text, boolean, doublePrecision, jsonb, timestamp, primaryKey, serial, uniqueIndex, index } from 'drizzle-orm/pg-core';

export const sources = pgTable('sources', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  url: text('url').notNull().unique(),
  checked: boolean('checked').notNull().default(false)
});

export const arts = pgTable('arts', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  tagline: text('tagline').notNull(),
  color: text('color').notNull(),
  motif: text('motif').notNull(),
  facts: jsonb('facts').$type<string[]>().notNull(),
  art: jsonb('art').$type<string[]>().notNull(),
  artist: jsonb('artist').$type<string[]>().notNull(),
  place: jsonb('place').$type<string[]>().notNull(),
  history: jsonb('history').$type<{ when: string; what: string }[]>().notNull(),
  future: jsonb('future').$type<string[]>().notNull(),
  reviewStatus: text('review_status').notNull().default('draft'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
}, t => [index('arts_category_idx').on(t.category)]);

export const artStates = pgTable('art_states', {
  artId: text('art_id').notNull().references(() => arts.id),
  state: text('state').notNull()
}, t => [primaryKey({ columns: [t.artId, t.state] }), index('art_states_state_idx').on(t.state)]);

export const artPins = pgTable('art_pins', {
  id: serial('id').primaryKey(),
  artId: text('art_id').notNull().references(() => arts.id),
  lat: doublePrecision('lat').notNull(),
  lng: doublePrecision('lng').notNull(),
  label: text('label').notNull(),
  approximate: boolean('approximate').notNull().default(false)
}, t => [uniqueIndex('art_pins_unique').on(t.artId, t.lat, t.lng, t.label)]);

export const artImages = pgTable('art_images', {
  id: serial('id').primaryKey(),
  artId: text('art_id').notNull().references(() => arts.id),
  kind: text('kind').notNull(),
  file: text('file').notNull(),
  alt: text('alt').notNull(),
  caption: text('caption').notNull().default(''),
  author: text('author').notNull(),
  license: text('license').notNull(),
  sourceUrl: text('source_url').notNull()
}, t => [uniqueIndex('art_images_unique').on(t.artId, t.kind)]);

export const artSources = pgTable('art_sources', {
  artId: text('art_id').notNull().references(() => arts.id),
  sourceId: text('source_id').notNull().references(() => sources.id)
}, t => [primaryKey({ columns: [t.artId, t.sourceId] }), index('art_sources_source_idx').on(t.sourceId)]);
