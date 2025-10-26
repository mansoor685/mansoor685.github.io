import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mansoor Ahmed - Full Stack Developer",
  description: "Full Stack Developer with 2+ years of experience in full-stack development, specializing in Python, JavaScript, React, Django, FastAPI, and cloud technologies. Building scalable web applications and AI-powered solutions.",
  keywords: ["Full Stack Developer", "React", "Django", "FastAPI", "Next.js", "Python", "JavaScript", "Web Development", "AI Development"],
  authors: [{ name: "Mansoor Ahmed" }],
  openGraph: {
    title: "Mansoor Ahmed - Full Stack Developer",
    description: "Full Stack Developer specializing in Python, JavaScript, React, and cloud technologies",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
