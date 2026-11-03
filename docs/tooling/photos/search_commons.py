import json,re,time,urllib.request,urllib.parse,os
UA={"User-Agent":"StoryOfArtBot/0.1 (open-source project; see the repo README) python-urllib"}
terms={"kantha":"Kantha embroidery","chikankari":"Chikankari embroidery Lucknow","kalighat":"Kalighat painting","cheriyal":"Cheriyal scroll painting","pachedi":"Mata ni Pachedi","pithora":"Pithora painting","thangka":"Thangka painting","keralamural":"Kerala mural painting","sualkuchi":"Muga silk Sualkuchi","majuli":"Majuli mask Samaguri","longpi":"Longpi pottery","manipuri-weaving":"Ima Keithel Imphal market","pashmina":"Pashmina shawl Kashmir","papiermache":"Kashmir papier-mache","mysore":"Mysore painting","channapatna":"Channapatna toys","pichwai2":"Pichwai painting","gond2":"Gond art Madhya Pradesh","tanjore_a":"Tanjore painting artist at work"}
f=os.path.dirname(__file__)+"/cands.json"
out=json.load(open(f)) if os.path.exists(f) else {}
for k,t in terms.items():
    if k in out: continue
    u="https://commons.wikimedia.org/w/api.php?"+urllib.parse.urlencode({"action":"query","format":"json","generator":"search","gsrsearch":t,"gsrnamespace":6,"gsrlimit":8,"prop":"imageinfo","iiprop":"url|extmetadata|mime","iiurlwidth":900})
    for i in range(8):
        try:
            d=json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=30)); break
        except Exception as e:
            time.sleep(30)
    else: continue
    res=[]
    for p in (d.get("query",{}).get("pages",{}) or {}).values():
        ii=p["imageinfo"][0]; m=ii["extmetadata"]
        if ii["mime"]!="image/jpeg": continue
        res.append({"title":p["title"],"thumb":ii["thumburl"],"page":ii["descriptionurl"],"license":m.get("LicenseShortName",{}).get("value"),"author":re.sub("<[^>]+>","",m.get("Artist",{}).get("value","")).strip()[:80]})
    out[k]=res; json.dump(out,open(f,"w"),indent=1); time.sleep(10)
