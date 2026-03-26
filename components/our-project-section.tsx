"use client"

import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "18 Park Place",
    year: "2025",
    image: "/images/Artboard-1.jpg", 
    alt: "Modern interior design",
  },
  {
    title: "Executive Lounge",
    year: "2024",
    image: "/images/project/02.jpg",
    alt: "Luxury lounge interior",
  },
  {
    title: "Private Sanctuary",
    year: "2023",
    image: "/images/project/03.jpg",
    alt: "Bedroom interior design",
  },
  {
    title: "Lago Event",
    year: "2024",
    image: "/images/project/01.jpg",
    alt: "Event space design",
  },
]

export function OurProjectSection() {
  const [idx, setIdx] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection Observer untuk animasi masuk section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Fungsi Next Slide
  const next = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setIdx((prev) => (prev + 1) % projects.length)
    setTimeout(() => setIsAnimating(false), 500) // Durasi animasi
  }, [isAnimating])

  // Hitung index gambar kiri, tengah, kanan
  const current = projects[idx]
  const left = projects[idx === 0 ? projects.length - 1 : idx - 1]
  const right = projects[idx === projects.length - 1 ? 0 : idx + 1]

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background decoration line (optional) */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
         <svg className="absolute right-0 top-1/4 w-1/2 h-auto opacity-20" viewBox="0 0 500 500" fill="none">
            <path d="M0,250 Q250,0 500,250" stroke="white" strokeWidth="1" />
         </svg>
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* === LEFT SIDE: IMAGE SLIDER === */}
        <div className="lg:col-span-7 relative h-[400px] md:h-[500px] flex items-center justify-center perspective-1000">
          
          {/* Left Image (Blurry & Smaller) */}
          <div 
            className="absolute left-0 md:left-4 w-[200px] md:w-[280px] h-[280px] md:h-[380px] z-0 opacity-40 transform -translate-x-12 scale-90 transition-all duration-500 cursor-pointer"
            onClick={next} // Klik kiri bisa next/prev sesuai logika (di sini simpel next aja biar muter)
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg">
                <Image
                  src={left.image}
                  alt={left.alt}
                  fill
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
          </div>

          {/* Center Image (Active & Big) */}
          <div className="absolute z-20 w-[280px] md:w-[380px] h-[350px] md:h-[480px] shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
            <div className="relative w-full h-full overflow-hidden rounded-lg cursor-pointer" onClick={next}>
               <Image
                  src={current.image}
                  alt={current.alt}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Gradient Overlay bawah untuk teks */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* TEKS JUDUL & TAHUN (Posisi sesuai referensi) */}
                <div className="absolute bottom-6 w-full text-center px-4">
                  <h3 className="text-2xl md:text-3xl text-white font-light tracking-wide mb-1 drop-shadow-lg">
                    {current.title}
                  </h3>
                  <p className="text-gray-400 text-sm tracking-widest font-light">
                    {current.year}
                  </p>
                </div>
            </div>
          </div>

          {/* Right Image (Blurry & Smaller) */}
          <div 
            className="absolute right-0 md:right-4 w-[200px] md:w-[280px] h-[280px] md:h-[380px] z-0 opacity-40 transform translate-x-12 scale-90 transition-all duration-500 cursor-pointer"
            onClick={next}
          >
             <div className="relative w-full h-full overflow-hidden rounded-lg">
                <Image
                  src={right.image}
                  alt={right.alt}
                  fill
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
          </div>

        </div>

        {/* === RIGHT SIDE: TEXT CONTENT === */}
        <div className="lg:col-span-5 text-center lg:text-left pl-0 lg:pl-12 mt-10 lg:mt-0">
          <div 
            className={cn(
              "transition-all duration-1000 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
            <h2 className="text-5xl md:text-7xl font-thin text-[#ff6b35] leading-tight mb-2"               style={{ 
  fontFamily: "Futura Light BT, sans-serif"
}}  >
              Our
            </h2>
            <h2 className="text-5xl md:text-7xl font-normal text-[#ff6b35] leading-tight mb-8"               style={{ 
  fontFamily: "Futura Light BT, sans-serif"
}}  >
              Projects
            </h2>
            
          <p
  className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto lg:mx-0 mb-10 font-light text-justify"
  style={{ 
    fontFamily: "Futura Light BT, sans-serif"
  }}
>
  Polflex Office is featured across a range of professional environments, shaped by clarity in design and a focused approach to modern workspaces. Each project presents a precise integration of executive seating within well-composed interiors, where proportion, material, and spatial balance are carefully considered. From executive offices and boardrooms to meeting spaces, the collection adapts seamlessly across different workplace settings. Clean lines support both function and visual consistency. Working closely with architects, interior designers, and corporate clients. Each project reflects a consistent direction in craftsmanship, material quality, and design.
</p>

            <Link href="/projects" className="inline-flex items-center group text-white hover:text-[#ff6b35] transition-colors">
              <span className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center mr-4 group-hover:border-[#ff6b35] transition-colors">
                 <ChevronRight className="w-5 h-5" />
              </span>
              <span className="text-xs tracking-[0.2em] uppercase">View More</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
