"use client"

import Link from "next/link"
import Image from "next/image"
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

// Static generation - revalidate every 604800 seconds (7 days)
export const revalidate = 604800

export const metadata = {
  title: "Homelogy Catalogue - Download Our Collection",
  description: "Browse and download our furniture catalogues",
}

// Sesuaikan data dengan gambar referensi (termasuk rasio dan status garis bawah)
const catalogItems = [
  {
    id: 1,
    title: "Polflex Catalogue Vol. 2",
    image: "/images/catalogue/catalog-book-polflex-1.jpg",
    width: "w-full md:w-[280px] lg:w-[320px]",
    aspect: "aspect-[3/4]", // Portrait
    isActive: true, // Untuk garis bawah orange
  },
  {
    id: 2,
    title: "Polflex Catalogue Vol. 1",
    image: "/images/catalogue/catalog-book-polflex-2-01.jpg",
    width: "w-full md:w-[380px] lg:w-[440px]",
    aspect: "aspect-[1.4/1]", // Landscape
    isActive: false,
  }
]

export default function CataloguePage() {
  return (
    // Menggunakan warna background gelap seperti desain
    <main className="min-h-screen bg-[#1a1a1a] text-white overflow-hidden relative font-sans">
      <SiteHeader />

      {/* Dekorasi Garis Lingkaran Besar di Background */}
      <div className="absolute top-[-15%] left-[-20%] md:top-[-20%] md:left-[-10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-gray-500/30 pointer-events-none z-0" />

      {/* Breadcrumb Section */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 md:pt-36 pb-6">
        <Breadcrumb>
          <BreadcrumbList className="text-[11px] md:text-xs text-gray-500 tracking-wide">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-500" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white font-medium">Catalogue</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Content Section */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Heading */}
          <div className="mb-16 md:mb-24">
            {/* Menggunakan warna orange terang dan font tipis */}
            <h1 className="font-sans font-extralight text-[#ef5023] leading-[1.05] tracking-tight">
              <span className="block text-6xl md:text-8xl lg:text-[110px]">
                Our
              </span>
              <span className="block text-6xl md:text-8xl lg:text-[110px]">
                Catalogue
              </span>
            </h1>
          </div>

          {/* Catalogue Items - Menggunakan Flexbox dengan items-end agar bawah buku sejajar */}
          <div className="flex flex-col md:flex-row items-start md:items-end gap-12 md:gap-16 lg:gap-24">
            {catalogItems.map((item) => (
              <div key={item.id} className={`flex flex-col ${item.width}`}>
                
                {/* Image Container with Dynamic Aspect Ratio */}
                <div className="w-full mb-6 group cursor-pointer relative">
                  <div className={`relative ${item.aspect} w-full overflow-hidden transition-all duration-500 group-hover:shadow-[0_10px_40px_rgba(239,80,35,0.15)]`}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={item.id === 1}
                    />
                  </div>
                </div>

                {/* Title & Underline Section */}
                <div className="w-full text-left">
                  <h3 className="text-lg md:text-xl lg:text-[22px] font-light text-gray-200 tracking-wide">
                    {item.title}
                  </h3>
                  {/* Garis orange hanya untuk item yang aktif (Vol 2) */}
                  {item.isActive && (
                    <div className="mt-3 w-[110%] md:w-[120%] h-[1px] bg-[#ef5023]" />
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      <div className="relative z-10">
        <FooterSection />
      </div>
      <WhatsAppButton />
    </main>
  )
}
