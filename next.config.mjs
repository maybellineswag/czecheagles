/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  // Force trailing slashes to ensure proper asset loading
  trailingSlash: true,
  // Ensure assets are properly loaded in development
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
}

export default nextConfig
