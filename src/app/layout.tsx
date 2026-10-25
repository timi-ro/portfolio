import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
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

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fatemeh Rostami | Full-Stack Software Engineer",
    template: "%s | Fatemeh Rostami"
  },
  description: "Full-stack software engineer at SCOREalytics, building product platforms end to end: component-based front ends, REST APIs, onboarding flows and integrations. Background in backend and data engineering with Laravel, Symfony and Snowflake. Based in Istanbul, Türkiye.",
  keywords: [
    "Fatemeh Rostami",
    "Full-Stack Software Engineer",
    "Backend Engineer",
    "SCOREalytics",
    "REST API",
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
    title: "Fatemeh Rostami | Full-Stack Software Engineer",
    description: "Full-stack software engineer building product platforms end to end, from the data model and API to the interface customers use every day.",
    siteName: "Fatemeh Rostami Portfolio",
    images: [
      {
        url: "https://timi-ro.github.io/portfolio/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fatemeh Rostami - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fatemeh Rostami | Full-Stack Software Engineer",
    description: "Full-stack software engineer building product platforms end to end, from the data model and API to the interface customers use every day.",
    images: ["https://timi-ro.github.io/portfolio/og-image.jpg"],
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
        <meta property="og:logo" content="https://timi-ro.github.io/portfolio/og-image.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
