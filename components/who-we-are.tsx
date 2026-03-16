"use client"

import { motion } from "framer-motion"

export function WhoWeAre() {
  return (
    <section className="relative w-full min-h-screen bg-[#2b2a28] flex items-center justify-center py-24 lg:py-32">
      <div className="w-full max-w-[1100px] mx-auto px-6 md:px-12 flex flex-col">

        {/* Bagian "Who" dipisah ke atas agar kontainer di bawahnya bisa mengukur tinggi otomatis */}
        <motion.div
          className="w-full lg:w-[45%]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 
            className="text-[5rem] lg:text-[6rem] font-light leading-[0.95] text-[#ED592B]"
            style={{ fontFamily: "Futura Book Font, sans-serif" }}
          >
            Who
          </h2>
        </motion.div>

        {/* Kontainer Flex items-stretch memastikan tinggi kolom Kiri & Kanan sama persis */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-16 lg:gap-20 w-full relative">

          {/* Left side - "We Are" & Text content */}
          <motion.div
            className="w-full lg:w-[45%] flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-[5rem] lg:text-[6rem] font-light leading-[0.95] text-[#ED592B] mb-10">
              We Are
            </h2>

            <div className="space-y-6 text-[#d4d4d4] text-[15px] md:text-[16px] leading-[1.8] flex-grow">
              <p 
                className="text-justify font-light"
                style={{ fontFamily: "Futura Light BT, sans-serif" }}
              >
                Polflex Office is led by Claudia Apriliana, Creative Director, and Ayleen Apriliana, Managing Director.
              </p>

              <p 
                className="text-justify font-light"
                style={{ fontFamily: "Futura Light BT, sans-serif" }}
              >
                As Creative Director, Claudia Apriliana defines the visual identity and design direction of the brand. Her approach emphasizes refined forms, balanced proportions, and a sophisticated aesthetic suited for contemporary office environments.
              </p>

              <p 
                className="text-justify font-light"
                style={{ fontFamily: "Futura Light BT, sans-serif" }}
              >
                Ayleen Apriliana, Managing Director, leads the strategic and operational development of Polflex Office. She oversees partnerships, project collaborations, and brand growth, ensuring a consistent standard of quality and service.
              </p>
              
              <p 
                className="text-justify font-light"
                style={{ fontFamily: "Futura Light BT, sans-serif" }}
              >
                Together, they guide Polflex Office with a shared commitment to refined office furniture and elevated workspace design.
              </p>
            </div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            className="w-full lg:w-[50%] relative flex flex-col mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Di layar desktop, gambar menggunakan absolute inset-0 agar secara otomatis mengisi penuh ruang dari "We Are" sampai paragraf terakhir */}
            <img
              src="/images/who-we-are-meeting-desk.png"
              alt="Socrates Meeting Table - Polflex Collection"
              className="w-full h-[400px] lg:h-full lg:absolute lg:inset-0 object-cover rounded-none"
            />
            
            {/* Caption didorong keluar dari kotak gambar (absolute -bottom-8) agar tidak mengganggu ukuran presisi gambar */}
            <motion.p
              className="text-right text-[#888888] text-[11px] md:text-xs font-light mt-3 lg:mt-0 lg:absolute lg:-bottom-8 lg:right-0 tracking-wide w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Socrates Meeting Table - Polflex Collection
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
