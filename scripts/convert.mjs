// One-off migration: turns the legacy data*.js batches into reviewed JSON content.
//   node scripts/convert.mjs --legacy            rebuild content/ from data*.js + images.js in the repo root
//   node scripts/convert.mjs --add <batch.js>    append a new agent batch (ARTS.push / PINS) to content/
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const CATEGORY_OF = {
  madhubani:"Painting", warli:"Painting", pattachitra:"Painting", tanjore:"Painting", gond:"Painting", phad:"Painting",
  pichwai:"Painting", kalighat:"Painting", cheriyal:"Painting", pithora:"Painting", thangka:"Painting", keralamural:"Painting", mysore:"Painting",
  kalamkari:"Textile", kantha:"Textile", chikankari:"Textile", pachedi:"Textile", sualkuchi:"Textile", "manipuri-weaving":"Textile", pashmina:"Textile", "kerala-handloom":"Textile",
  bidri:"Craft", longpi:"Craft", papiermache:"Craft", channapatna:"Craft", "aranmula-kannadi":"Craft", nettipattam:"Craft", majuli:"Craft",
  dhokra:"Sculpture", kathakali:"Dance", mohiniyattam:"Dance", theyyam:"Dance", koodiyattam:"Theatre & puppetry", kalaripayattu:"Martial art"
};
const slug = s => s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const FILE_OF = c => slug(c) + '.json';

const read = f => JSON.parse(fs.existsSync(f) ? fs.readFileSync(f,'utf8') : 'null');
const sourcesFile = 'content/sources.json';
let sources = read(sourcesFile) || [];
const byUrl = new Map(sources.map(s => [s.url, s]));
const sourceId = (title, url) => {
  const u = new URL(url);
  const base = slug(u.hostname.replace(/^www\./,'') + u.pathname).slice(0, 60);
  return base + '-' + crypto.createHash('sha1').update(url).digest('hex').slice(0,6);
};
const addSource = ([title, url]) => {
  let s = byUrl.get(url);
  if (!s) { s = { id: sourceId(title, url), title, url, checked: false }; byUrl.set(url, s); sources.push(s); }
  return s.id;
};

function evalBatch(files, images) {
  const g = globalThis;
  g.window = { IMAGES: {} };
  g.ARTS = []; g.PINS = {};
  for (const f of files) {
    const code = fs.readFileSync(f, 'utf8').replace(/^window\.ARTS = /m, 'ARTS = ').replace(/window\.PINS =/m, 'PINS =');
    (0, eval)(code);
  }
  if (images) (0, eval)(fs.readFileSync(images, 'utf8'));
  return { arts: g.ARTS, pins: g.PINS, images: g.window.IMAGES || {} };
}

function toEntry(a, pins, images) {
  const states = a.state.split(' · ').map(s => s.trim());
  const place = Array.isArray(a.place) ? a.place : [String(a.place)];
  const imgs = [];
  for (const kind of ['art','artist']) {
    const im = (images[a.id] || {})[kind];
    if (im) imgs.push({ kind, file: path.basename(im.src), alt: im.alt, caption: im.caption || '', author: im.author || 'Unknown', license: im.license, source_url: im.page });
  }
  return {
    id: a.id, name: a.name, category: a.category || CATEGORY_OF[a.id] || 'Craft',
    states, color: a.color, motif: a.motif, tagline: a.tagline,
    facts: a.facts, art: a.art, artist: a.artist, place,
    history: a.history.map(([when, what]) => ({ when, what })),
    future: a.future,
    pins: (pins[a.id] || []).map(([lat, lng, label]) => ({ lat, lng, label: label.replace(/\s*\(approx\.?\)/i, ''), approximate: /approx/i.test(label) })),
    images: imgs,
    source_ids: [...new Set((a.sources || []).map(addSource))],
    review_status: 'draft'
  };
}

function writeAll(entries) {
  fs.mkdirSync('content/arts', { recursive: true });
  const groups = {};
  for (const e of entries) (groups[e.category] ||= []).push(e);
  for (const [cat, list] of Object.entries(groups)) {
    list.sort((a, b) => a.name.localeCompare(b.name));
    fs.writeFileSync('content/arts/' + FILE_OF(cat), JSON.stringify(list, null, 2) + '\n');
  }
  sources.sort((a, b) => a.id.localeCompare(b.id));
  fs.writeFileSync(sourcesFile, JSON.stringify(sources, null, 2) + '\n');
}

const mode = process.argv[2];
if (mode === '--legacy') {
  sources = []; byUrl.clear();
  const files = fs.readdirSync('.').filter(f => /^data\d*\.js$/.test(f)).sort((a, b) => (parseInt(a.replace(/\D/g,'')||'1')) - (parseInt(b.replace(/\D/g,'')||'1')));
  const { arts, pins, images } = evalBatch(files, 'images.js');
  const entries = arts.map(a => toEntry(a, pins, images));
  const seen = new Set(); for (const e of entries) { if (seen.has(e.id)) throw new Error('dup ' + e.id); seen.add(e.id); }
  writeAll(entries);
  fs.mkdirSync('public/images', { recursive: true });
  for (const f of fs.readdirSync('images')) fs.copyFileSync('images/' + f, 'public/images/' + f);
  console.log('converted', entries.length, 'entries,', sources.length, 'sources');
} else if (mode === '--add') {
  const existing = fs.readdirSync('content/arts').flatMap(f => JSON.parse(fs.readFileSync('content/arts/' + f, 'utf8')));
  const ids = new Set(existing.map(e => e.id));
  const { arts, pins } = evalBatch([process.argv[3]], null);
  const fresh = arts.filter(a => !ids.has(a.id)).map(a => toEntry(a, pins, {}));
  writeAll([...existing, ...fresh]);
  console.log('added', fresh.length, 'entries; skipped', arts.length - fresh.length, 'duplicates');
} else { console.error('usage: --legacy | --add <file>'); process.exit(1); }
