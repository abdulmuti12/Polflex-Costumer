"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

const collections = [
  {
    title: "New Arrival",
    image: "/images/new-arrival.jpg",
    slug: "new-arrival",
  },
  {
    title: "Ready Stock",
    image: "/images/in-stock.jpg",
    slug: "ready-stock",
  },
  {
    title: "Sales Stock",
    image: "/images/executive-desk.jpg",
    slug: "sales-stock",
  },
  {
    title: "All Products",
    image: "/images/meeting-desk.jpg",
    slug: "all",
  },
]

export function CollectionSection() {
  return (
    <section
      className="flex flex-col justify-center relative py-20 bg-black"
      style={{ minHeight: "105vh" }}
    >
      <div className="w-full relative z-10">
        {/* Grid of collections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-6">
          {collections.map((collection) => (
            <Link
              key={collection.title}
              href={`/products/category/${collection.slug}`}
              className="group relative aspect-[3/5] overflow-hidden"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${collection.image})` }}
              />

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="font-light text-white text-lg md:text-xl lg:text-2xl">{collection.title}</h3>
              </div>
            </Link>
          ))}
        </div>

     
      </div>
    </section>
  )
}
