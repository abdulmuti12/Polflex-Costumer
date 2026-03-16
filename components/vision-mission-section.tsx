"use client"

import { useEffect, useState, useRef } from "react"

export function VisionMissionSection() {
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
        threshold: 0.2, // Trigger when 20% of the section is visible
      },
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
    <section ref={sectionRef} className="bg-black text-white h-screen flex items-center px-6 lg:px-8 snap-start">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Our Vision */}
          <div>
            <h2
              className={`text-5xl lg:text-6xl font-light mb-8 tracking-tight font-['Aeonik']   text-[#ff6633]  transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Our Vision
            </h2>
          <p
  className={`text-gray-400 text-lg leading-relaxed font-normal text-justify transition-all duration-1000 ease-out delay-200 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
  style={{ fontFamily: "Futura Light BT, sans-serif" }}
>
             
To establish Polflex Office Indonesia as the leading provider of Italian luxury office furniture, bringing timeless design, refined craftsmanship, and premium materials to create prestigious workspaces for leaders and modern professionals. Inspired by Polflex’s heritage of Italian craftsmanship since 1938, Polflex Indonesia aims to transform executive environments into spaces that reflect leadership, elegance, and performance.            </p>
          </div>

          {/* Our Mission */}
          <div className="mt-28">
       <h2
  className={`text-5xl lg:text-6xl font-light mb-8 tracking-tight font-['Aeonik'] text-[#ff6633] transition-all duration-1000 ease-out delay-300 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
>
  Our Mission
</h2>
           
            <div className="space-y-6">
             <p
  className={`text-gray-400 text-lg leading-relaxed font-normal font-['Aeonik'] text-justify transition-all duration-1000 ease-out delay-500 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
>
                Polflex Office Indonesia aims to support modern workplaces with furniture that enhances comfort, productivity, and professional presence. Through collaboration with architects, interior designers, and corporate clients, Polflex Indonesia delivers tailored solutions for evolving workspace needs. Each collection balances design and functionality, creating refined and enduring environments while contributing to the presence of Italian design in Indonesia.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
