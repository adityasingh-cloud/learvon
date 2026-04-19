import type { Metadata } from "next";
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
