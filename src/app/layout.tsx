import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StructuredData } from "@/components/StructuredData";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
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
  title: {
    default: "Fatemeh Rostami - Backend Engineer & AI Application Developer | RAG Systems & Intelligent APIs",
    template: "%s | Fatemeh Rostami"
  },
  description: "Backend Engineer expanding into AI Application Development. Building RAG systems with LangChain, AI-powered workflow automation, and intelligent APIs. 6+ years backend expertise in Laravel, Symfony, and microservices. Based in Istanbul, Türkiye.",
  keywords: [
    "Fatemeh Rostami",
    "AI Application Developer",
    "Backend Engineer",
    "RAG Systems",
    "LangChain Developer",
    "LLM Integration",
    "Vector Databases",
    "FastAPI",
    "Python AI Developer",
    "Laravel Expert",
    "Symfony Developer",
    "Microservices",
    "ETL Pipelines",
    "Snowflake",
    "Data Engineering",
    "Istanbul Developer",
    "Remote Software Engineer"
  ],
  authors: [{ name: "Fatemeh Rostami", url: "https://github.com/timi-ro" }],
  creator: "Fatemeh Rostami",
  publisher: "Fatemeh Rostami",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://timi-ro.github.io/portfolio",
    title: "Fatemeh Rostami - Backend Engineer & AI Application Developer | RAG Systems & Intelligent APIs",
    description: "Backend Engineer building RAG systems, AI-powered automation, and intelligent APIs. 6+ years backend expertise with Laravel, Symfony, and microservices.",
    siteName: "Fatemeh Rostami Portfolio",
    images: [
      {
        url: "https://timi-ro.github.io/portfolio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fatemeh Rostami - Backend Engineer & AI Application Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fatemeh Rostami - Backend Engineer & AI Application Developer | RAG Systems & Intelligent APIs",
    description: "Backend Engineer building RAG systems, AI-powered automation, and intelligent APIs with LangChain and FastAPI.",
    images: ["https://timi-ro.github.io/portfolio/og-image.png"],
    creator: "@frostami",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here after deployment
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Qzn0I0oP3C5_8t4BW0v5sNogzdlqXvAr03GRdrxMZlQ" />
        <GoogleAnalytics />
        <StructuredData />
        <meta property="og:logo" content="https://timi-ro.github.io/portfolio/og-image.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
