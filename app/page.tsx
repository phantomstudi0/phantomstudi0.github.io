import Hero from '@/components/home/Hero'
import ServicesPreview from '@/components/home/ServicesPreview'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import FreelanceProfiles from '@/components/home/FreelanceProfiles'
import Contact from '@/components/home/CTA'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <FeaturedProjects />
      <FreelanceProfiles />
      <Contact />
    </main>
  )
}
