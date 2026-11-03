// Usage: node merge.js <agent-output.js> <dataN.js>   (run from the repo dir)
// Validates an agent's entries, rewrites them as clean JSON-based data file, and reports problems.
const fs=require('fs');
const [,, inFile, outName]=process.argv;
global.window={};global.ARTS=[];global.PINS={};
const existing=new Set();
for(const f of fs.readdirSync('.').filter(f=>/^data\d*\.js$/.test(f))){
  const keep=ARTS.length; try{eval(fs.readFileSync(f,'utf8').replace(/^window\.ARTS = /m,'ARTS = ').replace('window.PINS =','PINS ='));}catch(e){}
}
ARTS.forEach(a=>existing.add(a.id));
const before=new Set(existing);
global.ARTS=[];global.PINS={};
eval(fs.readFileSync(inFile,'utf8'));
const CATS=["Painting","Textile","Craft","Sculpture","Dance","Music","Theatre & puppetry","Martial art"];
const MOTIFS=["fish","triangles","lotus","vine","arch","dots","scroll","diamond","spiral"];
const problems=[];
const out=[];
for(const a of ARTS){
  const p=m=>problems.push(a.id+': '+m);
  if(before.has(a.id)){p('duplicate id, skipped');continue;}
  for(const k of ['id','name','category','state','color','motif','tagline','facts','art','artist','place','history','future','sources'])
    if(a[k]==null||(Array.isArray(a[k])&&!a[k].length)) p('missing '+k);
  if(!CATS.includes(a.category)) p('bad category '+a.category);
  if(!MOTIFS.includes(a.motif)) {p('bad motif '+a.motif); a.motif='dots';}
  if(!/^#[0-9a-fA-F]{6}$/.test(a.color||'')) p('bad color '+a.color);
  if(!PINS[a.id]) p('no pins');
  for(const s of a.sources||[]) if(!/^https?:\/\//.test(s[1])) p('bad source url');
  if(/lorem|TODO|\?\?\?/i.test(JSON.stringify(a))) p('placeholder text');
  out.push(a);
}
const pins={}; for(const a of out) if(PINS[a.id]) pins[a.id]=PINS[a.id];
fs.writeFileSync(outName,'// Auto-merged batch. Sourced; see each entry\'s sources list. Draft for expert review.\nARTS.push(...'+JSON.stringify(out,null,1)+');\nObject.assign(PINS, '+JSON.stringify(pins,null,1)+');\n');
console.log(outName,'entries',out.length,'problems',problems.length); problems.forEach(x=>console.log(' -',x));
