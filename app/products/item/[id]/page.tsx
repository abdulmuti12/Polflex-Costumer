"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
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

interface ProductData {
  id: number
  name: string
  category: string
  description: string
  size: string
  color: string
  image1: string
  image2: string
  image3: string
  image4: string
  image5: string
  image6: string
  brand: string
  recomended_products: Array<{
    id: number
    name: string
    image1: string
    brand: string
  }>
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    general: ProductData
  }
  status: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id

  const [product, setProduct] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<ProductData["recomended_products"]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customers/product/${productId}`
        )
        const json: ApiResponse = await response.json()

        if (json.success && json.data?.general) {
          setProduct(json.data.general)
          setRelatedProducts(json.data.general.recomended_products)
          setError(null)
        } else {
          setError(json.message || "Failed to load product details")
          setProduct(null)
        }
      } catch (err) {
        console.log("[v0] Product API Error:", err)
        setError("Failed to connect to server")
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#2b2a29]">
        <SiteHeader />
        <div className="text-center px-6">
          <p className="text-stone-400 text-lg">Loading product...</p>
        </div>
        <WhatsAppButton />
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#2b2a29]">
        <SiteHeader />
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-red-400 text-lg mb-4">
            {error || "The product you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 bg-[#e85d34] text-white rounded hover:bg-[#d4512c] transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </div>
        <WhatsAppButton />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#2b2a29] text-stone-200 overflow-x-hidden">
      <SiteHeader />

      {/* Decorative Line (Optional) */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none overflow-hidden opacity-20 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full border border-stone-100/30"></div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="px-6 lg:px-16 py-4 pt-24 md:pt-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="text-stone-400 hover:text-[#e85d34] transition-colors text-xs">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-stone-500" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/products" className="text-stone-400 hover:text-[#e85d34] transition-colors text-xs">
                    Products
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-stone-500" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#e85d34] text-xs font-medium">
                  {product.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Product Detail Top Section - Mengikuti Struktur Kode 1 */}
      <section className="px-6 lg:px-16 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-5 items-start">
          
          {/* Left: Product Image */}
          <div className="w-full max-w-lg ml-0 lg:ml-auto">
            <div className="relative w-full aspect-square overflow-hidden bg-stone-800">
              <img
                src={product.image1 || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="text-stone-300 pt-4 lg:pt-0">
            <h1 className="font-sans font-semibold text-4xl lg:text-5xl text-[#e85d34] mb-6 tracking-wide">
              {product.name}
            </h1>

            <p className="text-stone-400 leading-relaxed mb-10 text-sm lg:text-base max-w-2xl text-justify">
              {product.description}
            </p>

            {/* Product Details Grid */}
            <div className="grid grid-cols-[100px_1fr] gap-y-4 text-sm mb-10 text-stone-500">
              <span>Brand</span>
              <span className="text-stone-200">{product.brand}</span>

              <span className="flex items-center">Color</span>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#c78b65] border border-stone-600"></span>
                  <span className="w-5 h-5 rounded-full bg-[#2a2a29] border border-stone-500"></span>
                  <span className="w-5 h-5 rounded-full bg-white border border-stone-600"></span>
                </div>
                <span className="text-stone-200">{product.color}</span>
              </div>

              <span>Dimensions</span>
              <span className="text-stone-200">{product.size}</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-8 py-4 lg:py-5 text-sm font-light text-white bg-transparent border border-white/60 hover:border-white hover:bg-white/10 transition-colors duration-300 rounded-none">
                Get the Price
              </button>
              <button className="px-8 py-4 lg:py-5 text-sm font-light text-white bg-transparent border border-white/60 hover:border-white hover:bg-white/10 transition-colors duration-300 rounded-none">
                Visit Website
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Middle Gallery Section - Mengikuti Struktur Container Kode 1 */}
      <section className="px-6 lg:px-16 mb-20">
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[product.image2, product.image3, product.image4].map((imgUrl, idx) => (
              <div key={idx} className="group relative w-full aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={imgUrl || "/placeholder.svg"}
                  alt={`${product.name} detail ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You May Also Like Section - Mengikuti Struktur Kode 1 */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="px-6 lg:px-16 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-sans font-light text-5xl sm:text-6xl lg:text-7xl text-[#e85d34] mb-12 leading-tight tracking-wide">
              You also<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;may like
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/item/${relatedProduct.id}`}
                  className="group block cursor-pointer"
                >
                  <div className="relative w-full aspect-square bg-gray-900 overflow-hidden mb-4">
                    <img
                      src={relatedProduct.image1 || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                  <p className="text-xl text-stone-200 font-light tracking-wide group-hover:text-[#e85d34] transition-colors duration-300">
                    {relatedProduct.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FooterSection />
      <WhatsAppButton />
    </main>
  )
}