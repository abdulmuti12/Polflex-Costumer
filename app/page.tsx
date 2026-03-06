import { HeroSlider } from "@/components/hero-slider"
import { SiteHeader } from "@/components/site-header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { AboutSection } from "@/components/about-section"
import { CollectionSection } from "@/components/collection-section"
import { OurProjectSection } from "@/components/our-project-section"
import { CatalogSection } from "@/components/catalog-section"
import { FooterSection } from "@/components/footer-section"

// Static generation - revalidate every 3600 seconds (1 hour)
export const revalidate = 3600

export const metadata = {
  title: "Polflex - Luxury Furniture & Interior Design",
  description: "Premium furniture and interior design solutions for modern living spaces",
}

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <SiteHeader />
      
      {/* Container utama untuk efek Magnetic/Snap */}
      <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth" style={{ scrollPaddingTop: '0', scrollBehavior: 'smooth' }}>
        
        <div className="snap-start min-h-screen">
          <HeroSlider />
        </div>

        <div className="snap-start min-h-screen">
          <AboutSection />
        </div>

        <div className="snap-start min-h-screen">
          <CollectionSection />
        </div>

        <div className="snap-start min-h-screen">
          <OurProjectSection />
        </div>

        <div className="snap-start min-h-screen">
          <CatalogSection />
        </div>

        {/* Footer - use h-auto to fit content naturally */}
        <div className="snap-start">
          <FooterSection />
        </div>

      </div>

      <WhatsAppButton />
    </main>
  )
}
