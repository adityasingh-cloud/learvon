from pathlib import Path

base = Path(r"c:\Users\user\aditya\leavron")
files = {
    "package.json": r'''{
  "name": "leavron",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.4",
    "@sanity/client": "^6.15.7",
    "@sanity/image-url": "^1.0.2",
    "@supabase/supabase-js": "^2.39.7",
    "framer-motion": "^11.0.8",
    "gsap": "^3.12.5",
    "next": "14.1.3",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.51.0",
    "react-intersection-observer": "^9.8.1",
    "resend": "^3.2.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.1.3",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
''',
    "tailwind.config.ts": r'''import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        gradientShift: "gradientShift 4s ease infinite",
      },
    },
  },
  plugins: [],
};
export default config;
''',
    "postcss.config.js": r'''module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
''',
    "next.config.js": r'''/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io", "images.unsplash.com"],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
module.exports = nextConfig;
''',
    "app/globals.css": r'''@tailwind base;
@tailwind components;
@tailwind utilities;

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  background-color: #0A1628 !important;
  color: #C8D8E8;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #0A1628; }
::-webkit-scrollbar-thumb { background: #1E3A5F; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #00C9A7; }

@keyframes gradientShift {
  0%,100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes float {
  0%,100% { transform: translateY(0px); }
  50% { transform: translateY(-16px); }
}
@keyframes float-slow {
  0%,100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
''',
    "app/layout.tsx": r'''import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leavron — Digital Marketing & Growth Partner for Indian SMBs",
  description: "Leavron helps small businesses across India build powerful brands online.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: "#0A1628", color: "#C8D8E8", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
''',
    "app/page.tsx": r'''"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const SplashScreen = dynamic(() => import("@/components/SplashScreen"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
const WorkSection = dynamic(() => import("@/components/WorkSection"), { ssr: false });
const ServicesSection = dynamic(() => import("@/components/ServicesSection"), { ssr: false });
const AboutSection = dynamic(() => import("@/components/AboutSection"), { ssr: false });
const BlogSection = dynamic(() => import("@/components/BlogSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh" }}>
      <AnimatePresence>
        {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      </AnimatePresence>
      {splashDone && (
        <main style={{ backgroundColor: "#0A1628" }}>
          <Navbar />
          <HeroSection />
          <WorkSection />
          <ServicesSection />
          <AboutSection />
          <BlogSection />
          <ContactSection />
          <Footer />
        </main>
      )}
    </div>
  );
}
''',
    "components/Navbar.tsx": r'''"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["Work","Services","About","Blog","Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: scrolled ? "12px 24px" : "20px 24px",
          background: scrolled ? "rgba(10,22,40,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(30,58,95,0.6)" : "none",
          transition: "all 0.4s ease",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
        >
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: "-0.02em" }}>
            LEAVRON
          </span>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C9A7", display: "inline-block", animation: "pulse 2s infinite" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{ background: "none", border: "none", color: "#7A8EA0", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "color 0.2s", fontFamily: "'Inter',sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#00C9A7")}
              onMouseLeave={e => (e.currentTarget.style.color = "#7A8EA0")}
            >{l}</button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollTo("Contact")}
          style={{ background: "#00C9A7", color: "#0A1628", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 12, border: "none", cursor: "pointer" }}
        >
          Book Free Call
        </motion.button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(10,22,40,0.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}
          >
            {links.map((l, i) => (
              <motion.button key={l}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(l)}
                style={{ background: "none", border: "none", color: "#fff", fontSize: 40, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, cursor: "pointer" }}
              >{l}</motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
''',
    "components/SplashScreen.tsx": r'''"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"intro"|"name"|"tagline"|"exit">("intro");
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);

    const colors = ["#00C9A7","#33D4B8","#FFD93D","#FF6B6B","#A78BFA","#ffffff"];
    const particles = Array.from({ length: 180 }, () => ({
      x: (Math.random() - 0.5) * canvas.width * 2,
      y: (Math.random() - 0.5) * canvas.height * 2,
      z: Math.random() * 1500 + 200,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: -Math.random() * 3 - 1,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.8 + 0.2,
    }));

    const rings = [
      { radius: 160, speed: 0.003, angle: 0, tilt: 0.3, color: "#00C9A7" },
      { radius: 220, speed: -0.002, angle: 1, tilt: -0.5, color: "#FFD93D" },
      { radius: 280, speed: 0.0015, angle: 2, tilt: 0.8, color: "#FF6B6B" },
    ];

    let frame = 0;
    let animId = 0;
    const draw = () => {
      const cx = canvas.width / 2, cy = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.8);
      bg.addColorStop(0, "rgba(10,22,40,1)");
      bg.addColorStop(1, "rgba(2,6,14,1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rings.forEach(ring => {
        ring.angle += ring.speed;
        const ry = ring.radius * Math.abs(Math.sin(ring.tilt + frame * 0.002));
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.radius, Math.max(ry, 20), 0, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.4;
        ctx.stroke();
        ctx.restore();
      });

      ctx.globalAlpha = 1;
      const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100);
      sg.addColorStop(0, "rgba(0,201,167,0.15)");
      sg.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 100, 0, Math.PI * 2);
      ctx.fillStyle = sg;
      ctx.fill();

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
        if (p.z <= 1) { p.z = 1500; p.x = (Math.random()-0.5)*canvas.width*2; p.y = (Math.random()-0.5)*canvas.height*2; }
        const scale = 600 / p.z;
        const sx = cx + p.x * scale, sy = cy + p.y * scale;
        const alpha = Math.min(p.opacity * (1 - p.z / 1500) * 2, 1);
        if (sx < -50 || sx > canvas.width+50 || sy < -50 || sy > canvas.height+50) return;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(p.size * scale, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    const ci = setInterval(() => setCounter(c => c >= 100 ? (clearInterval(ci), 100) : c + Math.floor(Math.random()*4)+1), 35);
    const t1 = setTimeout(() => setPhase("name"), 600);
    const t2 = setTimeout(() => setPhase("tagline"), 1600);
    const pi = setTimeout(() => {
      let p = 0;
      const iv = setInterval(() => { p += Math.random()*3+1; if(p>=100){p=100;clearInterval(iv);} setProgress(p); }, 40);
    }, 800);
    const t3 = setTimeout(() => setPhase("exit"), 3600);
    const t4 = setTimeout(() => onComplete(), 4400);
    return () => { clearInterval(ci); clearTimeout(t1); clearTimeout(t2); clearTimeout(pi); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <motion.div style={{ position:"fixed",inset:0,zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"#020608" }}>
      <canvas ref={canvasRef} style={{ position:"absolute",inset:0 }} />

      <AnimatePresence>
        {phase === "exit" && (
          <motion.div initial={{ scaleY:0,originY:1 }} animate={{ scaleY:1 }} transition={{ duration:0.7,ease:[0.76,0,0.24,1] }}
            style={{ position:"absolute",inset:0,zIndex:20,background:"#0A1628" }} />
        )}
      </AnimatePresence>

      <div style={{ position:"relative",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",gap:24 }}>
        <AnimatePresence>
          {phase !== "intro" && (
            <motion.div initial={{ scale:0,rotate:-180,opacity:0 }} animate={{ scale:1,rotate:0,opacity:1 }} transition={{ duration:0.8,ease:[0.34,1.56,0.64,1] }}
              style={{ width:80,height:80,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,rgba(0,201,167,0.15),rgba(0,201,167,0.05))",border:"1px solid rgba(0,201,167,0.4)",boxShadow:"0 0 40px rgba(0,201,167,0.3)" }}>
              <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:36,color:"#00C9A7" }}>L</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase !== "intro" && (
            <div style={{ display:"flex",gap:2,overflow:"hidden" }}>
              {"LEAVRON".split("").map((char, i) => (
                <motion.span key={i}
                  initial={{ y:80,opacity:0 }} animate={{ y:0,opacity:1 }}
                  transition={{ delay:0.05*i,duration:0.6,ease:[0.22,1,0.36,1] }}
                  style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:"clamp(3.5rem,10vw,7rem)",color:"#fff",letterSpacing:"-0.02em",lineHeight:1,display:"inline-block" }}
                >{char}</motion.span>
              ))}
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(phase === "tagline" || phase === "exit") && (
            <motion.div initial={{ opacity:0,y:20,filter:"blur(10px)" }} animate={{ opacity:1,y:0,filter:"blur(0px)" }} transition={{ duration:0.8 }}
              style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:12 }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#00C9A7",letterSpacing:"0.2em",textTransform:"uppercase",fontSize:"0.75rem" }}>
                India's Growth Partner for SMBs
              </span>
              <div style={{ display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center" }}>
                {['Digital Marketing','Brand Building','Expansion'].map((t,i) => (
                  <motion.span key={t} initial={{ opacity:0,scale:0.8 }} animate={{ opacity:1,scale:1 }} transition={{ delay:0.4+i*0.1 }}
                    style={{ padding:"4px 14px",borderRadius:9999,fontSize:12,fontWeight:500,background:"rgba(0,201,167,0.08)",border:"1px solid rgba(0,201,167,0.2)",color:"#00C9A7" }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ position:"absolute",bottom:0,left:0,right:0,zIndex:10 }}>
        <div style={{ height:1,background:"rgba(255,255,255,0.06)" }}>
          <div style={{ height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#00C9A7,#FFD93D)",boxShadow:"0 0 12px rgba(0,201,167,0.8)",transition:"width 0.1s ease" }} />
        </div>
        <div style={{ display:"flex",justifyContent:"space-between",padding:"12px 32px" }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#1E3A5F",fontSize:12,letterSpacing:"0.15em" }}>leavron.in</span>
          <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#00C9A7",fontSize:13,fontWeight:700 }}>{Math.min(counter,100).toString().padStart(3,"0")}%</span>
          <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#1E3A5F",fontSize:12,letterSpacing:"0.15em" }}>Kolkata 🇮🇳</span>
        </div>
      </div>
    </motion.div>
  );
}
''',
    "components/HeroSection.tsx": r'''"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const pts = Array.from({length:80},()=>({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, sx:(Math.random()-0.5)*0.3, sy:-Math.random()*0.4-0.1, size:Math.random()*2+0.5, op:Math.random()*0.5+0.1 }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,201,167,${p.op})`; ctx.fill();
        p.x+=p.sx; p.y+=p.sy;
        if(p.y<-10){p.y=canvas.height+10;p.x=Math.random()*canvas.width;}
      });
      id=requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize",resize); };
  }, []);

  const v = { initial:{opacity:0,y:40}, animate:(i:number)=>({ opacity:1,y:0,transition:{delay:i*0.15,duration:0.7,ease:[0.22,1,0.36,1]} }) };

  return (
    <section id="hero" style={{ minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden",background:"#0A1628",position:"relative" }}>
      <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(0,201,167,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,167,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none" }} />
      <div style={{ position:"absolute",top:"33%",left:"25%",width:700,height:500,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(0,201,167,0.08) 0%,transparent 70%)",pointerEvents:"none" }} />
      <canvas ref={canvasRef} style={{ position:"absolute",inset:0,pointerEvents:"none" }} />

      <div style={{ position:"relative",zIndex:10,maxWidth:1280,margin:"0 auto",padding:"112px 24px 80px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center",width:"100%" }}>
        <div style={{ display:"flex",flexDirection:"column",gap:24 }}>
          <motion.div custom={0} variants={v} initial="initial" animate="animate" style={{ display:"flex",alignItems:"center",gap:12 }}>
            <span style={{ width:24,height:1,background:"#00C9A7",display:"block" }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#00C9A7",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase" }}>India's Growth Partner for SMBs</span>
          </motion.div>

          <div style={{ display:"flex",flexDirection:"column",gap:4 }}>
            {[{text:"We Don't Just",gradient:false},{text:"Market.",gradient:true},{text:"We Build Empires.",gradient:false}].map((line,i)=>(
              <motion.h1 key={i} custom={i+1} variants={v} initial="initial" animate="animate"
                style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:"clamp(2.5rem,6vw,5rem)",lineHeight:1,letterSpacing:"-0.02em",margin:0,
                  ...(line.gradient ? { background:"linear-gradient(135deg,#00C9A7,#FFD93D)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" } : { color:"#fff" }) }}>
                {line.text}
              </motion.h1>
            ))}
          </div>

          <motion.p custom={4} variants={v} initial="initial" animate="animate" style={{ color:"#C8D8E8",fontSize:18,lineHeight:1.7,maxWidth:520,margin:0,fontFamily:"'Inter',sans-serif" }}>
            Leavron helps small businesses across India build powerful digital brands, dominate social media, and expand to new markets — without breaking the bank.
          </motion.p>

          <motion.div custom={5} variants={v} initial="initial" animate="animate" style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
              onClick={() => document.getElementById("work")?.scrollIntoView({behavior:"smooth"})}
              style={{ background:"#00C9A7",color:"#0A1628",fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:15,padding:"14px 28px",borderRadius:12,border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:8 }}>
              See Our Work →
            </motion.button>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
              style={{ background:"transparent",color:"#C8D8E8",fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:15,padding:"14px 28px",borderRadius:12,border:"1px solid rgba(255,255,255,0.15)",cursor:"pointer" }}>
              Book Free Consultation
            </motion.button>
          </motion.div>

          <motion.div custom={6} variants={v} initial="initial" animate="animate" style={{ display:"flex",flexWrap:"wrap",gap:16,alignItems:"center" }}>
            {['50+ Brands Grown','₹2Cr+ Revenue','8 Cities Served'].map((s,i)=>(
              <span key={s} style={{ display:"flex",alignItems:"center",gap:16 }}>
                <span style={{ color:"#7A8EA0",fontSize:13,fontFamily:"'Inter',sans-serif" }}>{s}</span>
                {i<2 && <span style={{ width:4,height:4,borderRadius:"50%",background:"#1E3A5F",display:"inline-block" }} />}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0,scale:0.85 }} animate={{ opacity:1,scale:1 }} transition={{ delay:0.8,duration:1 }}
          style={{ display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
          <div style={{ width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#1E3050,#0A1628)",boxShadow:"0 0 60px rgba(0,201,167,0.25)",border:"1px solid rgba(0,201,167,0.2)",display:"flex",alignItems:"center",justifyContent:"center",animation:"float 6s ease-in-out infinite",position:"relative" }}>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:40,color:"#00C9A7",opacity:0.5 }}>L</span>
          </div>
          <div style={{ position:"absolute",width:340,height:340,borderRadius:"50%",border:"1px solid rgba(0,201,167,0.1)",pointerEvents:"none",animation:"float-slow 9s ease-in-out infinite" }} />
        </motion.div>
      </div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
        style={{ position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8 }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#7A8EA0",fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase" }}>Scroll</span>
        <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.5,repeat:Infinity }} style={{ width:1,height:32,background:"linear-gradient(to bottom,#00C9A7,transparent)" }} />
      </motion.div>
    </section>
  );
}
''',
}

for relative_path, content in files.items():
    path = base / relative_path
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")

# Remove old JS Tailwind config if present
js_path = base / "tailwind.config.js"
if js_path.exists():
    js_path.unlink()
