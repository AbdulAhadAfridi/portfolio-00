import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import ClientWrapper from "@/components/ClientWrapper";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Testimonials from "@/components/sections/Testimonials";
import Reviews from "@/components/sections/Reviews";
import {
  getProjects, getServices, getTestimonials,
  getSiteSettings, getApprovedReviews,
} from "./actions";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [projects, services, testimonials, settings, approvedReviews] =
    await Promise.all([
      getProjects(),
      getServices(),
      getTestimonials(),
      getSiteSettings(),
      getApprovedReviews(),
    ]);

  return (
    <ClientWrapper>
      <Navbar />
      <main className="flex flex-col w-full relative z-10">
        <Hero settings={settings} />
        <About settings={settings} />
        <Services dbServices={services} />
        <FeaturedProjects projects={projects} />
        <Testimonials testimonials={testimonials} />
        <Reviews reviews={approvedReviews} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </ClientWrapper>
  );
}
