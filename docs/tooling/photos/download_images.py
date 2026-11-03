import json,time,urllib.request,os,sys
D=os.path.dirname(os.path.abspath(__file__))
UA={"User-Agent":"StoryOfArtBot/0.1 (open-source project; see the repo README)"}
picks=[("chikankari",1),("kalighat",5),("cheriyal",7),("pithora",6),("pithora",0),("thangka",6),("keralamural",3)]
d=json.load(open(D+"/cands.json"))
for k,i in picks:
    fn=f"{D}/dl/{k}_{i}.jpg"
    if os.path.exists(fn) and os.path.getsize(fn)>0: continue
    for t in range(8):
        try:
            open(fn,"wb").write(urllib.request.urlopen(urllib.request.Request(d[k][i]['thumb'],headers=UA),timeout=40).read()); print("ok",fn,flush=True); break
        except Exception as e: print(fn,str(e)[:30],flush=True); time.sleep(40)
    time.sleep(8)
