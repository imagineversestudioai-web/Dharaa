import type { NextConfig } from "next";

/**
 * Static site export — no Node server required.
 * Build output: website/out
 *
 * Deploy (any static host):
 *   Build:   npm ci && npm run build
 *   Publish: out
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
