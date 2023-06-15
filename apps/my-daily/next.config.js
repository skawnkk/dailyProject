/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@my/ui'],
  swcMinify: false,
  appDir: true,
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
