import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */

const imageHost = String(process.env.NEXT_PUBLIC_IMAGE_HOST) ?? "";
const imageHost2 = String(process.env.NEXT_PUBLIC_IMAGE_HOST2) ?? "";
const imageHostLine = String(process.env.NEXT_PUBLIC_IMAGE_HOST_LINE) ?? "";


const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: imageHost,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: imageHost2,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: imageHostLine,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;