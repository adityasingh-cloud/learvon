"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const getFloatAnimation = (delay: number) => ({
  opacity: 1,
  y: 0,
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 201, 167, ${p.opacity})`;
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#0A1628]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,201,167,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,201,167,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,201,167,0.08) 0%, transparent 70%)" }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div className="flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={getFloatAnimation(0)} className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#00C9A7]" />
            <span className="font-mono text-[#00C9A7] text-xs tracking-[0.15em] uppercase">
              India's Growth Partner for SMBs
            </span>
          </motion.div>

          <div className="flex flex-col gap-1">
            {[
              { text: "We Don't Just", color: "text-white" },
              { text: "Market.", gradient: true },
              { text: "We Build Empires.", color: "text-white" },
            ].map((line, i) => (
              <motion.h1
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={getFloatAnimation((i + 1) * 0.15)}
                className={`font-display font-black leading-[1.0] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl ${
                  line.gradient
                    ? "bg-gradient-to-r from-[#00C9A7] via-[#33D4B8] to-[#FFD93D] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientShift_4s_ease_infinite]"
                    : line.color
                }`}
              >
                {line.text}
              </motion.h1>
            ))}
          </div>

          <motion.p initial={{ opacity: 0, y: 40 }} animate={getFloatAnimation(0.6)} className="text-[#C8D8E8] text-lg leading-relaxed max-w-lg">
            Learvon helps small businesses across India build powerful digital brands, dominate social media, and expand to new markets — without breaking the bank.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={getFloatAnimation(0.75)} className="flex flex-wrap gap-4 mt-2">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,201,167,0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 bg-[#00C9A7] text-[#0A1628] font-display font-bold px-7 py-4 rounded-xl text-base transition-all duration-200"
            >
              See Our Work
              <span className="text-lg">→</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgba(0,201,167,0.6)", boxShadow: "0 0 20px rgba(0,201,167,0.15)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 border border-white/15 text-[#C8D8E8] font-display font-bold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:text-[#00C9A7]"
            >
              Book Free Consultation
            </motion.button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={getFloatAnimation(0.9)} className="flex flex-wrap items-center gap-4 mt-2">
            {['50+ Brands Grown', '₹2Cr+ Revenue Generated', '8 Cities Served'].map((stat, i) => (
              <span key={stat} className="flex items-center gap-4">
                <span className="text-[#7A8EA0] text-sm font-medium">{stat}</span>
                {i < 2 && <span className="w-1 h-1 rounded-full bg-[#1E3A5F]" />}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex items-center justify-center relative"
        >
          <div className="absolute w-[420px] h-[420px] rounded-full border border-[#00C9A7]/10 animate-[float-slow_9s_ease-in-out_infinite]" />
          <div className="absolute w-[340px] h-[340px] rounded-full border border-[#00C9A7]/15 animate-[float_6s_ease-in-out_infinite]" />

          <div
            className="relative w-[260px] h-[260px] rounded-full animate-[float_6s_ease-in-out_infinite]"
            style={{
              background: "radial-gradient(circle at 35% 35%, #1E3050, #0A1628)",
              boxShadow: "0 0 60px rgba(0,201,167,0.25), inset 0 0 60px rgba(0,201,167,0.05)",
              border: "1px solid rgba(0,201,167,0.2)",
            }}
          >
            <div className="absolute inset-4 rounded-full opacity-30" style={{
              backgroundImage: `
                linear-gradient(rgba(0,201,167,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,201,167,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-black text-3xl text-[#00C9A7] opacity-60">L</span>
            </div>
          </div>

          {[
            { size: 12, orbit: 160, delay: "0s", color: "#00C9A7" },
            { size: 8, orbit: 190, delay: "2s", color: "#FFD93D" },
            { size: 10, orbit: 175, delay: "4s", color: "#FF6B6B" },
          ].map((dot, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: dot.size,
                height: dot.size,
                background: dot.color,
                boxShadow: `0 0 12px ${dot.color}`,
                animation: `orbit${i} ${8 + i * 2}s linear infinite`,
                top: "50%",
                left: "50%",
                marginTop: -dot.size / 2,
                marginLeft: dot.orbit,
                transformOrigin: `-${dot.orbit}px 0`,
              }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#7A8EA0] text-xs tracking-widest uppercase font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#00C9A7] to-transparent"
        />
      </motion.div>

      <style jsx>{`
        @keyframes orbit0 { from { transform: rotate(0deg) translateX(0); } to { transform: rotate(360deg) translateX(0); } }
        @keyframes orbit1 { from { transform: rotate(120deg) translateX(0); } to { transform: rotate(480deg) translateX(0); } }
        @keyframes orbit2 { from { transform: rotate(240deg) translateX(0); } to { transform: rotate(600deg) translateX(0); } }
      `}</style>
    </section>
  );
}
