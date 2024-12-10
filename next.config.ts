import { NextConfig } from "next";
import nextra from 'nextra'
 
const withNextra = nextra({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.jsx'
})
 
/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  // disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
  fallbacks: {
    // Failed page requests fallback to this.
    document: "/~offline",
  },
});
const redirects = async () => {
  return [
    // Add your redirects here
    // { source: "/", destination: "/blog", permanent: false },
  ];
};
const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // HYB
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
   unoptimized: true,
  },
  basePath: "/mealman",
  output: "export",
  reactStrictMode: true,
  redirects,
};
module.exports = withPWA(withNextra(nextConfig));
