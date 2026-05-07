import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";
import ContactPageContent from "@/components/sections/ContactPageContent";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Contact | Abdul Ahad - Full Stack Developer",
  description: "Get in touch with Abdul Ahad. Available for freelance work, collaborations, and full-time opportunities.",
};

export default async function ContactPage() {
  return (
    <ClientWrapper>
      <Navbar />
      <main className="flex flex-col w-full relative z-10">
        <ContactPageContent />
      </main>
      <Footer />
    </ClientWrapper>
  );
}
