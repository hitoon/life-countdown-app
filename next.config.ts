import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // 静的ファイルのエクスポートを有効にする
  reactStrictMode: true,
  basePath: '/life-countdown-app',
};

export default nextConfig;
