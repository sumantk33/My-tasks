const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@/styles': path.resolve(__dirname, 'styles'),
      '@/components': path.resolve(__dirname, 'components'),
      '@/context': path.resolve(__dirname, 'context'),
      '@/utils': path.resolve(__dirname, 'utils'),
    }
    return config
  },
  reactStrictMode: true,
}

module.exports = nextConfig
