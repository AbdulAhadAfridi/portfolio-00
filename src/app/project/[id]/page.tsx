import { getProjects } from "@/app/actions";
import ProjectCaseStudy from "@/components/sections/ProjectCaseStudy";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((p: any) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
