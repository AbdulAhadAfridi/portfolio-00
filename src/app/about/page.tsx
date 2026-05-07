import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";
import { getWorks, getCertificates, getSiteSettings } from "../actions";
import AboutPageContent from "@/components/sections/AboutPageContent";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "About | Abdul Ahad - Full Stack Developer",
  description: "Learn more about Abdul Ahad Afridi — a Full Stack Developer specializing in React, Next.js, Node.js, and Python.",
};

export default async function AboutPage() {
  const works = await getWorks();
  const certificates = await getCertificates();
  const settings = await getSiteSettings();

  return (
    <ClientWrapper>
      <Navbar />
      <main className="flex flex-col w-full relative z-10">
        <AboutPageContent works={works} certificates={certificates} settings={settings} />
      </main>
      <Footer />
    </ClientWrapper>
  );
}
