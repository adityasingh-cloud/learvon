"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"intro" | "name" | "tagline" | "exit">("intro");
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const colors = ["#00C9A7", "#33D4B8", "#FFD93D", "#FF6B6B", "#A78BFA", "#ffffff"];
    const particles = Array.from({ length: 180 }, () => ({
      x: (Math.random() - 0.5) * window.innerWidth * 2,
      y: (Math.random() - 0.5) * window.innerHeight * 2,
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

    let animId = 0;
    const draw = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.8);
      bg.addColorStop(0, "rgba(10,22,40,1)");
      bg.addColorStop(1, "rgba(2,6,14,1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rings.forEach((ring) => {
        ring.angle += ring.speed;
        const ry = ring.radius * Math.abs(Math.sin(ring.tilt + animId * 0.002));
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

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        if (p.z <= 1) {
          p.z = 1500;
          p.x = (Math.random() - 0.5) * window.innerWidth * 2;
          p.y = (Math.random() - 0.5) * window.innerHeight * 2;
        }
        const scale = 600 / p.z;
        const sx = cx + p.x * scale;
        const sy = cy + p.y * scale;
        const alpha = Math.min(p.opacity * (1 - p.z / 1500) * 2, 1);
        if (sx < -50 || sx > canvas.width + 50 || sy < -50 || sy > canvas.height + 50) return;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(p.size * scale, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId++;
      requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  useEffect(() => {
    const ci = setInterval(() => setCounter((c) => (c >= 100 ? (clearInterval(ci), 100) : c + Math.floor(Math.random() * 4) + 1)), 35);
    const t1 = setTimeout(() => setPhase("name"), 600);
    const t2 = setTimeout(() => setPhase("tagline"), 1600);
    const t3 = setTimeout(() => setPhase("exit"), 3600);
    const t4 = setTimeout(() => onComplete(), 4400);
    const pi = setTimeout(() => {
      let p = 0;
      const iv = setInterval(() => {
        p += Math.random() * 3 + 1;
        if (p >= 100) {
          p = 100;
          clearInterval(iv);
        }
        setProgress(p);
      }, 40);
    }, 800);

    return () => {
      clearInterval(ci);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(pi);
    };
  }, [onComplete]);

  return (
    <motion.div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#020608" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

      <AnimatePresence>
        {phase === "exit" && (
          <motion.div initial={{ scaleY: 0, originY: 1 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: "absolute", inset: 0, zIndex: 20, background: "#0A1628" }} />
        )}
      </AnimatePresence>

      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <AnimatePresence>
          {phase !== "intro" && (
            <motion.div initial={{ scale: 0, rotate: -180, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ width: 80, height: 80, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,rgba(0,201,167,0.15),rgba(0,201,167,0.05))", border: "1px solid rgba(0,201,167,0.4)", boxShadow: "0 0 40px rgba(0,201,167,0.3)" }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: 36, color: "#00C9A7" }}>L</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase !== "intro" && (
            <div style={{ display: "flex", gap: 2, overflow: "hidden" }}>
              {"LEAVRON".split("").map((char, i) => (
                <motion.span key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: "clamp(3.5rem,10vw,7rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(phase === "tagline" || phase === "exit") && (
            <motion.div initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#00C9A7", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.75rem" }}>
                India's Growth Partner for SMBs
              </span>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                {["Digital Marketing", "Brand Building", "Expansion"].map((t, i) => (
                  <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }}
                    style={{ padding: "4px 14px", borderRadius: 9999, fontSize: 12, fontWeight: 500, background: "rgba(0,201,167,0.08)", border: "1px solid rgba(0,201,167,0.2)", color: "#00C9A7" }}>
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#00C9A7,#FFD93D)", boxShadow: "0 0 12px rgba(0,201,167,0.8)", transition: "width 0.1s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 32px" }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#1E3A5F", fontSize: 12, letterSpacing: "0.15em" }}>leavron.in</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#00C9A7", fontSize: 13, fontWeight: 700 }}>{Math.min(counter, 100).toString().padStart(3, "0")}%</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#1E3A5F", fontSize: 12, letterSpacing: "0.15em" }}>Kolkata 🇮🇳</span>
        </div>
      </div>
    </motion.div>
  );
}
