import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StructuredData } from "@/components/StructuredData";
import { getAssetPath } from "@/lib/config";
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
    default: "Fatemeh Rostami - Backend Software Engineer | PHP, Laravel, Vue.js",
    template: "%s | Fatemeh Rostami"
  },
  description: "Backend Software Engineer with 7+ years of expertise in PHP, Laravel, Symfony, and Vue.js. Specialized in refactoring legacy systems, building ETL pipelines, and architecting scalable solutions. Based in Istanbul, Türkiye.",
  keywords: [
    "Fatemeh Rostami",
    "Backend Developer",
    "Software Engineer",
    "PHP Developer",
    "Laravel Expert",
    "Symfony Developer",
    "Vue.js Developer",
    "TypeScript",
    "ETL Pipelines",
    "Snowflake",
    "Data Engineering",
    "Legacy Code Refactoring",
    "Clean Architecture",
    "Istanbul Developer",
    "Türkiye Software Engineer",
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
    title: "Fatemeh Rostami - Backend Software Engineer | PHP, Laravel & Vue.js",
    description: "Backend Software Engineer specializing in PHP, Laravel, and modern web technologies. 7+ years building scalable, clean architectures.",
    siteName: "Fatemeh Rostami Portfolio",
    images: [
      {
        url: "https://timi-ro.github.io/portfolio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fatemeh Rostami - Backend Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fatemeh Rostami - Backend Software Engineer | PHP, Laravel & Vue.js",
    description: "Backend Software Engineer with 7+ years expertise in PHP, Laravel, Vue.js. Building scalable solutions.",
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
