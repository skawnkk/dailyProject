/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@my/ui'],
  swcMinify: false
}

module.exports = nextConfig
