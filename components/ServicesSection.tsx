"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  { icon:"🌐", color:"#00C9A7", title:"Digital Presence", price:"From ₹8,000/month", desc:"Website design, social media setup, brand identity, content creation, and paid ads. We make your business impossible to ignore online.", features:["Website Design","Social Media","Brand Identity","Paid Ads"], popular:false },
  { icon:"✦", color:"#FF6B6B", title:"Brand Storytelling", price:"From ₹12,000/month", desc:"We craft your brand's unique voice. Like Swiggy and Zomato sell the same food but feel different — we give you that exact edge.", features:["Brand Strategy","Content Calendar","Reels & Posts","Tone Design"], popular:true },
  { icon:"🗺", color:"#FFD93D", title:"Expansion Consulting", price:"₹20,000–50,000/report", desc:"Ready to take your Kolkata business to Delhi or Mumbai? State-specific market reports, location intelligence, and a complete franchise roadmap.", features:["Market Analysis","Competition Map","Location Intel","Roadmap"], popular:false },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="services" style={{ padding:"112px 0",background:"#0A1628",position:"relative" }}>
      <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 40% at 50% 0%,rgba(0,201,167,0.05),transparent)",pointerEvents:"none" }} />
      <div ref={ref} style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <motion.div initial={{ opacity:0,x:-20 }} animate={inView?{opacity:1,x:0}:{}} style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
          <span style={{ width:24,height:1,background:"#00C9A7",display:"block" }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#00C9A7",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase" }}>What We Do</span>
        </motion.div>
        <motion.h2 initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.1 }}
          style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:"clamp(2rem,5vw,3.5rem)",color:"#fff",margin:"0 0 12px",lineHeight:1.1 }}>
          Three Ways We{' '}
          <span style={{ background:"linear-gradient(135deg,#00C9A7,#FFD93D)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>Grow You</span>
        </motion.h2>
        <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.15 }}
          style={{ color:"#7A8EA0",fontSize:17,fontFamily:"'Inter',sans-serif",maxWidth:480,marginBottom:56 }}>
          No lock-ins. No hidden fees. Just results.
        </motion.p>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24 }}>
          {services.map((s,i)=>(
            <motion.div key={s.title}
              initial={{ opacity:0,y:48 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.1+i*0.12,duration:0.7 }}
              whileHover={{ y:-8 }}
              style={{ position:"relative",borderRadius:20,padding:28,display:"flex",flexDirection:"column",gap:20,overflow:"hidden",background:"linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",border:`1px solid rgba(255,255,255,${s.popular?"0.12":"0.07"})`,cursor:"pointer",transition:"border-color 0.3s,box-shadow 0.3s" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${s.color}44`; (e.currentTarget as HTMLElement).style.boxShadow=`0 30px 80px rgba(0,0,0,0.5)`;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=s.popular?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.boxShadow="none";}}>
              <div style={{ position:"absolute",top:0,left:0,right:0,height:128,background:`radial-gradient(ellipse at 50% 0%,${s.color}15,transparent)`,pointerEvents:"none" }} />
              {s.popular && <div style={{ position:"absolute",top:20,right:20,background:"#FFD93D",color:"#0A1628",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:9999 }}>Most Popular</div>}
              <div style={{ width:56,height:56,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,background:`${s.color}18`,border:`1px solid ${s.color}30`,boxShadow:`0 0 20px ${s.color}20`,position:"relative",zIndex:1 }}>{s.icon}</div>
              <div style={{ position:"relative",zIndex:1 }}>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,color:s.color,fontSize:22,margin:0 }}>{s.price}</p>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,color:"#fff",fontSize:20,margin:"4px 0 0" }}>{s.title}</h3>
              </div>
              <p style={{ color:"#7A8EA0",fontSize:14,lineHeight:1.7,fontFamily:"'Inter',sans-serif",position:"relative",zIndex:1,margin:0 }}>{s.desc}</p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,position:"relative",zIndex:1 }}>
                {s.features.map(f=>(
                  <span key={f} style={{ fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:9999,background:`${s.color}12`,color:s.color,border:`1px solid ${s.color}25` }}>{f}</span>
                ))}
              </div>
              <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
                style={{ marginTop:"auto",position:"relative",zIndex:1,padding:"12px 0",borderRadius:12,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",transition:"all 0.2s",
                  ...(s.popular ? { background:s.color,color:"#0A1628",border:"none" } : { background:"transparent",color:s.color,border:`1px solid ${s.color}40` }) }}>
                Get Started →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
