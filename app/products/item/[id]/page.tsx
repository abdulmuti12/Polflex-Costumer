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
import { Button } from "@/components/ui/button"

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState<ProductData["recomended_products"]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customers/product/${productId}`
        )
        const json: ApiResponse = await response.json()

        console.log("[v0] Product API Response:", json)

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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
        <SiteHeader />
        <div className="text-center px-6">
          <p className="text-gray-600 text-lg">Loading product...</p>
        </div>
        <WhatsAppButton />
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
        <SiteHeader />
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-red-500 text-lg mb-4">
            {error || "The product you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 bg-amber-900 text-white rounded hover:bg-amber-800 transition-colors"
            >
              Back to Products
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <WhatsAppButton />
      </main>
    )
  }

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: "url(/xdf.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <SiteHeader />

      {/* Breadcrumb Navigation */}
      <div className="px-4 md:px-8 lg:px-20 py-2 pt-24 md:pt-28 bg-stone-200/80 backdrop-blur-sm">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products" className="text-gray-600 hover:text-gray-900">
                  Products
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900">{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Product Detail Section */}
      <section className="px-6 md:px-12 lg:px-20 pt-1 pb-16 bg-stone-200/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 mb-12">
            {/* Left */}
            <div>
              <div className="bg-stone-300/50 rounded-lg overflow-hidden h-full min-h-[600px]">
                <img
                  src={
                    selectedImageIndex === 0
                      ? product.image1
                      : selectedImageIndex === 1
                        ? product.image2
                        : selectedImageIndex === 2
                          ? product.image3
                          : selectedImageIndex === 3
                            ? product.image4
                            : selectedImageIndex === 4
                              ? product.image5
                              : product.image6
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                />
              </div>
            </div>

            {/* Right: Product Info Card */}
            <div className="bg-white rounded-lg p-12 lg:p-16 flex flex-col h-full min-h-[600px]">
              {/* 1) perkecil teks merah + 2) kurangin jarak ke atas card */}
              <div className="text-center mb-8 mt-0">
                <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-2 tracking-tight leading-none">
                  {product.name}
                </h1>

                {/* 3) teks biru: kecilkan jarak ke garis bawah */}
                <p className="text-gray-700 text-sm md:text-base font-light mb-3">
                  {product.brand}
                </p>
              </div>

              <div className="flex-1 flex flex-col">
                {/* Divider atas: dibuat lebih dekat */}
                <div className="border-t border-gray-400 mb-5" />

                {/* 4) teks hijau: hilangkan jarak dengan garis atas & bawah (lebih mepet) */}
                <p className="text-gray-700 text-sm leading-7 mb-5 text-justify">
                  {product.description}
                </p>

                {/* Divider bawah deskripsi: lebih dekat */}
                <div className="border-t border-gray-400 mb-8" />

                {/* Product Details */}
                <div className="mb-8">
                  <h2 className="text-gray-900 font-medium text-xs tracking-widest text-center mb-4">
                    PRODUCT DETAILS
                  </h2>
                  <div className="space-y-4 text-left max-w-md mx-auto">
                    <div className="flex gap-4">
                      <span className="text-gray-700 text-sm min-w-fit">Category</span>
                      <span className="text-gray-700 text-sm">:</span>
                      <span className="text-gray-700 text-sm">{product.category}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-gray-700 text-sm min-w-fit">Material</span>
                      <span className="text-gray-700 text-sm">:</span>
                      <span className="text-gray-700 text-sm">{product.color}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-gray-700 text-sm min-w-fit">Size</span>
                      <span className="text-gray-700 text-sm">:</span>
                      <span className="text-gray-700 text-sm">{product.size}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-400 mb-1" />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-center gap-4 pt-1 mb-0">
                <Button className="h-10 px-6 bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors font-medium text-sm">
                  +
                </Button>
                <Button className="h-10 px-8 bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors font-medium text-sm">
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 justify-center mb-16 px-4">
            {[product.image1, product.image2, product.image3, product.image4, product.image5, product.image6].map(
              (image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-20 h-20 md:w-24 md:h-24 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIndex === index
                      ? "border-gray-900 scale-105"
                      : "border-gray-400 hover:border-gray-600"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                </button>
              )
            )}
          </div>

          {/* You May Also Like */}
          {product.recomended_products && product.recomended_products.length > 0 && (
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-12">
                You may also like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {product.recomended_products.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/item/${relatedProduct.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white rounded-lg overflow-hidden mb-3 shadow-md transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={relatedProduct.image1 || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full aspect-square object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-gray-900 font-medium text-sm md:text-base">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm">{relatedProduct.brand}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
      <WhatsAppButton />
    </main>
  )
}
