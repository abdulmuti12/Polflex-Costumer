"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/footer-section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Interface disesuaikan dengan response API detail proyek
interface ProjectDetail {
  id: number
  name: string
  brand: string
  description: string
  note: string | null
  type: string
  category: string
  architect: string
  location: string
  photo_created: string
  file: string | null
  file2: string | null
  file3: string | null
  file4: string | null
  designer: string
  project_time: string
  created_at: string
  updated_at: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    general: ProjectDetail
  }
  status: number
}

export default function ProjectDetailPage() {
  const MAX_VISIBLE_THUMBNAILS = 3
  const params = useParams()
  const router = useRouter()
  // Tangkap ID dari URL (Next.js App Router params)
  const projectId = params.id

  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        setLoading(true)
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/customers/project/${projectId}`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch project detail")
        }

        const json: ApiResponse = await response.json()

        if (json.success && json.data?.general) {
          const data = json.data.general
          setProject(data)

          // Kumpulkan gambar-gambar yang tidak null ke dalam array untuk galeri
          const images = [data.file, data.file2, data.file3, data.file4].filter(
            (img): img is string => img !== null && img !== ""
          )
          setGalleryImages(images.length > 0 ? images : ["/placeholder.svg"])
          setError(null)
        } else {
          setError(json.message || "Project not found")
          setProject(null)
        }
      } catch (err) {
        console.error("API Fetch Error:", err)
        setError("Failed to connect to server")
        setProject(null)
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      fetchProjectDetail()
    }
  }, [projectId])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">
        <SiteHeader />
        <p className="text-gray-400">Loading project details...</p>
        <WhatsAppButton />
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white flex-col gap-4">
        <SiteHeader />
        <p className="text-red-400">{error || "Project not found"}</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
        >
          Go Back
        </button>
        <WhatsAppButton />
      </main>
    )
  }

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    )
  }

  const currentImage = galleryImages[currentImageIndex]
  const thumbnailStartIndex =
    galleryImages.length > MAX_VISIBLE_THUMBNAILS
      ? Math.min(
          Math.max(currentImageIndex - (MAX_VISIBLE_THUMBNAILS - 1), 0),
          galleryImages.length - MAX_VISIBLE_THUMBNAILS
        )
      : 0
  const visibleThumbnails = galleryImages
    .slice(thumbnailStartIndex, thumbnailStartIndex + MAX_VISIBLE_THUMBNAILS)
    .map((image, offset) => ({
      image,
      index: thumbnailStartIndex + offset,
    }))

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white relative">
      <SiteHeader />

      {/* Dekorasi Garis Lingkaran Besar di Background */}
      <div
        className="absolute top-[-15%] left-[-20%] md:top-[-20%] md:left-[-10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none z-0"
        style={{
          borderWidth: "3px",
          borderColor: "rgba(107, 114, 128, 0.5)",
        }}
      />

      {/* Container utama untuk efek Magnetic/Snap */}
      <div
        className="relative z-10 overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{
          scrollPaddingTop: "0",
          scrollBehavior: "smooth",
        }}
      >
        <div className="snap-start pt-24 md:pt-32">
          {/* Project Detail Section */}
          <section className="relative z-10 px-6 md:px-12 lg:px-20 pb-12 md:pb-20">
            <div className="max-w-7xl mx-auto">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 group transition-colors"
              >
                <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center group-hover:bg-gray-700 group-hover:border-gray-500 transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </div>
                <span className="text-xs md:text-sm font-light tracking-widest uppercase">
                  Back to Projects
                </span>
              </button>

              {/* Main Content: Left Info + Right Image */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 items-start">
                
                {/* Left: Project Info */}
                <div className="flex flex-col justify-start">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 font-serif leading-tight">
                    {/* <span className="text-orange-500 font-sans mr-2">&lt;</span> */}
                    {project.name}
                    {/* <span className="text-orange-500 font-sans ml-2">&gt;</span> */}
                  </h1>

                  {/* Project Details Grid */}
                  <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-y-4 text-sm mb-10 text-gray-400 font-light">
                    <span>Architect</span>
                    <span className="text-white">{project.architect || "-"}</span>

                    <span>Location</span>
                    <span className="text-white">{project.location || "-"}</span>

                    <span>Year</span>
                    <span className="text-white">{project.project_time || "-"}</span>

                    <span>Photo By</span>
                    <span className="text-white">{project.photo_created || "-"}</span>
                    
                    <span>Brand</span>
                    <span className="text-white">{project.brand || "-"}</span>
                  </div>

                  {/* Description */}
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-400 text-sm leading-relaxed font-light text-justify">
                      {project.description || "No description provided."}
                    </p>
                  </div>
                </div>

                {/* Right: Main Image with Navigation */}
                <div className="flex flex-col gap-4">
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-stone-900 border border-stone-800">
                    <Image
                      src={currentImage}
                      alt={project.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Image Navigation Arrows (Show only if multiple images) */}
                  {galleryImages.length > 1 && (
                    <div className="flex justify-end gap-3 mt-2">
                      <button
                        onClick={handlePreviousImage}
                        className="p-2.5 rounded-full border border-gray-600 hover:border-orange-500 hover:text-orange-500 transition-all"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-300 hover:text-orange-500" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="p-2.5 rounded-full border border-gray-600 hover:border-orange-500 hover:text-orange-500 transition-all"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-300 hover:text-orange-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery Thumbnails (Show only if multiple images) */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {visibleThumbnails.map(({ image, index }) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-full aspect-square overflow-hidden transition-all ${
                        index === currentImageIndex
                          ? "ring-1 ring-orange-500 opacity-100"
                          : "opacity-50 hover:opacity-100 grayscale hover:grayscale-0"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${project.name} gallery ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="snap-start relative z-10">
          <FooterSection />
        </div>
      </div>

      <WhatsAppButton />
    </main>
  )
}
