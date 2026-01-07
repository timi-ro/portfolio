import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Static export for GitHub Pages
  output: 'export',

  // Base path for GitHub Pages (repository name)
  basePath: '/portfolio',

  // Image optimization (unoptimized for static export)
  images: {
    unoptimized: true,
  },

  // Enable compression
  compress: true,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
