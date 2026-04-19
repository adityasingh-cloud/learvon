"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  { client: "FitZone Gym", location: "Kolkata", industry: "Fitness", color: "#00C9A7", m1: "300 → 4,200", l1: "Instagram followers", m2: "+340%", l2: "Enquiries in 60 days", desc: "Complete social media overhaul and paid ad strategy." },
  { client: "Threads & Co.", location: "Kolkata", industry: "Fashion", color: "#FF6B6B", m1: "+890%", l1: "Website traffic", m2: "+120%", l2: "Online sales", desc: "Brand identity redesign turning a boutique into a city-wide name." },
  { client: "Brew & Bloom Café", location: "Kolkata", industry: "Food", color: "#FFD93D", m1: "180 → 6,800", l1: "Instagram followers", m2: "+65%", l2: "Daily footfall", desc: "Aesthetic-first content strategy building a loyal community." },
  { client: "EduSphere Coaching", location: "Howrah", industry: "Education", color: "#A78BFA", m1: "12 → 89", l1: "Monthly leads", m2: "+640%", l2: "Lead growth", desc: "Website, Google Ads and LinkedIn strategy for student acquisition." },
  { client: "Spice Route", location: "Salt Lake", industry: "Restaurant", color: "#F97316", m1: "18 → 340", l1: "Google reviews", m2: "+88%", l2: "Monthly revenue", desc: "Reputation management and Google presence driving footfall." },
  { client: "ActiveWear India", location: "Kolkata", industry: "Fashion", color: "#00C9A7", m1: "0 → 12,000", l1: "Instagram followers", m2: "45 days", l2: "Time to achieve", desc: "Full brand launch from zero — logo, website, Instagram strategy." },
];

export default function WorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" style={{ padding: "112px 0", overflow: "hidden", background: "#0A1628" }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 56px" }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span style={{ width: 24, height: 1, background: "#00C9A7", display: "block" }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#00C9A7", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Our Work</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
          Results That Actually <span style={{ background: "linear-gradient(135deg,#00C9A7,#FFD93D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Speak</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
          style={{ color: "#7A8EA0", fontSize: 17, fontFamily: "'Inter',sans-serif", maxWidth: 480 }}>
          Real businesses. Real growth. Every number is verified.
        </motion.p>
      </div>

      <div style={{ display: "flex", gap: 20, padding: "0 24px 24px", overflowX: "auto", scrollbarWidth: "none", maxWidth: 1280, margin: "0 auto" }}>
        {projects.map((p, i) => (
          <motion.div key={p.client}
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -8 }}
            style={{
              flexShrink: 0,
              width: 300,
              borderRadius: 20,
              overflow: "hidden",
              background: "linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              transition: "border-color 0.3s,box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${p.color}44`;
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ height: 4, background: p.color }} />
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: "#fff", fontSize: 17, margin: 0 }}>{p.client}</p>
                  <p style={{ color: "#7A8EA0", fontSize: 13, margin: "4px 0 0", fontFamily: "'Inter',sans-serif" }}>{p.location}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 9999, background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}>{p.industry}</span>
              </div>
              <div style={{ background: "rgba(10,22,40,0.5)", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {[[p.m1, p.l1], [p.m2, p.l2]].map(([val, label], j) => (
                  <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#7A8EA0", fontSize: 12, fontFamily: "'Inter',sans-serif" }}>{label}</span>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: p.color }}>{val}</span>
                  </div>
                ))}
              </div>
              <p style={{ color: "#7A8EA0", fontSize: 13, lineHeight: 1.6, fontFamily: "'Inter',sans-serif", margin: 0 }}>{p.desc}</p>
              <span style={{ color: p.color, fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>View Case Study →</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
