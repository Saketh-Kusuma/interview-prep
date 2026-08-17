import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Google account avatars. The subdomain varies (lh3, lh4, …), hence the
    // single-level wildcard.
    remotePatterns: [
      { protocol: "https", hostname: "*.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
