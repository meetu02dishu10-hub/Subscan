import { useState } from "react";

const SUBS = [
  { id:1, name:"Netflix",          amt:15.99, cat:"Entertainment", used:"2 days ago",    icon:"🎬", clr:"#E50914" },
  { id:2, name:"Spotify",          amt:9.99,  cat:"Music",         used:"Today",          icon:"🎵", clr:"#1DB954" },
  { id:3, name:"Adobe CC",         amt:54.99, cat:"Software",      used:"3 weeks ago",    icon:"🎨", clr:"#FF0000" },
  { id:4, name:"Hulu",             amt:17.99, cat:"Entertainment", used:"2 months ago",   icon:"📺", clr:"#3DBB3D" },
  { id:5, name:"LinkedIn Premium", amt:39.99, cat:"Career",        used:"5 weeks ago",    icon:"💼", clr:"#0A66C2" },
  { id:6, name:"Duolingo Plus",    amt:6.99,  cat:"Education",     used:"4 months ago",   icon:"🦉", clr:"#58CC02" },
  { id:7, name:"iCloud 200GB",     amt:2.99,  cat:"Storage",       used:"Today",          icon:"☁️", clr:"#147EFB" },
  { id:8, name:"NYT Digital",      amt:17.00, cat:"News",          used:"6 weeks ago",    icon:"📰", clr:"#1A1A1A" },
  { id:9, name:"Headspace",        amt:12.99, cat:"Wellness",      used:"7 weeks ago",    icon:"🧘", clr:"#FF6B35" },
  { id:10,name:"Dropbox Plus",     amt:11.99, cat:"Storage",       used:"Today",          icon:"📦", clr:"#0061FF" },
];

const stale = u => /month|[3-9]\s*week/.test(u);

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Unbounded:wght@700;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#080810}
  ::-webkit-scrollbar{width:3px}
  ::-webkit-scrollbar-thumb{background:#222240;border-radius:3px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes scanLine{0%{left:-60%}100%{left:120%}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px #5533ff44}50%{box-shadow:0 0 40px #5533ff88}}
  @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes ping{0%{transform:scale(1);opacity:1}100%{transform:scale(2.2);opacity:0}}
  .card{transition:transform .18s,border-color .18s}
  .card:hover{transform:translateY(-2px)}
  .pill-btn{transition:all .15s;cursor:pointer;font-family:'Space Mono',monospace}
  .pill-btn:hover{opacity:.8;transform:scale(.97)}
  .fadeUp{animation:fadeUp .45s ease both}
`;

export default function SubScan() {
  const [screen, setScreen]       = useState("home");
  const [progress, setProgress]   = useState(0);
  const [hidden, setHidden]       = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [modal, setModal]         = useState(null);
  const [tab, setTab]             = useState("all");

  function runScan() {
    setScreen("scan"); setProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 14 + 2;
      if (p >= 100) { clearInterval(t); setProgress(100); setTimeout(() => setScreen("dash"), 500); return; }
      setProgress(p);
    }, 180);
  }

  const active   = SUBS.filter(s => !cancelled.includes(s.id));
  const unused   = active.filter(s => stale(s.used) && !hidden.includes(s.id));
  const monthly  = active.reduce((a,s) => a + s.amt, 0);
  const savings  = unused.reduce((a,s) => a + s.amt, 0);
  const cancelledAmt = SUBS.filter(s => cancelled.includes(s.id)).reduce((a,s) => a+s.amt,0);
  const list     = (tab === "unused" ? unused : active.filter(s => !hidden.includes(s.id)));

  const cancel = id => { setCancelled(p => [...p,id]); setModal(null); };

  return (
    <div style={{minHeight:"100vh",background:"#080810",color:"#e8e4ff",fontFamily:"'Space Mono',monospace",overflowX:"hidden"}}>
      <style>{CSS}</style>

      {/* ── HOME ── */}
      {screen === "home" && (
        <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px",position:"relative",overflow:"hidden"}}>

          {/* grid bg */}
          <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(85,51,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(85,51,255,.06) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none"}}/>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 50% at 50% 30%,rgba(85,51,255,.22) 0%,transparent 70%)",pointerEvents:"none"}}/>

          {/* ticker */}
          <div style={{position:"absolute",top:0,left:0,right:0,background:"#5533ff",padding:"8px 0",overflow:"hidden",borderBottom:"1px solid #7755ff"}}>
            <div style={{display:"flex",gap:0,animation:"ticker 18s linear infinite",whiteSpace:"nowrap",width:"max-content"}}>
              {[...Array(6)].map((_,i)=>(
                <span key={i} style={{fontSize:11,fontWeight:700,letterSpacing:"2px",padding:"0 32px",opacity:.9}}>
                  STOP LEAKING MONEY &nbsp;·&nbsp; CANCEL UNUSED SUBS &nbsp;·&nbsp; AVG SAVINGS $247/YR &nbsp;·&nbsp;
                </span>
              ))}
            </div>
          </div>

          <div style={{textAlign:"center",maxWidth:500,marginTop:60}}>
            <div style={{display:"inline-block",background:"rgba(85,51,255,.15)",border:"1px solid rgba(85,51,255,.4)",borderRadius:100,padding:"6px 18px",fontSize:11,letterSpacing:"2px",color:"#aa88ff",marginBottom:28,fontWeight:700}}>
              SUBSCRIPTION AUDITOR
            </div>

            <h1 style={{fontFamily:"Unbounded,sans-serif",fontSize:"clamp(38px,9vw,76px)",fontWeight:900,lineHeight:.95,letterSpacing:"-3px",marginBottom:24}}>
              WHERE IS<br/>
              <span style={{WebkitTextStroke:"2px #5533ff",color:"transparent"}}>YOUR</span><br/>
              MONEY?
            </h1>

            <p style={{fontSize:13,color:"#7770aa",lineHeight:1.8,marginBottom:44}}>
              The average person wastes <span style={{color:"#aa88ff",fontWeight:700}}>$312/year</span> on subscriptions they forgot about. SubScan finds every single one.
            </p>

            <button onClick={runScan} className="pill-btn" style={{
              background:"#5533ff",border:"none",color:"#fff",borderRadius:4,
              padding:"18px 48px",fontSize:13,fontWeight:700,letterSpacing:"1px",
              animation:"glow 2.5s ease-in-out infinite",
            }}>
              SCAN NOW →
            </button>

            <div style={{display:"flex",justifyContent:"center",gap:32,marginTop:48}}>
              {[["847","transactions scanned"],["2.3s","average scan time"],["$312","avg annual savings"]].map(([n,l])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"Unbounded,sans-serif",fontSize:22,fontWeight:900,color:"#aa88ff"}}>{n}</div>
                  <div style={{fontSize:10,color:"#554488",marginTop:4,letterSpacing:"1px"}}>{l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SCAN ── */}
      {screen === "scan" && (
        <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40}}>
          <div style={{width:"100%",maxWidth:400,textAlign:"center"}}>
            <div style={{fontFamily:"Unbounded,sans-serif",fontSize:13,letterSpacing:"3px",color:"#5533ff",marginBottom:40,fontWeight:700}}>
              SCANNING...
            </div>

            {/* big progress ring (CSS only) */}
            <div style={{position:"relative",width:140,height:140,margin:"0 auto 40px"}}>
              <svg width="140" height="140" style={{transform:"rotate(-90deg)"}}>
                <circle cx="70" cy="70" r="60" fill="none" stroke="#1a1a30" strokeWidth="6"/>
                <circle cx="70" cy="70" r="60" fill="none" stroke="#5533ff" strokeWidth="6"
                  strokeDasharray={`${2*Math.PI*60}`}
                  strokeDashoffset={`${2*Math.PI*60*(1-progress/100)}`}
                  strokeLinecap="round"
                  style={{transition:"stroke-dashoffset .3s ease"}}
                />
              </svg>
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                <div style={{fontFamily:"Unbounded,sans-serif",fontSize:26,fontWeight:900}}>{Math.round(progress)}</div>
                <div style={{fontSize:10,color:"#5533ff",letterSpacing:"2px"}}>PERCENT</div>
              </div>
            </div>

            {/* scan bar */}
            <div style={{background:"#111128",borderRadius:2,height:3,overflow:"hidden",position:"relative",marginBottom:32}}>
              <div style={{position:"absolute",top:0,height:"100%",width:"60%",background:"linear-gradient(90deg,transparent,#5533ff,transparent)",animation:"scanLine 1.4s ease-in-out infinite"}}/>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:10,textAlign:"left"}}>
              {[
                [progress>15,"CONNECTED TO BANK"],
                [progress>35,"PARSING TRANSACTIONS"],
                [progress>58,"MATCHING RECEIPTS"],
                [progress>78,"DETECTING PATTERNS"],
                [progress>92,"BUILDING REPORT"],
              ].map(([done,label])=>(
                <div key={label} style={{display:"flex",gap:12,alignItems:"center",opacity:done?1:.2,transition:"opacity .4s",fontSize:11,letterSpacing:"1px"}}>
                  <span style={{color:done?"#5533ff":"#333",fontWeight:700}}>{done?"▶":"○"}</span>
                  <span style={{color:done?"#e8e4ff":"#555"}}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DASHBOARD ── */}
      {screen === "dash" && (
        <div style={{maxWidth:600,margin:"0 auto",padding:"28px 18px 100px"}} className="fadeUp">

          {/* nav */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
            <div style={{fontFamily:"Unbounded,sans-serif",fontSize:18,fontWeight:900,letterSpacing:"-1px"}}>SUBSCAN</div>
            <div style={{fontSize:10,color:"#5533ff",letterSpacing:"2px",background:"rgba(85,51,255,.1)",border:"1px solid rgba(85,51,255,.3)",borderRadius:2,padding:"5px 12px"}}>
              {active.length} ACTIVE
            </div>
          </div>

          {/* stats row */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:24}}>
            {[
              ["MONTHLY",`$${monthly.toFixed(0)}`,"#e8e4ff"],
              ["WASTED",`$${savings.toFixed(0)}`,"#ff4455"],
              ["SUBS",`${unused.length}`,"#ffaa00"],
            ].map(([l,v,c])=>(
              <div key={l} style={{background:"#0e0e20",border:"1px solid #1a1a35",borderRadius:6,padding:"14px 12px"}}>
                <div style={{fontSize:9,letterSpacing:"2px",color:"#554488",marginBottom:6}}>{l}</div>
                <div style={{fontFamily:"Unbounded,sans-serif",fontSize:22,fontWeight:900,color:c}}>{v}</div>
              </div>
            ))}
          </div>

          {/* alert banner */}
          {unused.length > 0 && (
            <div style={{background:"rgba(255,68,85,.08)",border:"1px solid rgba(255,68,85,.25)",borderRadius:6,padding:"12px 16px",marginBottom:20,display:"flex",gap:12,alignItems:"center"}}>
              <div style={{position:"relative",flexShrink:0}}>
                <div style={{width:10,height:10,background:"#ff4455",borderRadius:"50%"}}/>
                <div style={{position:"absolute",inset:0,background:"#ff4455",borderRadius:"50%",animation:"ping 1.4s ease-out infinite"}}/>
              </div>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:"#ff6677",letterSpacing:".5px"}}>{unused.length} UNUSED SUBSCRIPTIONS DETECTED</div>
                <div style={{fontSize:10,color:"#884455",marginTop:3}}>Cancel to recover ${savings.toFixed(2)}/mo · ${(savings*12).toFixed(0)}/yr</div>
              </div>
            </div>
          )}

          {/* tabs */}
          <div style={{display:"flex",gap:0,marginBottom:16,border:"1px solid #1a1a35",borderRadius:4,overflow:"hidden"}}>
            {[["all","ALL"],["unused",`UNUSED (${unused.length})`]].map(([k,l])=>(
              <button key={k} onClick={()=>setTab(k)} className="pill-btn" style={{
                flex:1,padding:"10px",border:"none",background:tab===k?"#5533ff":"transparent",
                color:tab===k?"#fff":"#554488",fontSize:10,letterSpacing:"2px",fontWeight:700,
              }}>{l}</button>
            ))}
          </div>

          {/* list */}
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {list.length===0 && (
              <div style={{textAlign:"center",padding:"48px 0",color:"#333355",fontSize:12,letterSpacing:"2px"}}>
                NO SUBSCRIPTIONS TO SHOW
              </div>
            )}
            {list.map((s,i)=>{
              const bad = stale(s.used);
              return (
                <div key={s.id} className="card fadeUp" style={{
                  background:"#0e0e20",border:`1px solid ${bad?"rgba(255,68,85,.2)":"#1a1a35"}`,
                  borderRadius:6,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,
                  animationDelay:`${i*.05}s`,
                }}>
                  <div style={{width:40,height:40,borderRadius:4,background:s.clr+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0,border:`1px solid ${s.clr}33`}}>
                    {s.icon}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <span style={{fontSize:13,fontWeight:700}}>{s.name}</span>
                      {bad && <span style={{fontSize:8,background:"rgba(255,68,85,.15)",color:"#ff4455",borderRadius:2,padding:"2px 6px",letterSpacing:"1px",fontWeight:700}}>UNUSED</span>}
                    </div>
                    <div style={{fontSize:10,color:"#443366",letterSpacing:".5px"}}>{s.cat.toUpperCase()} · {s.used.toUpperCase()}</div>
                  </div>
                  <div style={{fontFamily:"Unbounded,sans-serif",fontWeight:900,fontSize:15,flexShrink:0,marginRight:8}}>
                    ${s.amt}
                  </div>
                  {bad && (
                    <button onClick={()=>setModal(s)} className="pill-btn" style={{
                      background:"rgba(255,68,85,.15)",border:"1px solid rgba(255,68,85,.3)",
                      color:"#ff4455",borderRadius:3,padding:"7px 12px",fontSize:10,letterSpacing:"1px",fontWeight:700,flexShrink:0,
                    }}>CANCEL</button>
                  )}
                  <button onClick={()=>setHidden(h=>[...h,s.id])} className="pill-btn" style={{
                    background:"transparent",border:"1px solid #1a1a35",color:"#443366",
                    borderRadius:3,padding:"7px 9px",fontSize:10,flexShrink:0,
                  }}>✕</button>
                </div>
              );
            })}
          </div>

          {/* saved banner */}
          {cancelledAmt > 0 && (
            <div style={{marginTop:24,background:"#0a1f0a",border:"1px solid rgba(0,255,100,.2)",borderRadius:6,padding:"22px",textAlign:"center"}}>
              <div style={{fontFamily:"Unbounded,sans-serif",fontSize:22,fontWeight:900,color:"#00ff66",letterSpacing:"-1px"}}>
                +${cancelledAmt.toFixed(2)}/MO SAVED
              </div>
              <div style={{fontSize:10,color:"#226633",marginTop:6,letterSpacing:"2px"}}>
                THAT'S ${(cancelledAmt*12).toFixed(0)} BACK THIS YEAR
              </div>
              <button className="pill-btn" style={{
                marginTop:16,background:"transparent",border:"1px solid rgba(0,255,100,.3)",
                color:"#00ff66",borderRadius:3,padding:"10px 24px",fontSize:10,letterSpacing:"2px",fontWeight:700,
              }}>SHARE SAVINGS ↗</button>
            </div>
          )}
        </div>
      )}

      {/* ── MODAL ── */}
      {modal && (
        <div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.8)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200,padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#0e0e20",border:"1px solid #2a2a44",borderRadius:8,padding:"28px 22px",width:"100%",maxWidth:500,marginBottom:8}}>
            <div style={{fontSize:36,marginBottom:14}}>{modal.icon}</div>
            <div style={{fontFamily:"Unbounded,sans-serif",fontSize:20,fontWeight:900,marginBottom:6,letterSpacing:"-0.5px"}}>
              CANCEL {modal.name.toUpperCase()}?
            </div>
            <div style={{fontSize:12,color:"#554488",lineHeight:1.7,marginBottom:20}}>
              Save <span style={{color:"#aa88ff",fontWeight:700}}>${modal.amt}/month</span> · ${(modal.amt*12).toFixed(0)}/year<br/>
              Last used: {modal.used}
            </div>

            <div style={{background:"#080810",border:"1px solid #1a1a35",borderRadius:4,padding:"14px",marginBottom:22,fontSize:11,color:"#7770aa",lineHeight:1.8}}>
              <span style={{color:"#aa88ff",fontWeight:700,letterSpacing:"1px"}}>DRAFT EMAIL:</span><br/>
              "Please cancel my {modal.name} subscription immediately. Account: [your@email.com]. Please confirm cancellation."
            </div>

            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>cancel(modal.id)} className="pill-btn" style={{
                flex:1,background:"#ff4455",border:"none",color:"#fff",borderRadius:4,
                padding:"14px",fontSize:12,fontWeight:700,letterSpacing:"1px",
              }}>CONFIRM CANCEL</button>
              <button onClick={()=>setModal(null)} className="pill-btn" style={{
                flex:1,background:"transparent",border:"1px solid #2a2a44",color:"#e8e4ff",
                borderRadius:4,padding:"14px",fontSize:12,letterSpacing:"1px",
              }}>KEEP IT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
