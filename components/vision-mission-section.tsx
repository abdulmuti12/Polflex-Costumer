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
              className={`text-gray-400 text-lg leading-relaxed font-normal font-['Aeonik'] transition-all duration-1000 ease-out delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
             
To be the leading destination for high-end Italian furniture, defined by uncompromising quality, refined service, and an effortless client experience.
            </p>
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
                className={`text-gray-400 text-lg leading-relaxed font-normal font-['Aeonik'] transition-all duration-1000 ease-out delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
               Curating and expanding timeless collections to meet the aspirations of our discerning clients.
Upholding the highest standards of health, safety, and well-being for our team.
              </p>
              <p
                className={`text-gray-400 text-lg leading-relaxed font-normal font-['Aeonik'] transition-all duration-1000 ease-out delay-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Upholding the highest standards of health, safety, and well-being for our team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
