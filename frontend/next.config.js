/** @type {import('next').NextConfig} */

// AGENTWATCH_API_URL may arrive as a bare hostname from Render's fromService
// injection (e.g. "agentwatch-api.onrender.com") or as a full URL
// (e.g. "https://agentwatch-api.onrender.com"). Normalise either form.
function normaliseApiUrl(raw) {
  if (!raw) return 'http://localhost:8000'
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  return `https://${raw}`
}

const API_URL = normaliseApiUrl(process.env.AGENTWATCH_API_URL)

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${API_URL}/api/v1/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
