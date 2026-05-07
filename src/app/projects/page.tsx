import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";
import { getProjects } from "../actions";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Projects | Abdul Ahad - Full Stack Developer",
  description: "Explore Abdul Ahad's portfolio of web development projects, including full-stack applications, AI integrations, and more.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <ClientWrapper>
      <Navbar />
      <main className="flex flex-col w-full relative z-10">
        <ProjectsGrid projects={projects} />
      </main>
      <Footer />
    </ClientWrapper>
  );
}
