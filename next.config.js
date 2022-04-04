const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['cdn.sanity.io'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
})
