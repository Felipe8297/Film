/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },

  images: {
    domains: ['www.imagemhost.com.br']
  }
}

module.exports = nextConfig
