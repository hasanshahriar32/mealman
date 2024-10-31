import { NextConfig } from "next";

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
const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
};
module.exports = withPWA(nextConfig);
