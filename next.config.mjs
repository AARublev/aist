/** @type {import('next').NextConfig} */
const nextConfig = {
  headers() {
    return [
      {
        source: '/',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },

  
async redirects() {
  return [
    {
      source: '/dekoratsii-i-oformlenie/:slug',
      destination: '/fotozony/:slug',
      permanent: true,
    },
  ]
},

}

export default nextConfig