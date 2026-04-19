const fs = require("fs");
const path = require("path");
const base = path.resolve("c:/Users/user/aditya/leavron");
const files = {
  "package.json": `{
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
`,
  "tailwind.config.ts": `import type { Config } from "tailwindcss";
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
`,
  "postcss.config.js": `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,
  "next.config.js": `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io", "images.unsplash.com"],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
module.exports = nextConfig;
`,
  "app/globals.css": `@tailwind base;
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
`,
  "app/layout.tsx": `import type { Metadata } from "next";
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
`,
  "app/page.tsx": `"use client";
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
`,
  "components/Navbar.tsx": `"use client";
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
`,
  "components/SplashScreen.tsx": `"use client";
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
                {["Digital Marketing","Brand Building","Expansion"].map((t,i) => (
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
`,
  "components/WorkSection.tsx": `"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  { client:"FitZone Gym", location:"Kolkata", industry:"Fitness", color:"#00C9A7", m1:"300 → 4,200", l1:"Instagram followers", m2:"+340%", l2:"Enquiries in 60 days", desc:"Complete social media overhaul and paid ad strategy." },
  { client:"Threads & Co.", location:"Kolkata", industry:"Fashion", color:"#FF6B6B", m1:"+890%", l1:"Website traffic", m2:"+120%", l2:"Online sales", desc:"Brand identity redesign turning a boutique into a city-wide name." },
  { client:"Brew & Bloom Café", location:"Kolkata", industry:"Food", color:"#FFD93D", m1:"180 → 6,800", l1:"Instagram followers", m2:"+65%", l2:"Daily footfall", desc:"Aesthetic-first content strategy building a loyal community." },
  { client:"EduSphere Coaching", location:"Howrah", industry:"Education", color:"#A78BFA", m1:"12 → 89", l1:"Monthly leads", m2:"+640%", l2:"Lead growth", desc:"Website, Google Ads and LinkedIn strategy for student acquisition." },
  { client:"Spice Route", location:"Salt Lake", industry:"Restaurant", color:"#F97316", m1:"18 → 340", l1:"Google reviews", m2:"+88%", l2:"Monthly revenue", desc:"Reputation management and Google presence driving footfall." },
  { client:"ActiveWear India", location:"Kolkata", industry:"Fashion", color:"#00C9A7", m1:"0 → 12,000", l1:"Instagram followers", m2:"45 days", l2:"Time to achieve", desc:"Full brand launch from zero — logo, website, Instagram strategy." },
];

export default function WorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="work" style={{ padding:"112px 0",overflow:"hidden",background:"#0A1628" }}>
      <div ref={ref} style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px 56px" }}>
        <motion.div initial={{ opacity:0,x:-20 }} animate={inView?{opacity:1,x:0}:{}} style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
          <span style={{ width:24,height:1,background:"#00C9A7",display:"block" }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#00C9A7",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase" }}>Our Work</span>
        </motion.div>
        <motion.h2 initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.1 }}
          style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:"clamp(2rem,5vw,3.5rem)",color:"#fff",margin:"0 0 12px",lineHeight:1.1 }}>
          Results That Actually{" "}
          <span style={{ background:"linear-gradient(135deg,#00C9A7,#FFD93D)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>Speak</span>
        </motion.h2>
        <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.15 }}
          style={{ color:"#7A8EA0",fontSize:17,fontFamily:"'Inter',sans-serif",maxWidth:480 }}>
          Real businesses. Real growth. Every number is verified.
        </motion.p>
      </div>

      <div style={{ display:"flex",gap:20,padding:"0 24px 24px",overflowX:"auto",scrollbarWidth:"none",maxWidth:1280,margin:"0 auto" }}>
        {projects.map((p,i) => (
          <motion.div key={p.client}
            initial={{ opacity:0,x:60 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:i*0.1,duration:0.6 }}
            whileHover={{ y:-8 }}
            style={{ flexShrink:0,width:300,borderRadius:20,overflow:"hidden",background:"linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",border:"1px solid rgba(255,255,255,0.08)",cursor:"pointer",transition:"border-color 0.3s,box-shadow 0.3s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${p.color}44`;e.currentTarget.style.boxShadow=`0 20px 60px rgba(0,0,0,0.5)`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.boxShadow="none";}}>
            <div style={{ height:4,background:p.color }} />
            <div style={{ padding:24,display:"flex",flexDirection:"column",gap:16 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                <div>
                  <p style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,color:"#fff",fontSize:17,margin:0 }}>{p.client}</p>
                  <p style={{ color:"#7A8EA0",fontSize:13,margin:"4px 0 0",fontFamily:"'Inter',sans-serif" }}>{p.location}</p>
                </div>
                <span style={{ fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:9999,background:`${p.color}18`,color:p.color,border:`1px solid ${p.color}30` }}>{p.industry}</span>
              </div>
              <div style={{ background:"rgba(10,22,40,0.5)",borderRadius:12,padding:16,display:"flex",flexDirection:"column",gap:12 }}>
                {[[p.m1,p.l1],[p.m2,p.l2]].map(([val,label],j)=>(
                  <div key={j} style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <span style={{ color:"#7A8EA0",fontSize:12,fontFamily:"'Inter',sans-serif" }}>{label}</span>
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:18,color:p.color }}>{val}</span>
                  </div>
                ))}
              </div>
              <p style={{ color:"#7A8EA0",fontSize:13,lineHeight:1.6,fontFamily:"'Inter',sans-serif",margin:0 }}>{p.desc}</p>
              <span style={{ color:p.color,fontSize:13,fontWeight:600,fontFamily:"'Inter',sans-serif" }}>View Case Study →</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
`,
  "components/ServicesSection.tsx": `"use client";
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
          Three Ways We{" "}
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
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`${s.color}44`;e.currentTarget.style.boxShadow=`0 30px 80px rgba(0,0,0,0.5)`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=s.popular?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.07)";e.currentTarget.style.boxShadow="none";}}>
              <div style={{ position:"absolute",top:0,left:0,right:0,height:128,background:`radial-gradient(ellipse at 50% 0%,${s.color}15,transparent)`,pointerEvents:"none" }} />
              {s.popular && <div style={{ position:"absolute",top:20,right:20,background:"#FFD93D",color:"#0A1628",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:9999 }}>Most Popular</div>}
              <div style={{ width:56,height:56,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,background:`${s.color}18`,border:`1px solid ${s.color}30`,boxShadow:`0 0 20px ${s.color}20`,position:"relative",zIndex:1 }}>{s.icon}</div>
              <div style={{ position:"relative",zIndex:1 }}>
                <p style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:22,color:s.color,margin:0 }}>{s.price}</p>
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
`,
  "components/AboutSection.tsx": `"use client";
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
            A 19-Year-Old Who Bet On{" "}
            <span style={{ background:"linear-gradient(135deg,#00C9A7,#FFD93D)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>India's Underdogs</span>
          </motion.h2>
          {["I'm Aditya Singh, a first-year BTech student from Kolkata who noticed something — millions of incredible Indian businesses were invisible online. Not because they weren't good enough. But because no one built tools affordable and specific enough for them.",
            "Leavron started with one simple promise: results first, payment second. I work free for the first 2 months. If I don't grow your business, you owe me nothing.",
            "Today Leavron is growing fast. Our mission: make every small business in India as powerful as the biggest brands — on any budget."].map((p,i)=>(
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
`,
  "components/BlogSection.tsx": `"use client";
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
          Inside the{" "}
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
            <span style={{ alignSelf:"flex-start",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:9999,background:"rgba(0,201,167,0.12)",color:"#00C9A7",border:"1px solid rgba(0,201,167,0.25)" }}>Featured · ${featured.cat}</span>
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
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`${p.color}44`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";}}>
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
`,
  "components/ContactSection.tsx": `"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  full_name: z.string().min(2,"Enter your full name"),
  email: z.string().email("Enter a valid email"),
  business_name: z.string().min(2,"Enter your business name"),
  business_type: z.string().min(1,"Select a business type"),
  services_needed: z.array(z.string()).min(1,"Select at least one service"),
  monthly_budget: z.number().min(5000),
  message: z.string().min(10,"Write at least 10 characters"),
});

type FD = z.infer<typeof schema>;

const bTypes = [
  {v:"cafe_restaurant",l:"Café / Restaurant"},
  {v:"gym_fitness",l:"Gym / Fitness"},
  {v:"fashion_clothing",l:"Fashion / Clothing"},
  {v:"education_coaching",l:"Education / Coaching"},
  {v:"ecommerce",l:"E-commerce"},
  {v:"other",l:"Other"},
];

const sOpts = [
  {v:"website",l:"Website"},
  {v:"social_media",l:"Social Media"},
  {v:"brand_identity",l:"Brand Identity"},
  {v:"expansion_report",l:"Expansion Report"},
  {v:"full_package",l:"Full Package"},
];

const inp = (err) => ({
  width:"100%", padding:"12px 16px", borderRadius:12, outline:"none",
  background:"rgba(255,255,255,0.04)", fontFamily:"'Inter',sans-serif",
  border:`1px solid ${err?"#FF6B6B":"rgba(255,255,255,0.1)"}`,
  color:"#C8D8E8", fontSize:14, transition:"border-color 0.2s",
});

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [status, setStatus] = useState("idle");
  const [budget, setBudget] = useState(15000);
  const { register, handleSubmit, watch, setValue, formState:{ errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { services_needed:[], monthly_budget:15000 },
  });
  const sel = watch("services_needed") || [];
  const toggle = (v) => setValue("services_needed", sel.includes(v) ? sel.filter(s=>s!==v) : [...sel,v], { shouldValidate:true });
  const fmt = (n) => n>=100000 ? `₹${(n/100000).toFixed(1)}L+` : `₹${(n/1000).toFixed(0)}K`;

  const onSubmit = async (data) => {
    setStatus("loading");
    try {
      const r = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({...data,monthly_budget:budget}) });
      const j = await r.json();
      setStatus(j.success ? "success" : "error");
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" style={{ padding:"112px 0",background:"#0A1628",position:"relative" }}>
      <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 50% 50% at 100% 50%,rgba(0,201,167,0.04),transparent)",pointerEvents:"none" }} />
      <div ref={ref} style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <motion.div initial={{ opacity:0,x:-20 }} animate={inView?{opacity:1,x:0}:{}} style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
          <span style={{ width:24,height:1,background:"#00C9A7",display:"block" }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace",color:"#00C9A7",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase" }}>Let's Talk</span>
        </motion.div>
        <motion.h2 initial={{ opacity:0,y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.1 }}
          style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:900,fontSize:"clamp(2.5rem,6vw,5rem)",color:"#fff",margin:"0 0 12px",lineHeight:1.1 }}>
          Ready to{" "}
          <span style={{ background:"linear-gradient(135deg,#00C9A7,#FFD93D)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>Grow?</span>
        </motion.h2>
        <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.15 }}
          style={{ color:"#7A8EA0",fontSize:17,fontFamily:"'Inter',sans-serif",maxWidth:480,marginBottom:56 }}>
          Free 30-minute strategy call. No pitch. No pressure. Just a real conversation.
        </motion.p>

        <div style={{ display:"grid",gridTemplateColumns:"2fr 3fr",gap:48 }}>
          <motion.div initial={{ opacity:0,x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.2 }}
            style={{ display:"flex",flexDirection:"column",gap:24 }}>
            {[{icon:"📧",l:"Email",v:"hello@leavron.in"},{icon:"📍",l:"Location",v:"Kolkata, West Bengal"},{icon:"💬",l:"Chat",v:"WhatsApp & Instagram"}].map(c=>(
              <div key={c.l} style={{ display:"flex",alignItems:"center",gap:16 }}>
                <div style={{ width:40,height:40,borderRadius:12,background:"#152035",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>{c.icon}</div>
                <div>
                  <p style={{ color:"#7A8EA0",fontSize:12,margin:0,fontFamily:"'Inter',sans-serif" }}>{c.l}</p>
                  <p style={{ color:"#fff",fontWeight:500,fontSize:14,margin:0,fontFamily:"'Inter',sans-serif" }}>{c.v}</p>
                </div>
              </div>
            ))}
            <div style={{ borderRadius:12,padding:20,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(0,201,167,0.2)",borderLeft:"3px solid #00C9A7" }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                <span style={{ width:8,height:8,borderRadius:"50%",background:"#00C9A7",display:"inline-block" }} />
                <span style={{ color:"#00C9A7",fontWeight:700,fontSize:14,fontFamily:"'Space Grotesk',sans-serif" }}>Currently Accepting Clients</span>
              </div>
              <p style={{ color:"#7A8EA0",fontSize:13,margin:0,fontFamily:"'Inter',sans-serif" }}>We have <span style={{ color:"#fff",fontWeight:600 }}>3 spots open</span> this month.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0,x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.3 }}>
            {status==="success" ? (
              <motion.div initial={{ scale:0.9,opacity:0 }} animate={{ scale:1,opacity:1 }}
                style={{ borderRadius:20,padding:64,display:"flex",flexDirection:"column",alignItems:"center",gap:16,background:"rgba(0,201,167,0.05)",border:"1px solid rgba(0,201,167,0.3)",textAlign:"center" }}>
                <div style={{ width:64,height:64,borderRadius:"50%",background:"rgba(0,201,167,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,color:"#00C9A7" }}>✓</div>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,color:"#fff",fontSize:24,margin:0 }}>Message Sent!</h3>
                <p style={{ color:"#7A8EA0",fontFamily:"'Inter',sans-serif",margin:0 }}>We'll reply within 2 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}
                style={{ borderRadius:20,padding:32,display:"flex",flexDirection:"column",gap:20,background:"linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",border:"1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
                  <div>
                    <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,display:"block",marginBottom:6,fontFamily:"'Inter',sans-serif" }}>Full Name *</label>
                    <input {...register("full_name")} placeholder="Aditya Singh" style={inp(!!errors.full_name)}
                      onFocus={e=>e.target.style.borderColor="#00C9A7"} onBlur={e=>e.target.style.borderColor=errors.full_name?"#FF6B6B":"rgba(255,255,255,0.1)"} />
                    {errors.full_name && <p style={{ color:"#FF6B6B",fontSize:11,margin:"4px 0 0",fontFamily:"'Inter',sans-serif" }}>{errors.full_name.message}</p>}
                  </div>
                  <div>
                    <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,display:"block",marginBottom:6,fontFamily:"'Inter',sans-serif" }}>Business Name *</label>
                    <input {...register("business_name")} placeholder="Your Business" style={inp(!!errors.business_name)}
                      onFocus={e=>e.target.style.borderColor="#00C9A7"} onBlur={e=>e.target.style.borderColor=errors.business_name?"#FF6B6B":"rgba(255,255,255,0.1)"} />
                    {errors.business_name && <p style={{ color:"#FF6B6B",fontSize:11,margin:"4px 0 0" }}>{errors.business_name.message}</p>}
                  </div>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
                  <div>
                    <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,display:"block",marginBottom:6,fontFamily:"'Inter',sans-serif" }}>Email *</label>
                    <input {...register("email")} type="email" placeholder="you@business.com" style={inp(!!errors.email)}
                      onFocus={e=>e.target.style.borderColor="#00C9A7"} onBlur={e=>e.target.style.borderColor=errors.email?"#FF6B6B":"rgba(255,255,255,0.1)"} />
                    {errors.email && <p style={{ color:"#FF6B6B",fontSize:11,margin:"4px 0 0" }}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,display:"block",marginBottom:6,fontFamily:"'Inter',sans-serif" }}>Business Type *</label>
                    <select {...register("business_type")} style={{ ...inp(!!errors.business_type),background:"#152035" }}
                      onFocus={e=>e.target.style.borderColor="#00C9A7"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}>
                      <option value="">Select type...</option>
                      {bTypes.map(t=><option key={t.v} value={t.v}>{t.l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,display:"block",marginBottom:8,fontFamily:"'Inter',sans-serif" }}>What do you need? *</label>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                    {sOpts.map(s=>{
                      const on=sel.includes(s.v);
                      return <button key={s.v} type="button" onClick={()=>toggle(s.v)}
                        style={{ padding:"8px 16px",borderRadius:10,fontSize:13,fontWeight:500,cursor:"pointer",transition:"all 0.2s",fontFamily:"'Inter',sans-serif",
                          background:on?"rgba(0,201,167,0.15)":"rgba(255,255,255,0.04)",
                          border:on?"1px solid rgba(0,201,167,0.5)":"1px solid rgba(255,255,255,0.1)",
                          color:on?"#00C9A7":"#7A8EA0" }}>{on?"✓ ":""}{s.l}</button>;
                    })}
                  </div>
                  {errors.services_needed && <p style={{ color:"#FF6B6B",fontSize:11,margin:"4px 0 0" }}>{errors.services_needed.message}</p>}
                </div>
                <div>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
                    <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,fontFamily:"'Inter',sans-serif" }}>Monthly Budget</label>
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,color:"#00C9A7",fontSize:14,padding:"4px 12px",borderRadius:8,background:"rgba(0,201,167,0.1)" }}>{fmt(budget)}</span>
                  </div>
                  <input type="range" min={5000} max={100000} step={1000} value={budget}
                    onChange={e=>{const v=Number(e.target.value);setBudget(v);setValue("monthly_budget",v);}}
                    style={{ width:"100%",height:6,borderRadius:3,appearance:"none",cursor:"pointer",background:`linear-gradient(to right,#00C9A7 ${((budget-5000)/95000)*100}%,rgba(255,255,255,0.1) ${((budget-5000)/95000)*100}%)` }} />
                  <div style={{ display:"flex",justifyContent:"space-between",marginTop:6 }}>
                    {["₹5K","₹25K","₹50K","₹1L+"].map(l=><span key={l} style={{ color:"#3A5070",fontSize:11,fontFamily:"'Inter',sans-serif" }}>{l}</span>)}
                  </div>
                </div>
                <div>
                  <label style={{ color:"#7A8EA0",fontSize:12,fontWeight:500,display:"block",marginBottom:6,fontFamily:"'Inter',sans-serif" }}>Message *</label>
                  <textarea {...register("message")} rows={4} placeholder="Tell us about your business and what you want to achieve..."
                    style={{ ...inp(!!errors.message),resize:"none" }}
                    onFocus={e=>e.target.style.borderColor="#00C9A7"} onBlur={e=>e.target.style.borderColor=errors.message?"#FF6B6B":"rgba(255,255,255,0.1)"} />
                  {errors.message && <p style={{ color:"#FF6B6B",fontSize:11,margin:"4px 0 0" }}>{errors.message.message}</p>}
                </div>
                <motion.button type="submit" disabled={status==="loading"} whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                  style={{ padding:"16px 0",borderRadius:12,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16,cursor:"pointer",border:"none",background:"linear-gradient(135deg,#00C9A7,#33D4B8)",color:"#0A1628",display:"flex",alignItems:"center",justifyContent:"center",gap:10 }}>
                  {status==="loading" ? <><span style={{ width:20,height:20,border:"2px solid rgba(10,22,40,0.3)",borderTopColor:"#0A1628",borderRadius:"50%",animation:"spin 0.8s linear infinite",display:"inline-block" }} />Sending...</> : "Send Message & Get Free Audit →"}
                </motion.button>
                {status==="error" && <p style={{ color:"#FF6B6B",fontSize:13,textAlign:"center",fontFamily:"'Inter',sans-serif" }}>Something went wrong. Please try again.</p>}
                <p style={{ color:"#3A5070",fontSize:12,textAlign:"center",fontFamily:"'Inter',sans-serif",margin:0 }}>🔒 We reply within 2 hours. No spam, ever.</p>}
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}
`,
  "components/Footer.tsx": `"use client";
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
            {["Work","Services","About","Blog","Contact"].map(l=>(
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
            {["Privacy Policy","Terms"].map(l=>(
              <span key={l} style={{ color:"#3A5070",fontSize:13,cursor:"pointer",fontFamily:"'Inter',sans-serif" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
`,
};

for (const [relativePath, content] of Object.entries(files)) {
  const filePath = path.join(base, relativePath);
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

const jsTailwind = path.join(base, "tailwind.config.js");
if (fs.existsSync(jsTailwind)) {
  fs.unlinkSync(jsTailwind);
}
