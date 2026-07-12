import { SiteHeader } from '@/components/layout/site-header'
import { HeroSection } from '@/components/hero-section'
import { ComprehensiveSection } from '@/components/comprehensive-section'
import { ServicesSection } from '@/components/services-section'
import { AllServicesSection } from '@/components/all-services-section'
import { ProcessSection } from '@/components/process-section'
import { GallerySection } from '@/components/gallery-section'
import { ReviewsSection } from '@/components/reviews-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/layout/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ComprehensiveSection />
        <ServicesSection />
        <AllServicesSection />
        <ProcessSection />
        <GallerySection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
