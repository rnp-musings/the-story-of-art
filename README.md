# Story of Art

Indian art forms told through five lenses: the art, the artist, the place, their history, and a vision for their future. 290 art forms across painting, textile, craft, sculpture, dance, music, theatre and puppetry, and martial art, from every state and union territory.

Live site: https://rnp-musings.github.io/the-story-of-art/

## Stack
Same as the sister project *For the Love of Food*: Astro 7 and TypeScript (static site), content as reviewed JSON in git, Postgres via Drizzle (tested on embedded PGlite), Node 22 and npm, Python `jsonschema` for content validation, GitHub Pages deployed by Actions.

## Layout
```
content/arts/      one JSON file per type (painting.json, dance.json, ...); each record is one art form
content/sources.json  every cited source once, with a `checked` flag for reviewers
schemas/           JSON Schema for each collection
scripts/           validate.py (schema + cross-references), convert.mjs (one-off import of the legacy site)
src/               Astro pages, components, layout, lib (data loading, India map outline)
db/                schema.ts, client.ts, import.ts, queries.ts, smoke.ts, migrations/
docs/              coverage-proposal.md and notes
public/images/     photos (each credited on its page)
```
Conventions: kebab-case slug ids shared by JSON, database primary keys and URLs. Every record has `review_status` (draft, reviewed, published). Sources are separate records.

## Commands
```bash
npm ci
npm run validate     # schema and cross-reference checks
npm run dev          # local site
npm run build        # validate, then build to dist/
npm run db:smoke     # in-memory Postgres: migrate, import, compare filters with the JSON
npm run db:import    # import into DATABASE_URL (or a local .pglite folder)
```

## Adding or correcting an entry
Edit the JSON in `content/arts/`, add any new sources to `content/sources.json`, run `npm run validate`, and open a pull request. Every page has a "Suggest a correction" link that opens an issue.

## Status
All content is a draft. Entries were researched from the sources listed on each page; claims that could not be verified were left out. Expert review is still needed, especially for music, classical dance, and entries with a single source.
