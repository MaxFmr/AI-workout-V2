/** @type {import('next').NextConfig} */
const nextConfig = {};

const withPWA = require('@imbios/next-pwa')({
  dest: 'public',
  scope: '/app',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  nextConfig,
});
