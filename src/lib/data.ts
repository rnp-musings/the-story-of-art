import fs from 'node:fs';
import path from 'node:path';

export type Pin = { lat: number; lng: number; label: string; approximate: boolean };
export type ArtImage = { kind: 'art' | 'artist'; file: string; alt: string; caption: string; author: string; license: string; source_url: string };
export type Source = { id: string; title: string; url: string; checked: boolean };
export type Art = {
  id: string; name: string; category: string; states: string[]; color: string; motif: string; tagline: string;
  facts: string[]; art: string[]; artist: string[]; place: string[];
  history: { when: string; what: string }[]; future: string[];
  pins: Pin[]; images: ArtImage[]; source_ids: string[]; review_status: 'draft' | 'reviewed' | 'published';
};

export const CATEGORY_ORDER = ['Painting', 'Textile', 'Craft', 'Sculpture', 'Dance', 'Music', 'Theatre & puppetry', 'Martial art'];

const root = process.cwd();
const readJson = <T>(p: string): T => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));

let cache: { arts: Art[]; sources: Map<string, Source> } | null = null;
function load() {
  if (cache) return cache;
  const dir = path.join(root, 'content', 'arts');
  const arts = fs.readdirSync(dir).filter(f => f.endsWith('.json')).flatMap(f => readJson<Art[]>(`content/arts/${f}`));
  arts.sort((a, b) => a.name.localeCompare(b.name));
  const sources = new Map(readJson<Source[]>('content/sources.json').map(s => [s.id, s]));
  cache = { arts, sources };
  return cache;
}

export const allArts = () => load().arts;
export const getArt = (id: string) => load().arts.find(a => a.id === id);
export const sourcesFor = (a: Art) => a.source_ids.map(id => load().sources.get(id)).filter((s): s is Source => !!s);
export const allStates = () => [...new Set(allArts().flatMap(a => a.states))].sort();
export const categories = () => CATEGORY_ORDER.filter(c => allArts().some(a => a.category === c));

/** Join a path onto the site base (works with or without a trailing slash on BASE_URL). */
export const url = (p = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;

/** Short location line for the hero and cards, built from the first pin labels and the states. */
export function whereOf(a: Art): string {
  const labels = [...new Set(a.pins.map(p => p.label))];
  const short = labels.filter(l => l.length <= 24).slice(0, 2);
  if (!short.length && labels.length) short.push(labels[0].split(/[,(]/)[0].trim().slice(0, 30));
  return [...short, a.states.join(' · ')].join(', ');
}

const MOTIFS: Record<string, string> = {
  fish: `<path d="M4 20c8-14 20-14 28 0-8 14-20 14-28 0z M32 20l8-8v16z" fill="F"/>`,
  triangles: `<path d="M20 6l12 22H8z" fill="none" stroke="F" stroke-width="3"/><circle cx="20" cy="34" r="3" fill="F"/>`,
  lotus: `<path d="M20 34c-12-4-14-16-4-22 2 8 8 8 8 0 10 6 8 18-4 22z" fill="F"/>`,
  vine: `<path d="M6 34c10-6 4-18 14-18s6 12 14 6" fill="none" stroke="F" stroke-width="3"/><circle cx="20" cy="16" r="3" fill="F"/>`,
  arch: `<path d="M8 36V18a12 12 0 0124 0v18" fill="none" stroke="F" stroke-width="3"/><circle cx="20" cy="22" r="3" fill="F"/>`,
  dots: `<circle cx="10" cy="10" r="3" fill="F"/><circle cx="24" cy="14" r="2" fill="F"/><circle cx="16" cy="26" r="3" fill="F"/><circle cx="32" cy="32" r="2" fill="F"/>`,
  scroll: `<path d="M6 12h28M6 20h28M6 28h20" stroke="F" stroke-width="3" fill="none"/><circle cx="34" cy="28" r="4" fill="F"/>`,
  diamond: `<path d="M20 4l14 16-14 16L6 20z" fill="none" stroke="F" stroke-width="3"/>`,
  spiral: `<path d="M20 20m0-2a2 2 0 110 4 6 6 0 11-8-6 10 10 0 1118 6" fill="none" stroke="F" stroke-width="3"/>`
};
/** CSS background for a card or hero: the art form's colour with its motif tiled over it. */
export function motifStyle(motif: string, color: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>${(MOTIFS[motif] ?? MOTIFS.dots).replaceAll('F', 'rgba(255,255,255,.55)')}</svg>`;
  return `background-color:${color};background-image:url("data:image/svg+xml,${encodeURIComponent(svg)}");background-size:40px 40px`;
}
