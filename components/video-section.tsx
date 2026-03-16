"use client"

import { useEffect, useState, useRef } from "react"
import { Play } from "lucide-react"

export function VideoSection() {
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
      {
        threshold: 0.15,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-20 font-sans relative"
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* Video Thumbnail Section */}
        <div
          className={`relative w-full aspect-[21/9] md:aspect-video lg:aspect-[2.5/1] max-w-full overflow-hidden group cursor-pointer transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Background Image */}
          <img
            src="/images/polflex-showroom-footer.jpg"
            alt="Polflex Office Showroom Video"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Dark Overlays for Blending */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#0a0a0a] to-transparent" />

          {/* Play Button Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Play
                fill="white"
                strokeWidth={0}
                className="w-8 h-8 md:w-10 md:h-10 text-white ml-2" // ml-2 agar ikon play terlihat benar-benar di tengah secara visual
              />
            </div>
          </div>
        </div>

        {/* Text Description Section */}
        <div
            className={`w-full max-w-[1100px] px-8 md:px-12 -mt-8 md:-mt-12 transition-all duration-1000 delay-300 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p 
            className="text-white/70 text-[13px] md:text-[15px] lg:text-[16px] font-light leading-[1.9] text-center tracking-[0.02em]"
            style={{ fontFamily: "Futura Light BT, sans-serif" }}
          >
  The result of experience developed over three generations since 1951. 
  Functionality and Elegance. Quality and Style. Polflex products feature 
  innovative and unique content that combined with simple lines as the ultimate 
  sophistication. They meet contemporary needs for work and relaxation in a 
  comfortable and welcoming environment, for receiving guests, thinking and 
  coordinating. Polflex offers you a professional and luxurious collection of 
  exclusive furnishing furniture made using the finest high-quality materials 
  such as leather, marble, wood, glass, stainless steel, and aluminium. 
  Polflex products embody the very best ancient craft traditions.
</p>
        </div>

      </div>
    </section>
  )
}
