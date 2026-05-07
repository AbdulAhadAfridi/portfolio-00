import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";
import { getWorks, getSiteSettings } from "../actions";
import ResumePageContent from "@/components/sections/ResumePageContent";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Resume | Abdul Ahad - Full Stack Developer",
  description: "Download Abdul Ahad's resume/CV. Full Stack Developer with expertise in React, Next.js, Node.js, and Python.",
};

export default async function ResumePage() {
  const works = await getWorks();
  const settings = await getSiteSettings();

  return (
    <ClientWrapper>
      <Navbar />
      <main className="flex flex-col w-full relative z-10">
        <ResumePageContent works={works} settings={settings} />
      </main>
      <Footer />
    </ClientWrapper>
  );
}
