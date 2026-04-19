"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="about" style={{ padding:"112px 0",background:"#0A1628",position:"relative" }}>
      <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 60% at 0% 50%,rgba(0,201,167,0.04),transparent)",pointerEvents:"none" }} />
      <div ref={ref} style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center" }}>

        <motion.div initial={{ opacity:0,x:-40 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.8 }}
          style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:32 }}>
          <div style={{ position:"relative" }}>
            <motion.div animate={{ scale:[1,1.05,1],opacity:[0.3,0.6,0.3] }} transition={{ duration:3,repeat:Infinity }}
              style={{ position:"absolute",inset:-16,borderRadius:"50%",border:"1px solid rgba(0,201,167,0.3)" }} />
            <motion.div animate={{ y:[0,-10,0] }} transition={{ duration:6,repeat:Infinity,ease:"easeInOut" }}
              style={{ width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#1E3050,#0A1628)",border:"2px solid rgba(0,201,167,0.3)",boxShadow:"0 0 60px rgba(0,201,167,0.2)",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:64,color:"#00C9A7",opacity:0.4 }}>AS</span>
            </motion.div>
          </div>
          <div style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",gap:10 }}>
            {["🎓 BTech, Kolkata","💡 Year 1 Founder","📱 Digital Native"].map((b,i)=>(
              <motion.span key={b} initial={{ opacity:0,scale:0.8 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ delay:0.3+i*0.1,type:"spring" }}
                style={{ padding:"8px 16px",borderRadius:9999,fontSize:13,fontWeight:500,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(0,201,167,0.2)",color:"#00C9A7" }}>{b}</motion.span>
            ))}
          </div>
        </motion.div>

        <div style={{ display:"flex",flexDirection:"column",gap:24 }}>
          <motion.div initial={{ opacity:0,x:-20 }} animate={inView?{opacity:1,x:0}:{}} style={{ display:"flex",alignItems:"center",gap:12 }}>
            <span style={{ width:24,height:1,background:"#00C9A7",display:"block" }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#00C9A7",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase" }}>The Founder</span>
          </motion.div>
          <motion.h2 initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.1 }}
            style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:"clamp(1.8rem,4vw,3rem)",color:"#fff",lineHeight:1.1,margin:0 }}>
            A 19-Year-Old Who Bet On{' '}
            <span style={{ background:"linear-gradient(135deg,#00C9A7,#FFD93D)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>India's Underdogs</span>
          </motion.h2>
          {[
            "I'm Aditya Singh, a first-year BTech student from Kolkata who noticed something — millions of incredible Indian businesses were invisible online. Not because they weren't good enough. But because no one built tools affordable and specific enough for them.",
            "Leavron started with one simple promise: results first, payment second. I work free for the first 2 months. If I don't grow your business, you owe me nothing.",
            "Today Leavron is growing fast. Our mission: make every small business in India as powerful as the biggest brands — on any budget."
          ].map((p,i)=>(
            <motion.p key={i} initial={{ opacity:0,y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.2+i*0.1 }}
              style={{ color:"#C8D8E8",lineHeight:1.8,fontSize:15,fontFamily:"'Inter',sans-serif",margin:0 }}>{p}</motion.p>
          ))}
          <motion.div initial={{ opacity:0,y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.5 }}
            style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
            {[{v:"₹0",l:"Raised",s:"Bootstrapped from day 1",c:"#00C9A7"},{v:"100%",l:"Retention",s:"No client has ever left",c:"#FFD93D"}].map(st=>(
              <div key={st.l} style={{ borderRadius:16,padding:20,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:32,color:st.c,margin:0 }}>{st.v}</p>
                <p style={{ color:"#fff",fontWeight:600,fontSize:13,margin:"4px 0 2px",fontFamily:"'Inter',sans-serif" }}>{st.l}</p>
                <p style={{ color:"#7A8EA0",fontSize:12,margin:0,fontFamily:"'Inter',sans-serif" }}>{st.s}</p>
              </div>
            ))}
          </motion.div>
          <motion.button initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.6 }}
            whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
            onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
            style={{ alignSelf:"flex-start",background:"#00C9A7",color:"#0A1628",fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:15,padding:"14px 28px",borderRadius:12,border:"none",cursor:"pointer" }}>
            Let's Build Something Together →
          </motion.button>
        </div>
      </div>
    </section>
  );
}
