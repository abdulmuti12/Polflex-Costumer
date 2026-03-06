import { SiteHeader } from "@/components/site-header"
import { AboutHero } from "@/components/about-hero"
import { VideoSection } from "@/components/video-section"
import { VisionMissionSection } from "@/components/vision-mission-section"
import { FooterSection } from "@/components/footer-section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { WhoWeAre } from "@/components/who-we-are"
import { WhyPolflexOffice } from "@/components/why-polflex-office"
import { OurService } from "@/components/our-service"
import { OurClients } from "@/components/our-clients"

// Static generation - revalidate every 86400 seconds (24 hours)
export const revalidate = 86400

export const metadata = {
  title: "About Polflex - Our Story & Values",
  description: "Learn about Homelogy's mission, vision, and commitment to quality furniture design",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen relative">
      <SiteHeader />
      
      {/* Container utama untuk efek Magnetic/Snap */}
      <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth" style={{ scrollPaddingTop: '0', scrollBehavior: 'smooth' }}>
        
        <div className="snap-start min-h-screen">
          <AboutHero />
        </div>

        <div className="snap-start min-h-screen">
          <VideoSection />
        </div>

        <div className="snap-start min-h-screen">
          <VisionMissionSection />
        </div>

        <div className="snap-start min-h-screen">
          <WhoWeAre />
        </div>

        <div className="snap-start min-h-screen">
          <WhyPolflexOffice />
        </div>

        {/* <div className="snap-start min-h-screen">
          <OurService />
        </div> */}

        {/* <div className="snap-start min-h-screen">
          <OurClients />
        </div> */}

        {/* Footer - use h-auto to fit content naturally */}
        <div className="snap-start">
          <FooterSection />
        </div>

      </div>

      <WhatsAppButton />
    </main>
  )
}
