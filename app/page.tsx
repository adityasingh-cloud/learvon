"use client";
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
