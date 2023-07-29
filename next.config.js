/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com', 'thumbs.gfycat.com']
    }
  };

module.exports = nextConfig
