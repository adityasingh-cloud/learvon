"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const posts = [
  { id:1, cat:"Growth", title:"Why 90% of Indian Startups Die in Year 1 (And How to Not Be One)", excerpt:"Most founders focus on product. The ones who survive focus on customers. Here's what the data says...", time:"8 min", date:"Mar 2025", color:"#00C9A7", featured:true },
  { id:2, cat:"Tech", title:"How AI is Changing Small Business Marketing in India — 2025 Guide", excerpt:"The tools that cost ₹5 lakh/year now cost ₹500/month. Here's how to use them.", time:"6 min", date:"Feb 2025", color:"#A78BFA", featured:false },
  { id:3, cat:"Case Study", title:"From 300 to 10,000 Followers: A Kolkata Café's Full Story", excerpt:"Real numbers, real strategy, real timeline. Nothing held back.", time:"5 min", date:"Feb 2025", color:"#FFD93D", featured:false },
  { id:4, cat:"Branding", title:"What Swiggy's Branding Teaches Every Small Business Owner", excerpt:"Same product. Same market. Completely different brand. The lesson for your business.", time:"4 min", date:"Jan 2025", color:"#FF6B6B", featured:false },
  { id:5, cat:"India Business", title:"Kolkata to Delhi: How to Expand Your Business State by State", excerpt:"A practical framework for taking your regional success national.", time:"7 min", date:"Jan 2025", color:"#F97316", featured:false },
];

export default function BlogSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <section id="blog" style={{ padding:"112px 0",background:"#0A1628" }}>
      <div ref={ref} style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <motion.div initial={{ opacity:0,x:-20 }} animate={inView?{opacity:1,x:0}:{}} style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
          <span style={{ width:24,height:1,background:"#00C9A7",display:"block" }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#00C9A7",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase" }}>Leavron Writes</span>
        </motion.div>
        <motion.h2 initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.1 }}
          style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:"clamp(2rem,5vw,3.5rem)",color:"#fff",margin:"0 0 12px",lineHeight:1.1 }}>
          Inside the{' '}
          <span style={{ background:"linear-gradient(135deg,#00C9A7,#FFD93D)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>Leavron Brain</span>
        </motion.h2>
        <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.15 }}
          style={{ color:"#7A8EA0",fontSize:17,fontFamily:"'Inter',sans-serif",maxWidth:480,marginBottom:48 }}>
          Business strategy, marketing breakdowns, and real stories from the Indian startup trenches.
        </motion.p>

        <motion.div initial={{ opacity:0,y:32 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.2 }}
          whileHover={{ y:-4 }}
          style={{ borderRadius:20,overflow:"hidden",marginBottom:24,background:"linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",border:"1px solid rgba(255,255,255,0.08)",cursor:"pointer",display:"grid",gridTemplateColumns:"1fr 1fr" }}>
          <div style={{ minHeight:200,background:"linear-gradient(135deg,rgba(0,201,167,0.2),rgba(10,22,40,1))",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:64,color:"#00C9A7",opacity:0.2 }}>01</span>
          </div>
          <div style={{ padding:32,display:"flex",flexDirection:"column",gap:16 }}>
            <span style={{ alignSelf:"flex-start",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:9999,background:"rgba(0,201,167,0.12)",color:"#00C9A7",border:"1px solid rgba(0,201,167,0.25)" }}>Featured · {featured.cat}</span>
            <h3 style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,color:"#fff",fontSize:22,lineHeight:1.3,margin:0 }}>{featured.title}</h3>
            <p style={{ color:"#7A8EA0",fontSize:14,lineHeight:1.7,fontFamily:"'Inter',sans-serif",margin:0 }}>{featured.excerpt}</p>
            <div style={{ display:"flex",alignItems:"center",gap:8,fontSize:12,color:"#7A8EA0",fontFamily:"'Inter',sans-serif",marginTop:"auto" }}>
              <span style={{ width:24,height:24,borderRadius:"50%",background:"rgba(0,201,167,0.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"#00C9A7",fontSize:11,fontWeight:700 }}>A</span>
              <span>Aditya Singh · {featured.time} read · {featured.date}</span>
            </div>
            <span style={{ color:"#00C9A7",fontSize:14,fontWeight:600,fontFamily:"'Inter',sans-serif" }}>Read Article →</span>
          </div>
        </motion.div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20,marginBottom:40 }}>
          {rest.map((p,i)=>(
            <motion.div key={p.id} initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.25+i*0.08 }}
              whileHover={{ y:-4 }}
              style={{ borderRadius:20,overflow:"hidden",background:"linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",border:"1px solid rgba(255,255,255,0.08)",cursor:"pointer",transition:"border-color 0.3s" }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${p.color}44`;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.08)";}}>
              <div style={{ height:100,background:`linear-gradient(135deg,${p.color}20,rgba(10,22,40,1))`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:36,color:p.color,opacity:0.25 }}>0{p.id}</span>
              </div>
              <div style={{ padding:20,display:"flex",flexDirection:"column",gap:12 }}>
                <span style={{ alignSelf:"flex-start",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:9999,background:`${p.color}15`,color:p.color,border:`1px solid ${p.color}28` }}>{p.cat}</span>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,color:"#fff",fontSize:16,lineHeight:1.4,margin:0 }}>{p.title}</h3>
                <p style={{ color:"#7A8EA0",fontSize:13,lineHeight:1.6,fontFamily:"'Inter',sans-serif",margin:0 }}>{p.excerpt}</p>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <span style={{ color:"#7A8EA0",fontSize:12,fontFamily:"'Inter',sans-serif" }}>{p.time} read · {p.date}</span>
                  <span style={{ color:p.color,fontSize:13,fontWeight:600,fontFamily:"'Inter',sans-serif" }}>Read →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ display:"flex",justifyContent:"center" }}>
          <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
            style={{ padding:"14px 32px",borderRadius:12,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,color:"#C8D8E8",background:"transparent",border:"1px solid rgba(255,255,255,0.12)",cursor:"pointer",fontSize:15 }}>
            View All Articles →
          </motion.button>
        </div>
      </div>
    </section>
  );
}
