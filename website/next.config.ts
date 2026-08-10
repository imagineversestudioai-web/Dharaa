import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Quieter monorepo / parent lockfile warning
  turbopack: {
    root: process.cwd(),
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
