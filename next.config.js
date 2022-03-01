/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['cdn.sanity.io'],
  },
  swcMinify: true,
}
