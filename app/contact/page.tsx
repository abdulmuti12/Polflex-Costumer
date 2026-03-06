"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
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

// METADATA DIHAPUS DARI SINI UNTUK MENGHILANGKAN ERROR
// Pindahkan ke file layout.tsx jika ingin SEO tetap berjalan

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } catch {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      <SiteHeader />

      {/* Background decorative curved line */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1500 1000"
          preserveAspectRatio="none"
        >
          <path
            d="M 100 50 Q 500 500 50 1000"
            stroke="rgba(107, 114, 128, 0.3)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <div className="snap-start">
          <section className="relative z-10 px-6 md:px-12 lg:px-20 py-6 pt-24 md:pt-28 min-h-screen flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
              {/* Breadcrumb */}
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-orange-500">Contact</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </motion.div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[600px]">
                {/* Left Side - Text Section */}
                <motion.div
                  className="flex flex-col justify-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="mb-8">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="mb-6"
                    >
                      <Image
                        src="/images/logo/logo-header.png"
                        alt="Polflex Office"
                        width={110}
                        height={20}
                        className="h-5 md:h-6 w-auto"
                        priority
                      />
                    </motion.div>

                    <motion.h1
                      className="text-6xl md:text-7xl lg:text-8xl font-light text-orange-500 leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      Let's<br /><span className="ml-20 md:ml-32 lg:ml-40 inline-block">Get in</span><br />Touch
                    </motion.h1>
                  </div>

                  <motion.p
                    className="text-gray-400 text-sm leading-relaxed max-w-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    Ready to transform your workspace? Reach out to our team and let's create
                    something extraordinary together. We're here to help bring your vision to life.
                  </motion.p>
                </motion.div>

                {/* Right Side - Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Fields tetap sama */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm text-white mb-3">
                        Name<span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors pb-3 text-base"
                        placeholder="Your name"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm text-white mb-3">
                        Email<span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors pb-3 text-base"
                        placeholder="Your email"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm text-white mb-3">
                        Phone<span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors pb-3 text-base"
                        placeholder="Your phone number"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm text-white mb-3">Messages</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors pb-3 text-base resize-none"
                        placeholder="Your message"
                        rows={4}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="pt-6"
                    >
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-orange-500 transition-colors">
                          <svg
                            className="w-5 h-5 text-white group-hover:text-orange-500 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </div>
                        <span className="text-white uppercase text-sm tracking-widest group-hover:text-orange-500 transition-colors">
                          {isSubmitting ? "Sending..." : "Send"}
                        </span>
                      </button>

                      {submitStatus === "success" && (
                        <p className="text-orange-500 text-sm mt-4">Message sent successfully!</p>
                      )}
                      {submitStatus === "error" && (
                        <p className="text-red-500 text-sm mt-4">Failed to send message. Please try again.</p>
                      )}
                    </motion.div>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        <div className="snap-start relative z-10">
          <FooterSection />
        </div>
      </div>

      <WhatsAppButton />
    </main>
  )
}