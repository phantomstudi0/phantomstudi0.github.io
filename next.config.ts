import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES === 'true'

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined,
  basePath: isProd ? '/phantomstudio' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
