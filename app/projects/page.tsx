"use client"

import { useState } from "react"
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

// Static generation - revalidate every 86400 seconds (24 hours)
export const revalidate = 86400

export const metadata = {
  title: "Our Projects - Homelogy Portfolio",
  description: "Explore our stunning furniture design and interior projects",
}

const projects = [
  {
    id: 1,
    title: "Kano Permai PIK",
    category: "Residential",
    image: "/images/project/kano-permai-pik.jpg",
  },
  {
    id: 2,
    title: "Presidential Suite ST Regis Jakarta",
    category: "Residential",
    image: "/images/project/st-regis-jakarta.jpg",
  },
  {
    id: 3,
    title: "Jasa Raharja",
    category: "Residential",
    image: "/images/project/jasa-raharja.jpg",
  },
  {
    id: 4,
    title: "Sudirman FIFA Office",
    category: "Office",
    image: "/images/project/sudirman-fifa.jpg",
  },
  {
    id: 5,
    title: "Gatot Subroto-DPR RI Office",
    category: "Office",
    image: "/images/project/gatot-subroto.jpg",
  },
  {
    id: 6,
    title: "Diamond Golf IK",
    category: "Residential",
    image: "/images/project/diamond-golf-ik.jpg",
  },
]

const filterOptions = ["All", "Residential", "Office", "Others"]

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null)
  const itemsPerPage = 6

  const filteredProjects = selectedFilter === "All" ? projects : projects.filter((p) => p.category === selectedFilter)

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

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
          <section className="relative z-10 px-6 md:px-12 lg:px-20 py-6 pt-24 md:pt-28 min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto">
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

              <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                  <motion.h1
                    className="font-light text-5xl md:text-6xl lg:text-7xl text-orange-500 mb-8 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    Built for professional<br />environments.
                  </motion.h1>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <motion.p
                      className="text-gray-300 text-base leading-relaxed max-w-md"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      From executive offices to collaborative areas, Polflex delivers workspace solutions that balance design clarity, ergonomics, and durability. Every project reflects our commitment to creating offices that work efficiently while maintaining a composed and professional atmosphere.
                    </motion.p>

                    <motion.div
                      className="flex flex-wrap gap-3"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      {filterOptions.map((filter, idx) => (
                        <motion.button
                          key={filter}
                          onClick={() => {
                            setSelectedFilter(filter)
                            setCurrentPage(1)
                          }}
                          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedFilter === filter ? "bg-orange-500 text-white" : "bg-gray-800 text-white hover:bg-gray-700"
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + idx * 0.05 }}
                          viewport={{ once: true, amount: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {filter}
                        </motion.button>
                      ))}
                    </motion.div>
                  </div>
                </div>

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
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              className="w-full aspect-video object-cover"
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                            viewport={{ once: true, amount: 0.2 }}
                          >
                            <h3 className={`font-medium text-base ${hoveredProjectId === project.id ? "text-orange-500" : "text-white"}`}>
                              {project.title}
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">{project.category}</p>
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-30"
                  >
                    {"< Previous"}
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm rounded transition-all ${
                        currentPage === page ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-30"
                  >
                    {"Next >"}
                  </button>
                </div>
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
