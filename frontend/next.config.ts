import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Image Configuration
   * 
   * Allow loading images from external domains
   * Required for next/image component
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
