# Story of Art

Indian art forms told through five lenses: **the art, the artist, the place, their history, and a vision for their future.** Painting, textiles, crafts, sculpture, dance, music, theatre and puppetry, and martial art, from every state and union territory, each pinned on a map of India.

- **Live site:** https://rnp-musings.github.io/the-story-of-art/
- **This repo:** https://github.com/rnp-musings/the-story-of-art (branches `main` and `astro-rebuild`, see below)
- **Sister project (same stack):** https://github.com/rnp-musings/for-the-love-of-food

> **If you are picking this project up, read this whole file first.** It was written as a handover at the end of the session that built the site, because that session's memory will not survive. Everything someone needs to continue is meant to be here or in `docs/`.

---

## 1. Where things stand (3 November 2026)

| | |
|---|---|
| Art forms on the site | **290** (Craft 52, Dance 42, Martial art 4, Music 33, Painting 41, Sculpture 28, Textile 58, Theatre and puppetry 32) |
| Coverage | Every state and union territory has at least 2 entries. Largest: Rajasthan 23, Kerala 19, Uttar Pradesh 18, Karnataka 17, Tamil Nadu 17. Smallest: Chandigarh 2, Andaman and Nicobar 3, Puducherry 3, Dadra Nagar Haveli and Daman Diu 3. Nine entries are "Pan-India". |
| Map pins | 729 |
| Cited sources | 752 distinct pages |
| Photos | **Only 19 entries have any photo** (18 "art" photos, 10 "artist" photos). 271 entries have none. |
| Review status | **Every entry is `draft`.** No expert has reviewed any of it. |
| Entries with no sources | 25 older entries (listed in `docs/review-queue.md`) |
| Entries with one source | 18 |

**The single most important fact:** the text was written by AI research agents from web sources and general knowledge, under a strict "only what a source supports, leave out what you cannot verify" rule. It has *not* been checked by practitioners, scholars or the communities concerned. Do not promote the site as authoritative until that happens. `docs/review-queue.md` lists, batch by batch, exactly what the agents were least sure of.

### The two branches

| Branch | What it is | Live? |
|---|---|---|
| `main` | The original **vanilla HTML/CSS/JS** site (no build step). 290 entries. | **Yes**, this is what https://rnp-musings.github.io/the-story-of-art/ serves, via `.github/workflows/pages.yml`. |
| `astro-rebuild` | The **same site rebuilt on Astro 7 + TypeScript** with content as validated JSON, a Drizzle/Postgres layer, tests and CI. 290 entries, identical content. Tested in a browser. | **No.** Not merged. |

**Pending decision (the owner's call):** merge `astro-rebuild` into `main` to replace the live site. The Astro branch deliberately deletes the old `pages.yml` (otherwise the old workflow would publish the raw repo root and race the new build) and adds `deploy.yml`. See section 8 for the merge checklist.

### Other repos you may see
- `prashant-mehra/story-of-art` - the **abandoned first repo**. Early commits only; later pushes there were refused (HTTP 403) and the work moved here. Ignore it.
- `prashant-mehra/repo1` - unrelated (a book summary).
- A private Claude "artifact" copy of an early version of the site was published at claude.ai/artifact/8HUWnvKuCAqHss3brP7fHn. It is **stale** (about 26 entries). Ignore it.

---

## 2. Quick start

### `main` (live site, no tooling)
```bash
git clone https://github.com/rnp-musings/the-story-of-art && cd the-story-of-art
python3 -m http.server 8000      # open http://localhost:8000
```
Everything is plain files: `index.html`, `app.js`, `styles.css` (a copy of the CSS is also inlined in `index.html`; **edit both**), `data*.js`, `images.js`, `indiamap.js`, `images/`.

### `astro-rebuild`
```bash
git checkout astro-rebuild
npm ci                      # Node 22+
pip install jsonschema      # for the content validator
npm run validate            # schema + cross-reference checks  -> "content ok: 290 art forms, 752 sources"
npm run dev                 # local dev server
npm run build               # validate, then build to dist/ (292 pages, about 2 seconds)
npm run db:smoke            # in-memory Postgres: migrate, import, compare filters with the JSON
npm run db:import           # import into DATABASE_URL, or a local ./.pglite folder if unset
```

---

## 3. The content model

Each art form is one record. Fields (Astro branch, `content/arts/*.json`, validated by `schemas/art.schema.json`):

| Field | Meaning |
|---|---|
| `id` | kebab-case slug. It is the **URL**, the **database primary key** and the key everywhere. Must be unique. Never rename casually. |
| `name`, `tagline`, `facts[]` | Display name, one-line hook, 3-4 short fact chips |
| `category` | One of: Painting, Textile, Craft, Sculpture, Dance, Music, Theatre & puppetry, Martial art |
| `states[]` | One or more states/UTs (or "Pan-India") |
| `color`, `motif` | Card/hero colour (dark enough for white text) and one of: fish, triangles, lotus, vine, arch, dots, scroll, diamond, spiral (a tiled SVG shape, drawn in code, no image files) |
| `art[]`, `artist[]`, `place[]` | Paragraph arrays for the first three of the five sections |
| `history[]` | `{when, what}` timeline items for the fourth section |
| `future[]` | Bullets for "Our vision for the future" (the fifth section). These are *proposals*, not facts. |
| `pins[]` | `{lat, lng, label, approximate}` map pins. The hero's short location line is built from the first pin labels plus the states. |
| `images[]` | `{kind: art|artist, file, alt, caption, author, license, source_url}`. Files live in `public/images/` (Astro) or `images/` (legacy). |
| `source_ids[]` | Ids into `content/sources.json` (each source stored once, with a `checked` flag for reviewers) |
| `review_status` | `draft` (all 290 today), `reviewed`, `published` |

In `main` the same information lives in `data*.js` as `ARTS.push({...})` objects (sources as `[title, url]` pairs) plus a `PINS` object and `images.js`. The Astro branch's `scripts/convert.mjs` converts between them.

### Writing rules (keep these)
- Plain, warm, accurate, short sentences. No hype.
- **Only state what a source supports.** Where sources disagree, say so ("sources differ", "traditionally dated to") instead of picking one.
- **Do not invent** artists, quotes, dates, honours, GI/UNESCO status, statistics.
- Name people only when a source clearly supports it. Prefer naming the community/family to naming an individual you cannot verify.
- Describe communities and castes the way sources do, factually, without stereotype.
- **Never publish an unverified claim about a living person**, above all about their death, health or legal status. One batch contained a single-outlet report of a named singer's death; it was removed. Do not re-add it without multiple reliable sources.
- List only sources you actually opened.

---

## 4. How the 290 entries were made (and how to make more)

The work was done in a Claude Code cloud session using parallel research sub-agents:

1. A coverage plan (`docs/coverage-proposal.md`) listed art forms per state and union territory in tiers (Tier 1 landmark, 2, 3).
2. The plan became `docs/tooling/content-pipeline/batches.json`: **32 batches, 226 entries**, each with `id`, `name`, `category`, `state` and a short hint.
3. For each batch an agent was started with the brief in `docs/tooling/content-pipeline/agent-brief.md` (schema, voice, research standard, output format). It researched with web search and fetch and wrote one JS file of entries.
4. The file was validated and merged. On `main` that was `docs/tooling/content-pipeline/addbatch.sh` + `merge.js` (they contain absolute paths from the build machine, so adapt them; they number the next `dataN.js` and add a `<script>` tag). On `astro-rebuild` use `node scripts/convert.mjs --add <batch.js>`, which appends to `content/` and de-duplicates by id.
5. About 8 agents ran at once; each took roughly 3-5 minutes and about 100,000 tokens for 5-9 entries. A ledger of what was merged is `docs/tooling/content-pipeline/progress.md`.

To add more art forms, write a new batch list, give an agent the brief, validate, merge. The earliest 64 entries (the first ten visual forms, the north-east, Kashmir and Karnataka additions, and the Kerala deep dive) were written differently (the first 25 from general knowledge, with no sources).

### What went wrong in research (so you can avoid it)
- Many authoritative sites blocked the agents (503/403/bot walls): handicrafts.gov.in and .nic.in, globalinch.org, UNESCO's whc pages, Britannica, Deccan Herald, AIACA, imp-art.org. Wikipedia, Sahapedia, PARI and many news sites worked. **A human with a normal browser will get much better sources**, especially the GI registry (ipindia.gov.in), UNESCO, Sangeet Natak Akademi, Ministry of Culture / Indian Culture portal and state tourism boards.
- Because of that, many entries lean on Wikipedia for orientation; a few rest on only one source.
- A brief once had Kuthampully in Palakkad (it is in Thrissur) and a pottery link (Chumukedima-Longpi) that no source supports. Agents corrected both. Briefs can be wrong; agents' pushback is useful.
- Entries where the agent found nothing specific are short on purpose and say so (for example Diu stone carving, Karaikal terracotta, Kallai mats, Dhodia bamboo, Auroville paper). Decide whether to merge, rewrite or drop them.

---

## 5. Review and quality: what to do next

Start with `docs/review-queue.md`. Priority order:
1. **Music and classical dance** (thinnest research).
2. Anything naming a **living person or an honour**.
3. Entries with **one source or none**.
4. **GI (Geographical Indication) status and years** (many conflicting). Check ipindia.gov.in.
5. **UNESCO claims**. Check whc.unesco.org and ich.unesco.org.
6. **Map pins** (most are approximate).

Review workflow (Astro branch): fix the JSON, set the source's `checked: true` in `content/sources.json`, then set the entry's `review_status` to `reviewed`. The database importer preserves a reviewer's status on re-import. Every page shows its status and has a **"Suggest a correction"** link that opens a pre-filled GitHub issue; **turn on Issues** in the repo settings or that link leads nowhere useful.

Ideally real reviewers (practitioners, scholars, museums, craft councils) go through each region. The coverage proposal asked the owner to arrange these; none is arranged yet.

---

## 6. Photos

State: 19 of 290 entries have photos, all from the original batches. Every one is from **Wikimedia Commons** with a visible credit line (author, licence link to the Commons page). The 226 newer entries have none.

Rules in force: open licences only (CC0, CC BY, CC BY-SA, public domain, GODL-India). Credit every photo on the page. A named portrait is used only when the file description names that person (for example Jivya Soma Mashe, Jangarh Singh Shyam, Shree Lal Joshi); photos of unnamed artisans are captioned as such ("An artisan at work"). Prefer photos supplied by artists or organisations, with consent, over stock images.

Tooling: `docs/tooling/photos/search_commons.py` (Commons search) and `download_images.py`; `wikimedia-candidates.json` holds roughly 36 queries' worth of candidates with licences and authors. **Wikimedia rate-limits heavily** (HTTP 429, hundreds of seconds at times): send a descriptive User-Agent *with your own contact details* (the scripts carry a generic one), pause 10+ seconds between API calls, and use the thumbnail URLs they return. Cultural-heritage open-access collections (Metropolitan Museum, Rijksmuseum, Smithsonian, V&A, Wellcome) are another source for historic works. Gaps that matter most: Pichwai, Kantha, Mata ni Pachedi, Pashmina, Mysore painting, Channapatna, Kerala murals, Thanjavur and Gond artists, nearly all of the north-east.

Always check an image visually before adding it (an earlier candidate showed the wrong subject).

---

## 7. The map

The map is **inline SVG drawn from an embedded outline of India**, not a tile map. Reason: it works on any static host, needs no external requests, and the Claude artifact host blocked tile images. The outline is a simplified version of the Datameet composite boundary (https://github.com/datameet/maps), which follows the boundary shown in Indian official maps; check Datameet's licence terms before reuse, and take care if you publish for audiences outside India, because depictions of the boundary are legally sensitive. Projection is simple: `x = longitude * 0.92`, `y = -latitude`. On `main` the outline is `indiamap.js`; in Astro it is `src/lib/india.ts`.

Pins come from each entry's `pins`. Many coordinates are approximate and flagged. Home-page pin radius shrinks because 729 pins crowd the map; clustering or per-region zoom would be a good improvement. One pin (Harappan art at Mohenjo-daro, Pakistan) sits outside the outline on purpose; decide whether to keep it.

---

## 8. Deployment

Hosting is **GitHub Pages** through **GitHub Actions** (not the "deploy from branch" mode).

- `main` today uses `.github/workflows/pages.yml` which uploads the repo root. The workflow runs `actions/configure-pages` with `enablement: true`, which is how Pages was switched on in the first place (the build session was not allowed to change repo settings). If the site ever 404s, open **Settings → Pages** and set the source to "GitHub Actions".
- `astro-rebuild` uses `.github/workflows/deploy.yml`: validate content (Python `jsonschema`), `npm ci`, `npm run db:smoke`, `npm run build`, upload `dist/`, deploy. Astro is configured for `site: https://rnp-musings.github.io` and `base: /the-story-of-art` (`astro.config.mjs`). **If you rename the repo or move to a custom domain, change both.**

**Merge checklist for replacing the live site with the Astro build:**
1. `git checkout main && git merge astro-rebuild` (or open a PR). Confirm `pages.yml` is gone and only `deploy.yml` remains.
2. Push to `main`; watch the Actions run succeed.
3. Visit https://rnp-musings.github.io/the-story-of-art/ and check: home page loads with 290 cards and the map, type/state/search filters work, a detail page (for example `/warli/`) shows its photo and sources, the "Suggest a correction" link works, images load (paths use the base prefix), no console errors.
4. URLs change shape: the legacy site used `#warli`; the Astro site uses `/the-story-of-art/warli/`. If anyone linked the old hash URLs, add a small redirect script to the Astro home page.
5. Keep a tag of the last legacy `main` commit (for example `git tag legacy-vanilla <sha>`) in case of rollback.

---

## 9. The Astro branch in detail

```
content/arts/*.json      one file per category; the source of truth for content
content/sources.json     all cited sources once (id, title, url, checked)
schemas/                 JSON Schema for arts and sources
scripts/validate.py      schema + unique ids + source ids exist + image files exist; exits 1 on error
scripts/convert.mjs      one-off importer from the legacy data*.js / agent batch files
src/pages/index.astro    home: filters, map, card grid
src/pages/[id]/index.astro   one static page per art form (getStaticPaths)
src/pages/about.astro
src/components/          IndiaMap.astro (SVG map), ArtCard.astro
src/lib/data.ts          loads content, helpers (whereOf, motifStyle, url)
src/lib/india.ts         India outline
src/scripts/home.ts      client-side filtering and pin hover text
src/styles/global.css    all CSS; light/dark via prefers-color-scheme
db/schema.ts client.ts import.ts queries.ts smoke.ts migrations/
```
Design: hand-written CSS custom properties, light and dark themes (follows the system), system font stack, no external requests.

**Database layer** (built, **not deployed anywhere**): Drizzle schema for Postgres (`sources`, `arts`, `art_states`, `art_pins`, `art_images`, `art_sources`). `db/client.ts` opens real Postgres via `DATABASE_URL` (postgres-js, `prepare:false` so pooled Supabase/Neon URLs work) or embedded PGlite otherwise. `db/import.ts` is idempotent, preserves a reviewer's `review_status`, never deletes. `db/smoke.ts` tests it all in memory. Caveat from the sister project: construct PGlite with a real options object or none; passing `undefined` first silently drops extensions. The site does **not** read the database yet; it reads the JSON at build time. The intended next step (if search or an admin/review UI is wanted) is Astro server rendering calling `db/queries.ts` (`searchArts`) on Supabase Postgres, with Supabase Auth only when accounts are needed.

### Sister project and why the stack matches
The owner asked that this site share its stack with *For the Love of Food*. That project (as described by its own session) is: Astro 7 + TypeScript, static, small client TS scripts, no UI framework; content as reviewed JSON in git with a Python `jsonschema` validator; Drizzle + Postgres tested on PGlite, not deployed; npm, Node 22, `tsx`, `drizzle-kit`; GitHub Pages via Actions; Supabase proposed for auth/DB; kebab-case slug ids shared by JSON, DB keys and URLs; `review_status` on every record; sources as separate records with a `checked` flag. This repo mirrors those conventions. Their advice, still unactioned in both repos: add a linter/formatter and a real test runner (Vitest for `db/queries`, Playwright for the filters) from day one; decide early whether you need server rendering; namespace shared ids.

---

## 10. The legacy `main` site in detail

- `index.html` loads, in order: `data.js` ... `data42.js`, `images.js`, `indiamap.js`, `app.js`. **Order matters**: `data5.js` *replaces* the earlier short `keralamural` entry. Each `dataN.js` calls `ARTS.push(...)` and `Object.assign(PINS, ...)`.
- Routing is hash-based (`#warli`, `#about`).
- `app.js` has `CATEGORY_OF` (categories for the first 34 entries that predate the `category` field), `catOf`, `whereOf` (the location line from pins) and the SVG map code.
- The first dozen data files have two `place` keys per entry (a short phrase, then the paragraph array); in JavaScript the later key wins, so only the paragraphs survive. That is why `whereOf` builds the hero location line from pins. The agent-generated files use `place` once (paragraph array).
- Light and dark themes via CSS variables.

---

## 11. Known issues and backlog (suggested priority)

1. **Decide and execute the merge** of `astro-rebuild` into `main` (section 8).
2. **Expert review** of content, starting with `docs/review-queue.md`. Record reviewers' names and dates (add fields such as `reviewed_by`, `reviewed_on`).
3. **Add sources** to the 25 unsourced entries; fix single-source entries.
4. **Photos** for the 271 entries without one (section 6). Consider letting artists upload.
5. **Add a licence.** There is **no LICENSE file yet**. Decide: code (for example MIT), text (for example CC BY-SA), and note that photos keep their own licences and the map outline has its own terms. Do this before inviting contributions.
6. **Turn on GitHub Issues** (the correction link depends on it), and add `CONTRIBUTING.md` and an issue template.
7. Tests and linting: Vitest for `db/queries.ts`, Playwright specs for filters, a link checker for the 752 source URLs, a Prettier/ESLint setup, and a CI check that fails on unreviewed `published` entries.
8. UX: per-state and per-category pages, full-text search (a Postgres or Pagefind index), map clustering or regional zoom, "near me" or related art forms, share cards (Open Graph images), a favicon, a custom 404 page, a sitemap, accessibility audit (keyboard use of the map pins, contrast of white text on every card colour), print stylesheet.
9. Languages: Hindi and regional-language versions; names in native scripts.
10. Data quality: normalise `states` (nine "Pan-India" entries; one entry lists "Pakistan border region"); decide what to do with the weak "nothing specific found" entries; add `artist_names[]` or an `artists` collection so named people are structured data; add `lastReviewed`.
11. Hosting the database (Supabase free tier pauses after 7 idle days; Pro is about 25 dollars a month) only when a feature needs it.
12. Coverage gaps by design: performing and ritual arts are thin in some states; tribal ritual arts; contemporary and urban art; food, architecture and festival arts are out of scope so far (decide).

---

## 12. Lessons from the build session (pitfalls)

- **Rate limits and blocked sites** shaped the research (section 4) and the photos (section 6).
- A hero bug went unnoticed for a long time: duplicate `place` keys made the hero show a whole paragraph. Open a real detail page, not just the home page, after structural data changes.
- Merged data should always be loaded in a real browser (Playwright) after each batch; many problems only appeared on rendered pages. The `merge.js` validator catches missing fields, bad categories, bad colours, duplicate ids and missing pins.
- `pkill -f <pattern>` run from a shell whose command line contains the pattern kills the shell itself. Use the `[p]attern` trick or PID files.
- GitHub pushes failed intermittently with 403 or "failed to push some refs"; retrying once usually worked. The very first repo became unreachable for pushes and was abandoned.
- Only the repo owner can change GitHub settings; the workflow's `enablement: true` is what enabled Pages.
- Two repositories with the same name cannot share one cloud session checkout; that is why the first repo was left behind.
- Claude "artifact" hosting blocks external images, fetches and map tiles, and supports only plain `#name` hash routes. That is why the map is inline SVG and why the legacy routes are `#id`.

---

## 13. Credits and licensing

- Photos: see the credit line under each photo on its page; every one links to its Wikimedia Commons page and licence.
- Map outline: Datameet composite boundary, simplified.
- Text: researched and drafted by AI agents from the sources listed on each page; **not yet reviewed**. Credit the traditions, communities and practitioners, not the tool.
- No licence has been chosen for code or text yet (see backlog item 5).

If something here is wrong or out of date, fix this README. It is the project's memory.
