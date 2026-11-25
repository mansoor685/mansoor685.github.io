import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mansoor Ahmed | Full Stack & AI Engineer",
  description: "Full Stack & AI Engineer with 5+ years of experience in full-stack development, specializing in Python, JavaScript, React, Django, FastAPI, and cloud technologies. Building AI-powered products, SaaS platforms and scalable web applications.",
  keywords: ["Full Stack Developer", "React", "Django", "FastAPI", "Next.js", "Python", "JavaScript", "Web Development", "AI Development", "RAG", "Voice AI", "Freelance Developer"],
  authors: [{ name: "Mansoor Ahmed" }],
  openGraph: {
    title: "Mansoor Ahmed | Full Stack & AI Engineer",
    description: "Full Stack & AI Engineer: RAG platforms, voice AI, AI document automation, Next.js and Django.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
