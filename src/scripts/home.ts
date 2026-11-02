// Client-side filters for the home page: text, type and state. Cards and map pins carry data attributes.
const q = document.getElementById('q') as HTMLInputElement;
const cat = document.getElementById('cat') as HTMLSelectElement;
const st = document.getElementById('st') as HTMLSelectElement;
const cards = [...document.querySelectorAll<HTMLElement>('#grid .card')];
const pins = [...document.querySelectorAll<SVGElement>('.map [data-art]')];
const count = document.getElementById('count')!;
const empty = document.getElementById('empty')!;
const info = document.querySelector<HTMLElement>('.map .mapinfo')!;

function apply() {
  const text = q.value.trim().toLowerCase();
  const visible = new Set<string>();
  let n = 0;
  for (const c of cards) {
    const ok = (!text || c.dataset.search!.includes(text)) &&
      (!cat.value || c.dataset.category === cat.value) &&
      (!st.value || c.dataset.states!.split('|').includes(st.value));
    c.classList.toggle('hidden', !ok);
    if (ok) { visible.add(c.dataset.art!); n++; }
  }
  for (const p of pins) p.classList.toggle('hidden', !visible.has((p as unknown as HTMLElement).dataset.art!));
  count.textContent = `${n} art form${n === 1 ? '' : 's'}`;
  empty.classList.toggle('hidden', n > 0);
}
for (const el of [q, cat, st]) el.addEventListener('input', apply);

for (const p of pins) {
  const show = () => { info.textContent = (p as unknown as HTMLElement).dataset.label ?? ''; };
  p.addEventListener('mouseenter', show); p.addEventListener('focus', show); p.addEventListener('click', show);
}
// Deep links such as ?cat=Dance&state=Kerala
const params = new URLSearchParams(location.search);
if (params.get('cat')) cat.value = params.get('cat')!;
if (params.get('state')) st.value = params.get('state')!;
if (params.get('q')) q.value = params.get('q')!;
apply();
