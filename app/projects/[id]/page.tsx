"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/footer-section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Extended project data with detailed information and gallery images
const projectsData = [
  {
    id: 1,
    title: "PI House",
    architect: "Kithengono",
    location: "Pantai Mutiara - North Jakarta",
    year: 2024,
    photo: "Photographer Name",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zrril delerit augue duis dolore te feugait nulla",
    mainImage: "/luxury-living-room.jpg",
    galleryImages: ["/luxury-living-room.jpg", "/modern-interior-design.jpg", "/contemporary-living-space.jpg"],
  },
  {
    id: 2,
    title: "PM House",
    architect: "Design Studio",
    location: "Pondok Indah - South Jakarta",
    year: 2024,
    photo: "Professional Photographer",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zrril delerit augue duis dolore te feugait nulla",
    mainImage: "/modern-interior-design.jpg",
    galleryImages: ["/modern-interior-design.jpg", "/luxury-living-room.jpg", "/contemporary-living-space.jpg"],
  },
  {
    id: 3,
    title: "PIK Project",
    architect: "Archi Team",
    location: "Pantai Indah Kapuk - North Jakarta",
    year: 2023,
    photo: "Studio Photographer",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zrril delerit augue duis dolore te feugait nulla",
    mainImage: "/contemporary-living-space.jpg",
    galleryImages: ["/contemporary-living-space.jpg", "/luxury-living-room.jpg", "/modern-interior-design.jpg"],
  },
  {
    id: 4,
    title: "Rimau Office",
    architect: "Corporate Architects",
    location: "Kuningan - Central Jakarta",
    year: 2024,
    photo: "Commercial Photographer",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zrril delerit augue duis dolore te feugait nulla",
    mainImage: "/modern-office-space.jpg",
    galleryImages: ["/modern-office-space.jpg", "/corporate-office-interior.jpg", "/elegant-dining-room.jpg"],
  },
  {
    id: 5,
    title: "HNI OFFICE",
    architect: "Office Design Specialists",
    location: "Mega Kuningan - Central Jakarta",
    year: 2023,
    photo: "Interior Photographer",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zrril delerit augue duis dolore te feugait nulla",
    mainImage: "/corporate-office-interior.jpg",
    galleryImages: ["/corporate-office-interior.jpg", "/modern-office-space.jpg", "/elegant-dining-room.jpg"],
  },
  {
    id: 6,
    title: "MIRROR MIRROR",
    architect: "Design Collective",
    location: "Senayan - South Jakarta",
    year: 2024,
    photo: "Professional Photographer",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zrril delerit augue duis dolore te feugait nulla",
    mainImage: "/elegant-dining-room.jpg",
    galleryImages: ["/elegant-dining-room.jpg", "/luxury-living-room.jpg", "/contemporary-living-space.jpg"],
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = Number.parseInt(params.id as string)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [project, setProject] = useState<(typeof projectsData)[0] | null>(null)

  useEffect(() => {
    const foundProject = projectsData.find((p) => p.id === projectId)
    setProject(foundProject || null)
  }, [projectId])

  if (!project) {
    return (
      <main className="min-h-screen bg-[#1a1a1a]">
        <SiteHeader />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-400">Project not found</p>
        </div>
      </main>
    )
  }

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.galleryImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.galleryImages.length - 1 ? 0 : prev + 1))
  }

  const currentImage = project.galleryImages[currentImageIndex]

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white relative">
      <SiteHeader />

      {/* Dekorasi Garis Lingkaran Besar di Background */}
      <div 
        className="absolute top-[-15%] left-[-20%] md:top-[-20%] md:left-[-10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none z-0"
        style={{
          borderWidth: "3px",
          borderColor: "rgba(107, 114, 128, 0.5)"
        }}
      />

      {/* Container utama untuk efek Magnetic/Snap */}
      <div className="relative z-10 overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{
          scrollPaddingTop: "0",
          scrollBehavior: "smooth",
        }}
      >
        <div className="snap-start">
          {/* Project Detail Section */}
          <section className="relative z-10 px-6 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-12 group"
          >
            <div className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-light tracking-wide uppercase">Back to Projects</span>
          </button>

          {/* Main Content: Left Info + Right Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Project Info */}
            <div className="flex flex-col justify-start">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 font-serif">
                <span className="text-orange-500">&lt;</span>
                {project.title}
                <span className="text-orange-500">&gt;</span>
              </h1>

              {/* Project Details */}
              <div className="mb-8 space-y-3 text-sm">
                <div className="flex gap-6">
                  <span className="text-gray-400 font-light">Architect</span>
                  <span className="text-white">: {project.architect}</span>
                </div>
                <div className="flex gap-6">
                  <span className="text-gray-400 font-light">Location</span>
                  <span className="text-white">: {project.location}</span>
                </div>
                <div className="flex gap-6">
                  <span className="text-gray-400 font-light">Year</span>
                  <span className="text-white">: {project.year}</span>
                </div>
                <div className="flex gap-6">
                  <span className="text-gray-400 font-light">Photo</span>
                  <span className="text-white">: {project.photo}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed font-light">{project.description}</p>
            </div>

            {/* Right: Main Image with Navigation */}
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-700">
                <img
                  src={currentImage || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image Navigation Arrows */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={handlePreviousImage}
                  className="p-2 rounded-full border border-gray-600 hover:bg-gray-800 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-300" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="p-2 rounded-full border border-gray-600 hover:bg-gray-800 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-3 gap-6">
            {project.galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-full aspect-square rounded-lg overflow-hidden transition-all ${
                  index === currentImageIndex ? "ring-2 ring-orange-500" : "hover:opacity-80"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
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
