"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollTo = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
  return (
    <footer style={{ background:"#060E1A",borderTop:"1px solid rgba(30,58,95,0.4)",padding:"64px 24px 32px" }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:40,marginBottom:48 }}>
          <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:22,color:"#fff" }}>LEAVRON</span>
              <span style={{ width:8,height:8,borderRadius:"50%",background:"#00C9A7",display:"inline-block" }} />
            </div>
            <p style={{ color:"#7A8EA0",fontSize:14,lineHeight:1.7,fontFamily:"'Inter',sans-serif",maxWidth:260,margin:0 }}>Growing India's small businesses one brand at a time.</p>
            <p style={{ color:"#3A5070",fontSize:13,fontFamily:"'Inter',sans-serif",margin:0 }}>Built in Kolkata 🇮🇳</p>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            <p style={{ color:"#fff",fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:14,margin:"0 0 4px" }}>Navigation</p>
            {['Work','Services','About','Blog','Contact'].map(l=>(
              <button key={l} onClick={()=>scrollTo(l)}
                style={{ background:"none",border:"none",color:"#7A8EA0",fontSize:14,fontFamily:"'Inter',sans-serif",cursor:"pointer",textAlign:"left",padding:0,transition:"color 0.2s" }}
                onMouseEnter={e=>(e.currentTarget.style.color="#00C9A7")}
                onMouseLeave={e=>(e.currentTarget.style.color="#7A8EA0")}>{l}</button>
            ))}
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            <p style={{ color:"#fff",fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:14,margin:"0 0 4px" }}>Get In Touch</p>
            <a href="mailto:hello@leavron.in" style={{ color:"#7A8EA0",fontSize:14,fontFamily:"'Inter',sans-serif",textDecoration:"none" }}>hello@leavron.in</a>
            <p style={{ color:"#7A8EA0",fontSize:14,fontFamily:"'Inter',sans-serif",margin:0 }}>Kolkata, West Bengal</p>
            <div style={{ display:"flex",gap:10,marginTop:8 }}>
              {[{n:"IG",c:"#FF6B6B"},{n:"LI",c:"#0A66C2"},{n:"YT",c:"#FF0000"}].map(s=>(
                <motion.div key={s.n} whileHover={{ scale:1.1 }}
                  style={{ width:36,height:36,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,cursor:"pointer",background:`${s.c}15`,color:s.c,border:`1px solid ${s.c}25` }}>
                  {s.n}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ paddingTop:24,borderTop:"1px solid rgba(30,58,95,0.4)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16 }}>
          <p style={{ color:"#3A5070",fontSize:13,fontFamily:"'Inter',sans-serif",margin:0 }}>© 2025 Leavron. Founded by Aditya Singh.</p>
          <div style={{ display:"flex",gap:24 }}>
            {['Privacy Policy','Terms'].map(l=>(
              <span key={l} style={{ color:"#3A5070",fontSize:13,cursor:"pointer",fontFamily:"'Inter',sans-serif" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
