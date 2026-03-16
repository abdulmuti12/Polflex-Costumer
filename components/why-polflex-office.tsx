"use client"

import { motion } from "framer-motion"

interface ReasonItem {
  title: string
  description: string
}

const reasons: ReasonItem[] = [
  {
    title: "Design That Supports Work",
    description:
      "Every product is developed with a focus on ergonomics, durability, and long-hour comfort. Designed to support productivity where it matters most.",
  },
  {
    title: "International Standards",
    description:
      "Globally benchmarked quality, materials, and functionality, delivered with local understanding and professional service.",
  },
  {
    title: "Tailored Consultation",
    description:
      "Our team listens, understands, and recommends workspace solutions based on your needs, layout, and working style.",
  },
  {
    title: "Beyond Delivery",
    description:
      "From consultation and customization to installation and after-sales support, Polflex ensures consistency at every stage, long after setup is complete.",
  },
]

const ORANGE = "#F05A28" // sesuaikan kalau kamu punya brand color exact

export function WhyPolflexOffice() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#070708]">
      {/* Background (soft vignette like screenshot) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px circle at 18% 10%, rgba(240,90,40,0.10), transparent 55%)," +
            "radial-gradient(900px circle at 75% 0%, rgba(255,255,255,0.05), transparent 55%)," +
            "linear-gradient(to bottom, #111114 0%, #070708 70%, #050506 100%)",
        }}
      />
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-24 py-16 sm:py-20 lg:py-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true, amount: 0.35 }}
          className="max-w-4xl"
        >
          <h2
            className="font-extralight tracking-tight leading-[0.98]"
            style={{ color: ORANGE, fontFamily: "Futura Book Font, sans-serif" }}
          >
            <span className="block text-[56px] sm:text-[72px] md:text-[88px] lg:text-[96px]">
              Why
            </span>
            <span className="block text-[56px] sm:text-[72px] md:text-[88px] lg:text-[96px]">
              Polflex Office?
            </span>
          </h2>
        </motion.div>

        {/* Reasons (single column like screenshot) */}
        <div className="mt-16 sm:mt-20 lg:mt-24 max-w-2xl">
          <div className="space-y-14 sm:space-y-16 lg:space-y-20">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.35 }}
              >
                <h3
                  className="font-light tracking-tight text-[24px] sm:text-[28px] leading-tight"
                  style={{ color: ORANGE, fontFamily: "Futura Book Font, sans-serif" }}
                >
                  {reason.title}
                </h3>

                <p 
                  className="mt-4 sm:mt-5 font-light text-[15px] sm:text-[16px] leading-7 text-[#CFCFCF]"
                  style={{ fontFamily: "Futura Light BT, sans-serif" }}
                >
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
