"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["Work","Services","About","Blog","Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? "12px 24px" : "20px 24px",
          background: scrolled ? "rgba(10,22,40,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(30,58,95,0.6)" : "none",
          transition: "all 0.4s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
        >
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: "-0.02em" }}>
            LEAVRON
          </span>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C9A7", display: "inline-block" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                background: "none",
                border: "none",
                color: "#7A8EA0",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                transition: "color 0.2s",
                fontFamily: "'Inter',sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00C9A7")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#7A8EA0")}
            >
              {l}
            </button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollTo("Contact")}
          style={{
            background: "#00C9A7",
            color: "#0A1628",
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 700,
            fontSize: 14,
            padding: "10px 20px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
          }}
        >
          Book Free Call
        </motion.button>
      </motion.nav>
    </>
  );
}
