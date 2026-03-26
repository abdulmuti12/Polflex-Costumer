import { HeroSlider } from "@/components/hero-slider"
import { SiteHeader } from "@/components/site-header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { AboutSection } from "@/components/about-section"
import { CollectionSection } from "@/components/collection-section"
import { OurProjectSection } from "@/components/our-project-section"
import { CatalogSection } from "@/components/catalog-section"
import { FooterSection } from "@/components/footer-section"

export const revalidate = 3600

export const metadata = {
  title: "Polflex - Luxury Furniture & Interior Design",
  description: "Premium furniture and interior design solutions for modern living spaces",
}

export default function Home() {
  return (
    <main className="h-screen w-full relative overflow-hidden">
      <SiteHeader />
      
      {/* Container utama dengan snap scroll dan pembersihan scrollbar */}
      <div 
        className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollPaddingTop: '0' }}
      >
        
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

        <div className="snap-start h-auto">
          <FooterSection />
        </div>

      </div>

      <WhatsAppButton />
    </main>
  )
}