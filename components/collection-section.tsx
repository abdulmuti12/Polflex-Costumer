"use client"

import Link from "next/link"
import { useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const collections = [
  {
    title: "New Arrival",
    image: "/images/new-arrival.jpg",
    slug: "new-arrival",
  },
  {
    title: "In-Stock",
    image: "/images/in-stock.jpg",
    slug: "ready-stock",
  },
  {
    title: "Sale",
    image: "/images/sale.jpg", 
    slug: "sale",
  },
  {
    title: "Executive Desk",
    image: "/images/executive-desk.jpg",
    slug: "executive-desk",
  },
  {
    title: "Meeting Desk",
    image: "/images/meeting-desk.jpg",
    slug: "meeting-desk",
  },
]

// Menggandakan data 10x agar menciptakan efek perulangan tanpa ujung (Infinite Loop)
const MULTIPLIER = 10
const extendedCollections = Array(MULTIPLIER).fill(collections).flat()

export function CollectionSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    setTimeout(() => {
      const itemWidth = container.scrollWidth / extendedCollections.length
      const middleIndex = Math.floor(MULTIPLIER / 2) * collections.length
      
      container.classList.remove('scroll-smooth')
      container.scrollLeft = itemWidth * middleIndex
      
      setTimeout(() => {
        container.classList.add('scroll-smooth')
      }, 50)
    }, 100)
  }, [])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    let scrollAmount = 0
    if (window.innerWidth >= 1024) {
      scrollAmount = container.clientWidth / 5
    } else if (window.innerWidth >= 768) {
      scrollAmount = container.clientWidth / 3
    } else {
      scrollAmount = window.innerWidth * 0.85
    }

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })

    setTimeout(() => {
      const itemWidth = container.scrollWidth / extendedCollections.length
      const singleSetWidth = itemWidth * collections.length

      if (container.scrollLeft < singleSetWidth * 2) {
        container.classList.remove('scroll-smooth')
        container.scrollLeft += singleSetWidth * Math.floor(MULTIPLIER / 2)
        setTimeout(() => container.classList.add('scroll-smooth'), 50)
      } 
      else if (container.scrollLeft > singleSetWidth * (MULTIPLIER - 2)) {
        container.classList.remove('scroll-smooth')
        container.scrollLeft -= singleSetWidth * Math.floor(MULTIPLIER / 2)
        setTimeout(() => container.classList.add('scroll-smooth'), 50)
      }
    }, 600)
  }

  return (
    <section className="relative w-full bg-black flex flex-col justify-center min-h-[90vh] overflow-hidden py-10">
      
      <div className="w-full relative group mt-16 lg:mt-24">
        
        {/* Tombol Kiri */}
        <button 
          onClick={() => scroll("left")}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/40 flex items-center justify-center bg-black/40 backdrop-blur-md z-20 text-white hover:bg-black/80 hover:scale-110 transition-all cursor-pointer opacity-100 lg:opacity-0 lg:group-hover:opacity-100 shadow-xl"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
        </button>

        {/* Track Slider */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {extendedCollections.map((collection, index) => (
            <Link
              key={index}
              href={`/products/category/${collection.slug}`}
              className="relative flex-none w-[85vw] md:w-[33.333vw] lg:w-[20vw] aspect-[3/4] snap-center overflow-hidden group/item border-r border-black/80 last:border-r-0 bg-[#0a0a0a]"
            >
              <div
                className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-700 group-hover/item:scale-110"
                style={{ backgroundImage: `url(${collection.image})` }}
              />

              {/* Bayangan Hitam di Bawah agar teks terbaca */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex justify-center items-end">
                {/* PERUBAHAN DI SINI: Teks putih secara default, oranye saat di-hover */}
                <h3 className="text-xl md:text-2xl font-light tracking-wide transition-colors duration-300 z-10 text-white group-hover/item:text-[#E85C33]">
                  {collection.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Tombol Kanan */}
        <button 
          onClick={() => scroll("right")}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/40 flex items-center justify-center bg-black/40 backdrop-blur-md z-20 text-white hover:bg-black/80 hover:scale-110 transition-all cursor-pointer opacity-100 lg:opacity-0 lg:group-hover:opacity-100 shadow-xl"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
        </button>

      </div>
    </section>
  )
}