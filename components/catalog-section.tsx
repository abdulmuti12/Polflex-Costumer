"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function CatalogSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden font-sans"
      style={{
        backgroundImage: "url(/images/catalog-page-polflex.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "14% center", // Geser framing ke kiri
      }}
    >
      {/* Dark overlay supaya teks kontras */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="w-full px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto relative z-10">
        {/* Grid digeser supaya teks lebih kiri */}
        <div className="grid grid-cols-1 lg:grid-cols-[32%_68%] items-center">

          {/* Spacer kiri */}
          <div className="hidden lg:block" />

          {/* Content kanan */}
          <div className="flex flex-col justify-center">

            {/* Label */}
            <div
              className={`mb-5 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
            <p className="text-[#8fa0ad] text-xl md:text-2xl font-light tracking-wide">
              Our Catalogue
            </p>
            </div>

            {/* Heading */}
             <h3
  className={`font-light text-[26px] md:text-[34px] lg:text-[40px] leading-[1.18] tracking-[0.01em] text-[#e6e1d6] mb-10 transition-all duration-1000 ease-out delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Explore the Polflex Catalogue
              <br />
              Executive seating and workspace for leaders.
            </h3>

            {/* Description + CTA (indent seperti referensi) */}
            <div className="lg:ml-24 md:ml-10 ml-0 max-w-[720px] flex flex-col gap-10">

              <p
                className={`text-white/70 text-sm md:text-[16px] leading-relaxed font-light transition-all duration-1000 ease-out delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ wordSpacing: "0.15em" }}
              >
                A curated selection of Polflex Office furniture designed to support comfort,
                productivity, and professional presence across workspaces.
              </p>

              {/* Button */}
              <div
                className={`transition-all duration-1000 ease-out delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <Link
                  href="#"
                  className="group inline-flex items-center gap-4 text-white/90 text-[11px] tracking-[0.35em] uppercase"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:border-white group-hover:bg-white/5">
                    <ChevronRight
                      strokeWidth={1.2}
                      className="h-3.5 w-3.5 text-white group-hover:translate-x-0.5 transition-transform duration-300"
                    />
                  </span>
                  <span>DOWNLOAD NOW</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
