"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/footer-section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

// Dynamic rendering required for real-time filtering and API calls
export const dynamic = "force-dynamic"

const COLOR_OPTIONS = [
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Cyan",
  "Magenta",
  "Black",
  "White",
  "Gray",
  "Orange",
  "Purple",
  "Pink",
  "Brown",
  "Lime",
  "Olive",
  "Teal",
  "Navy",
  "Maroon",
  "Silver",
  "Gold",
  "Beige",
]

interface Product {
  id: number
  name: string
  category: string
  product_type: string | null
  brand: string
  image1: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    data: Product[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  status: number
}

interface Category {
  id: number
  name: string
}

interface CategoryResponse {
  success: boolean
  message: string
  data: Category[]
  status: number
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedColor, setSelectedColor] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true)
        
        // Menggabungkan environment variable dengan endpoint spesifik
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/part-category`)
        
        const json: CategoryResponse = await response.json()

        if (json.success && json.data && Array.isArray(json.data)) {
          setCategories(json.data)
        } else {
          console.log("[v0] Failed to load categories:", json.message)
          setCategories([])
        }
      } catch (err) {
        console.log("[v0] Category API Error:", err)
        setCategories([])
      } finally {
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Fetch products from API with category, color, and search filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        
        // Build query params
        // let url = `https://casaitalia-living.com/api/customers/product?page=${currentPage}`
        let url = `${process.env.NEXT_PUBLIC_API_URL}/customers/product?page=${currentPage}`
        
        // Add search parameter if entered
        if (searchTerm) {
          url += `&name=${encodeURIComponent(searchTerm)}`
        }
        
        // Add category filter if selected
        if (selectedCategory !== "All") {
          url += `&category=${encodeURIComponent(selectedCategory)}`
        }
        
        // Add color filter if selected
        if (selectedColor !== "All") {
          url += `&color=${encodeURIComponent(selectedColor)}`
        }
        
        console.log("[v0] Fetching products with URL:", url)
        const response = await fetch(url)
        const json: ApiResponse = await response.json()

        if (json.success && json.data && json.data.data) {
          setProducts(json.data.data)
          setTotalPages(json.data.last_page)
          setError(null)
        } else {
          setError(json.message || "Failed to load products")
          setProducts([])
        }
      } catch (err) {
        console.log("[v0] API Error:", err)
        setError("Failed to connect to server")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, selectedCategory, selectedColor, searchTerm])

  // Reset to page 1 when category, color, or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedColor, searchTerm])

  // API already returns filtered data, use it directly
  const paginatedProducts = products

  return (
    // Diubah: Memastikan main container relative agar abs pos berfungsi, 
    // dan menghapus pembatasan h-screen agar halaman body bisa di-scroll.
    <main className="min-h-screen bg-[#1a1a1a] text-white relative overflow-x-hidden">
      <SiteHeader />

      {/* --- DEKORASI GARIS LINGKARAN KIRI ATAS --- */}
      {/* Perubahan:
        1. h-[800px] (lebih tinggi agar kurva lebih terlihat bulat).
        2. SVG viewBox square (0 0 1000 1000) agar mudah menghitung lingkaran.
        3. cx/cy/r disesuaikan agar kurva lebih tajam/bulat membingkai header.
        4. Karena berada di 'main' yang relative, div ini akan ikut gerak (scroll) 
           ke atas saat halaman di-scroll ke bawah.
      */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none z-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMinYMin meet"
        >
          <circle
            cx="-100" // Geser pusat sedikit ke kiri luar
            cy="0"    // Pusat di paling atas
            r="800"   // Radius besar untuk kurva bulat di pojok kiri atas
            stroke="rgba(107, 114, 128, 0.3)" // Abu-abu tipis transparan
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
      
      {/* Perubahan:
        1. Menghapus 'h-screen overflow-y-auto' agar scroller utama menggunakan body halaman.
        2. Menghapus kelas snap scroll (snap-y, snap-mandatory) karena scroller body biasanya tidak menggunakannya.
        3. Mempertahankan 'scroll-smooth' untuk navigasi halus.
      */}
      <div className="relative z-10 scroll-smooth">
        
        {/* Breadcrumb dan Header Section */}
        {/* Perubahan: Menghapus 'snap-start min-h-screen' dan 'bg-[#1a1a1a]' agar transparan dan bg circle terlihat */}
        <div className="relative z-10 bg-transparent">
          <div className="px-6 md:px-12 lg:px-20 py-6 pt-24 md:pt-28">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/products">Products</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <section className="px-6 md:px-12 lg:px-20 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 mb-12">
                <div className="lg:w-1/3">
                  <h1 className="font-light text-5xl md:text-6xl text-orange-500 font-serif mb-6 relative z-10">Product</h1>
                </div>

                <div className="lg:w-2/3 flex flex-col justify-start">
                  <p className="text-gray-300 text-sm leading-relaxed relative z-10">
                    The Polflex Office collection presents a range of executive and management seating designed for contemporary workplaces.Each chair reflects a design language defined by refined proportions, quality materials, and meticulous craftsmanship. The collection includes seating solutions for executive offices, meeting spaces, and professional environments,Polflex Office products bring presence, comfort, and sophistication to modern workspaces.
                  </p>
                </div>
              </div>

              <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-20">
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="flex-1 md:max-w-sm border-gray-600 bg-gray-900 text-white placeholder-gray-500"
                />

                <div className="flex flex-wrap gap-4 md:gap-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <span className="text-sm">Color : {selectedColor}</span>
                        <ChevronDown size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="max-h-64 overflow-y-auto bg-gray-900 text-white border-gray-700">
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer" onClick={() => setSelectedColor("All")}>All</DropdownMenuItem>
                      {COLOR_OPTIONS.map((color) => (
                        <DropdownMenuItem
                          key={color}
                          className="hover:bg-gray-800 cursor-pointer"
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <span className="text-sm">Category : {selectedCategory}</span>
                        <ChevronDown size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900 text-white border-gray-700">
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer" onClick={() => setSelectedCategory("All")}>All</DropdownMenuItem>
                      {categoriesLoading ? (
                        <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
                      ) : categories.length > 0 ? (
                        categories.map((category) => (
                          <DropdownMenuItem
                            key={category.id}
                            className="hover:bg-gray-800 cursor-pointer"
                            onClick={() => setSelectedCategory(category.name)}
                          >
                            {category.name}
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <DropdownMenuItem disabled>No categories available</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <span className="text-sm">Sort by</span>
                        <ChevronDown size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900 text-white border-gray-700">
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">Newest</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">Price: Low to High</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">Price: High to Low</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">A - Z</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-16 animate-pulse">
                  <p className="text-gray-500">Loading products...</p>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center py-16">
                  <div className="text-center">
                    <p className="text-red-500 mb-2">{error}</p>
                    <p className="text-gray-500 text-sm">Please try again later</p>
                  </div>
                </div>
              ) : paginatedProducts.length === 0 ? (
                <div className="flex justify-center items-center py-16">
                  <p className="text-gray-500">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 relative z-20">
                  {paginatedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/item/${product.id}`}
                      className="cursor-pointer group flex flex-col h-full shadow-lg"
                    >
                      <div className="bg-white rounded-lg overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105">
                        <img
                          src={product.image1 || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full aspect-square object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg"
                          }}
                        />
                      </div>

                      <div className="text-left mt-auto">
                        <h3 className="text-white font-medium text-sm md:text-base group-hover:text-orange-400 transition-colors">{product.name}</h3>
                        <p className="text-gray-400 text-xs md:text-sm mt-1">
                          {product.product_type || product.category}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && !error && products.length > 0 && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 flex-wrap pb-12 relative z-20">
                  <button
                    onClick={() => {
                      setCurrentPage(Math.max(1, currentPage - 1))
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {"< Previous"}
                  </button>

                  {/* Smart pagination logic */}
                  {(() => {
                    const pages: (number | string)[] = []
                    
                    // Always show page 1
                    pages.push(1)
                    
                    if (currentPage <= 5) {
                      // If current page is in first 5, show pages 1-5
                      for (let i = 2; i <= Math.min(5, totalPages); i++) {
                        pages.push(i)
                      }
                      // Add ellipsis and last page if there are more than 5 pages
                      if (totalPages > 5) {
                        pages.push('...')
                        pages.push(totalPages)
                      }
                    } else if (currentPage > totalPages - 4) {
                      // If current page is in last 5, show ellipsis and last 5 pages
                      pages.push('...')
                      for (let i = Math.max(2, totalPages - 4); i <= totalPages; i++) {
                        pages.push(i)
                      }
                    } else {
                      // Otherwise, show ellipsis, current page and neighbors, ellipsis, and last page
                      pages.push('...')
                      pages.push(currentPage - 1)
                      pages.push(currentPage)
                      pages.push(currentPage + 1)
                      pages.push('...')
                      pages.push(totalPages)
                    }
                    
                    return pages.map((page, idx) => {
                      if (page === '...') {
                        return (
                          <span key={`ellipsis-${idx}`} className="text-gray-500">
                            ...
                          </span>
                        )
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => {
                            setCurrentPage(page as number)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                          className={`px-3 py-2 text-sm rounded transition-colors ${
                            currentPage === page
                              ? "bg-white text-black font-medium"
                              : "text-gray-400 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })
                  })()}

                  <button
                    onClick={() => {
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {"Next >"}
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        {/* Perubahan: Menghapus 'snap-start' */}
        <div className="relative z-10">
          <FooterSection />
        </div>

      </div>

      <WhatsAppButton />
    </main>
  )
}