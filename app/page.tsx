import Hero from '@/components/home/Hero'
import ServicesPreview from '@/components/home/ServicesPreview'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Team from '@/components/home/Process'
import Contact from '@/components/home/CTA'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <FeaturedProjects />
      <Team />
      <Contact />
    </main>
  )
}
