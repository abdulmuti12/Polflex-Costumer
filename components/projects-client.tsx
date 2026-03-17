"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/footer-section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Sesuaikan interface dengan response API
interface ProjectItem {
  id: number
  name: string
  brand: string
  type: string
  category: string | null
  architect: string
  location: string
  photo_created: string
  select: any
  file: string
  designer: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    data: ProjectItem[]
    current_page: number
    last_page: number
    total: number
    // Kolom pagination lainnya bisa ditambahkan jika diperlukan
  }
  status: number
}

// Opsi filter statis (Anda bisa membuatnya dinamis nanti jika category dari API bervariasi)
const filterOptions = ["All", "property", "text", "Others"]

export default function ProjectsClient() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null)
  const itemsPerPage = 6

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        // Jika API mendukung parameter pagination, Anda bisa menyesuaikan URL-nya:
        // `https://casaitalia-living.com/api/customers/project?page=${currentPage}`
        // Untuk contoh ini, kita ambil semua dari endpoint base.
        const response = await fetch("https://casaitalia-living.com/api/customers/project")
        
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const json: ApiResponse = await response.json()

        if (json.success && json.data?.data) {
          setProjects(json.data.data)
          setError(null)
        } else {
          setError(json.message || "Failed to load projects")
        }
      } catch (err) {
        console.error("API Fetch Error:", err)
        setError("Failed to connect to server")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, []) // Jika menggunakan pagination dari API, tambahkan [currentPage] ke array dependency ini.

  // Logika filter lokal (Pastikan category dari API sesuai. Jika null, kita anggap 'Others' atau string kosong)
  const filteredProjects =
    selectedFilter === "All"
      ? projects
      : projects.filter((p) => {
          const cat = p.category ? p.category.toLowerCase() : "others"
          return cat === selectedFilter.toLowerCase()
        })

  // Logika pagination lokal
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  if (loading) {
    return (
      <main className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">
        <SiteHeader />
        <p className="text-gray-400">Loading projects...</p>
        <WhatsAppButton />
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">
        <SiteHeader />
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-orange-500 rounded text-white"
          >
            Try Again
          </button>
        </div>
        <WhatsAppButton />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white relative">
      <SiteHeader />

      {/* Dekorasi garis lingkaran background */}
      <div
        className="absolute top-[-15%] left-[-20%] md:top-[-20%] md:left-[-10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none z-0"
        style={{
          borderWidth: "3px",
          borderColor: "rgba(107, 114, 128, 0.5)",
        }}
      />

      {/* Container utama */}
      <div
        className="relative z-10 overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{
          scrollPaddingTop: "0",
          scrollBehavior: "smooth",
        }}
      >
        <div className="snap-start">
          <section className="relative z-10 px-6 md:px-12 lg:px-20 py-6 pt-24 md:pt-28 min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto w-full">
              <div className="mb-12">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-orange-500">
                        Projects
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="mb-16">
                <motion.h1
                  className="font-light text-5xl md:text-6xl lg:text-7xl text-orange-500 mb-8 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  Built for professional
                  <br />
                  environments.
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-12">
                  <motion.p
                    className="text-gray-250 text-base leading-relaxed max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    From executive offices to collaborative areas, Polflex delivers workspace
                    solutions that balance design clarity, ergonomics, and durability. Every
                    project reflects our commitment to creating offices that work efficiently
                    while maintaining a composed and professional atmosphere.
                  </motion.p>

                  <motion.div
                    className="flex justify-end"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="flex flex-wrap gap-3">
                      {filterOptions.map((filter, idx) => (
                        <motion.button
                          key={filter}
                          onClick={() => {
                            setSelectedFilter(filter)
                            setCurrentPage(1)
                          }}
                          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedFilter === filter
                              ? "bg-orange-500 text-white"
                              : "bg-gray-800 text-white hover:bg-gray-700"
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {filter}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {paginatedProjects.length === 0 ? (
                  <div className="text-center py-20 text-gray-500">
                    No projects found for this category.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {paginatedProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.2 }}
                      >
                        <div
                          className="cursor-pointer group"
                          onMouseEnter={() => setHoveredProjectId(project.id)}
                          onMouseLeave={() => setHoveredProjectId(null)}
                        >
                          <Link href={`/projects/${project.id}`}>
                            <motion.div
                              className="overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105"
                              whileHover={{ y: -5 }}
                              transition={{ duration: 0.3 }}
                            >
                              <img
                                src={project.file || "/placeholder.svg"} // Menggunakan data 'file' dari API
                                alt={project.name} // Menggunakan data 'name' dari API
                                className="w-full aspect-video object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg"
                                }}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{
                                duration: 0.5,
                                delay: index * 0.1 + 0.2,
                              }}
                              viewport={{ once: true, amount: 0.2 }}
                            >
                              <h3
                                className={`font-medium text-base ${
                                  hoveredProjectId === project.id
                                    ? "text-orange-500"
                                    : "text-white"
                                }`}
                              >
                                {project.name} {/* Menggunakan data 'name' dari API */}
                              </h3>
                              <p className="text-gray-400 text-sm mt-1 capitalize">
                                {project.category || "Uncategorized"} {/* Menangani category null */}
                              </p>
                            </motion.div>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Tampilkan pagination hanya jika ada data */}
                {totalPages > 0 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-30"
                    >
                      {"< Previous"}
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 text-sm rounded transition-all ${
                            currentPage === page
                              ? "bg-orange-500 text-white"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-30"
                    >
                      {"Next >"}
                    </button>
                  </div>
                )}
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