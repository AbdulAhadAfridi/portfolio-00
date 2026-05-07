import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";
import Services from "@/components/sections/Services";

export const metadata = {
  title: "Services | Abdul Ahad - Full Stack Developer",
  description: "Professional web development services by Abdul Ahad. From frontend to backend, AI chatbots to CMS development.",
};

export default function ServicesPage() {
  return (
    <ClientWrapper>
      <Navbar />
      <main className="flex flex-col w-full relative z-10 pt-12">
        <Services />
      </main>
      <Footer />
    </ClientWrapper>
  );
}
