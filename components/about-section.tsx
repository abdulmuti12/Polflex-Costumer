"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export function AboutSection() {
  return (
    <section 
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/images/polflex-about-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative circles - Top Left */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full border-2 border-gray-700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      />

      {/* Decorative circles - Bottom Right */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full border-2 border-gray-700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      />

      {/* Main Content */}
      {/* UBAH DI SINI: 'py-20' diganti 'pb-20 pt-48' agar turun sekitar 3cm (112px tambahan) */}
      <div className="relative flex flex-col justify-between min-h-screen px-6 sm:px-10 md:px-16 lg:px-24 pb-20 pt-48">
        
        {/* Bagian Atas: Heading & Columns */}
        <div>
          {/* Main Heading */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wide text-orange-500 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            About Polflex
          </motion.h1>

          {/* Two Column Layout for Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-300 mb-8">
                Precision & Comfort
              </h3>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-300 mb-4">
                Premium Craftsmanship
              </h3>
              
              {/* UBAH DI SINI: Ditambahkan 'relative -left-28' (geser kiri ±3cm) */}
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-400 relative -left-28">
                Curated for leaders
              </p>
            </motion.div>
          </div>
        </div>

        {/* --- Bagian Bawah --- */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 w-full mt-12 md:mt-0">
          
          {/* Description Text */}
          <motion.div
            className="max-w-sm" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed text-justify">
              Polflex Office presents a collection of contemporary office seating designed for refined professional environments. The brand focuses on design clarity, material quality, and well-balanced proportions that complement executive workspaces.
            </p>
          </motion.div>

          {/* View More Button */}
          <motion.a
            href="/about"
            className="flex items-center gap-3 text-gray-300 hover:text-orange-500 transition-colors group whitespace-nowrap pb-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="text-xs sm:text-sm tracking-widest uppercase font-light">View More</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}
