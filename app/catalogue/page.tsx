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

export const revalidate = 604800

export const metadata = {
  title: "Homelogy Catalogue - Download Our Collection",
  description: "Browse and download our furniture catalogues",
}

const catalogItems = [
  {
    id: 1,
    title: "Polflex Catalogue Vol. 2",
    image: "/images/catalogue/catalog-book-polflex-1.jpg",
    width: "w-full md:w-[280px] lg:w-[320px]",
    aspect: "aspect-[3/4]",
  },
  {
    id: 2,
    title: "Polflex Catalogue Vol. 1",
    image: "/images/catalogue/catalog-book-polflex-2-01.jpg",
    width: "w-full md:w-[380px] lg:w-[440px]",
    aspect: "aspect-[1.4/1]",
  }
]

export default function CataloguePage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white overflow-hidden relative font-sans">
      <SiteHeader />

      {/* Lingkaran Dekorasi */}
      <div className="absolute top-[-15%] left-[-20%] md:top-[-20%] md:left-[-10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-gray-500/30 pointer-events-none z-0" />

      {/* Breadcrumb - Posisi Naik */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-6">
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

      {/* Main Section - Posisi Naik */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 pb-24 -mt-4 md:-mt-6"> 
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16 md:mb-24">
            <h1 className="font-sans font-extralight text-[#ef5023] leading-[1.05] tracking-tight">
              <span className="block text-6xl md:text-8xl lg:text-[110px]">Our</span>
              <span className="block text-6xl md:text-8xl lg:text-[110px]">Catalogue</span>
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-end gap-12 md:gap-16 lg:gap-24">
            {catalogItems.map((item) => (
              <div key={item.id} className={`flex flex-col group ${item.width}`}>
                
                {/* Image Container */}
                <div className="w-full mb-6 cursor-pointer relative">
                  <div className={`relative ${item.aspect} w-full overflow-hidden transition-all duration-500 group-hover:shadow-[0_10px_40px_rgba(239,80,35,0.2)]`}>
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

                {/* Title & Hover Effect */}
                <div className="w-full text-left cursor-pointer">
                  {/* Teks berubah merah saat hover (group-hover:text-[#ef5023]) */}
                  <h3 className="text-lg md:text-xl lg:text-[22px] font-light text-gray-200 tracking-wide transition-colors duration-300 group-hover:text-[#ef5023]">
                    {item.title}
                  </h3>
                  
                  {/* Garis merah muncul saat hover (scale-x-0 jadi scale-x-100) */}
                  <div className="mt-2 w-full h-[1px] bg-[#ef5023] origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
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