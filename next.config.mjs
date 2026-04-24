const apiSource = process.env.NEXT_PUBLIC_API_HOST || process.env.NEXT_PUBLIC_API_URL
const remotePatterns = []

if (apiSource) {
  try {
    const parsed = new URL(apiSource.includes('://') ? apiSource : `https://${apiSource}`)
    remotePatterns.push(new URL(`${parsed.origin}/**`))
  } catch {
    // Ignore invalid env var values and fall back to no remote patterns.
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns,
  },
  // Optimize caching for SSG/ISR pages
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 60 seconds
    pagesBufferLength: 5,
  },
  // Enable static optimization
  staticPageGenerationTimeout: 120,
}

export default nextConfig
