# Brief for Story of Art research agents

You are writing entries for "Story of Art", a website on ALL Indian art forms (painting, textile, craft, sculpture, dance, music, theatre and puppetry, martial art). Each entry is told in five parts: the art, the artist, the place, the history (of art, artist and place), and a forward-looking vision.

## Study the model first
Read /home/user/the-story-of-art/data4.js and /home/user/the-story-of-art/data10.js to see the exact schema and voice: plain, warm, accurate, short sentences, no hype, contested claims attributed to their source.

## Research standard (strict)
Use WebSearch and WebFetch (or the web-fetch agent type) to research each entry. Prefer: Government of India / Ministry of Culture / Indian Culture portal / Sangeet Natak Akademi / UNESCO / GI registry / state tourism boards / museums / Sahapedia / reputable cultural writing and scholarship. Wikipedia is for orientation only and must be corroborated where a claim matters.
- OPEN every page you list under `sources`. Never list a URL you did not actually read (earlier batches were weakened by unread links). A source list of 3 pages you read beats 6 you did not.
- Only state what a source supports. Where scholars disagree or dates are uncertain, say so in plain words ("traditionally dated to", "sources differ").
- Do NOT invent artists, quotes, dates, honours, statistics or GI/UNESCO status. Name living or historical people only if clearly sourced. Leave out anything you cannot verify rather than hedging it.
- Be respectful of communities and castes; describe them as sources do, factually and without stereotype.
- If you cannot find enough reliable material for an entry, write a shorter honest entry (fewer paragraphs) rather than padding. Say so in your final report.

## Output format
Write ONE JavaScript file at the path you are given, containing exactly:
`ARTS.push({...}, {...}, ...);` followed by `Object.assign(PINS, { "<id>": [[lat, lng, "Label"], ...], ... });`
Each entry has these keys:
- id: lowercase hyphenated, EXACTLY as given in your batch
- name, category (exactly as given), state (as given; use " · " between several), (no short place phrase; the site builds it from the map pins)
- color: hex, dark enough for white text; motif: one of fish, triangles, lotus, vine, arch, dots, scroll, diamond, spiral
- tagline: one line, specific, not generic
- facts: 3-4 short strings
- art: 3-5 paragraphs. artist: 2-4 paragraphs. place: an ARRAY of 2-3 paragraphs (use `place` once, as the array). history: 5-8 items as [when, what]. future: 4-5 practical bullets (training, livelihood, materials, documentation, protection). 
- sources: 3-6 items as [title, url], only pages you read.
PINS: accurate coordinates; mark approximate ones "(approx.)" in the label; several pins where the tradition spans places.
Escape quotes so the file parses. Validate with: node -e "global.window={};global.ARTS=[];global.PINS={};eval(require('fs').readFileSync('<file>','utf8'));console.log(ARTS.length, Object.keys(PINS).length)"
Do not touch any other file. Do not git commit.

## Final reply (max 8 lines)
Entries written; facts you were least sure of; anything you could not verify or had to leave out; which sources failed to load.
