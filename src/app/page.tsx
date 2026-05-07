import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import ClientWrapper from "@/components/ClientWrapper";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Testimonials from "@/components/sections/Testimonials";
import { getProjects, getServices, getWorks, getTestimonials } from "./actions";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projects = await getProjects();
  const services = await getServices();
  const works = await getWorks();
  const testimonials = await getTestimonials();

  return (
    <ClientWrapper>
      <Navbar />
      <main className="flex flex-col w-full relative z-10">
        <Hero />
        <About />
        <Services />
        <FeaturedProjects projects={projects} />
        <Testimonials testimonials={testimonials} />
        <Contact />
      </main>
      <Footer />
    </ClientWrapper>
  );
}
