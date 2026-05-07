"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// ========================
// Projects
// ========================
export async function getProjects() {
  return await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function addProject(data: FormData) {
  await prisma.project.create({
    data: {
      title: data.get("title") as string,
      description: data.get("description") as string,
      techStack: data.get("techStack") as string,
      imageUrl: (data.get("imageUrl") as string) || null,
      demoUrl: (data.get("demoUrl") as string) || null,
      githubUrl: (data.get("githubUrl") as string) || null,
    }
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/projects");
}

export async function updateProject(id: string, data: FormData) {
  await prisma.project.update({
    where: { id },
    data: {
      title: data.get("title") as string,
      description: data.get("description") as string,
      techStack: data.get("techStack") as string,
      imageUrl: (data.get("imageUrl") as string) || null,
      demoUrl: (data.get("demoUrl") as string) || null,
      githubUrl: (data.get("githubUrl") as string) || null,
    }
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/projects");
}

// ========================
// Services
// ========================
export async function getServices() {
  return await prisma.service.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function addService(data: FormData) {
  await prisma.service.create({
    data: {
      title: data.get("title") as string,
      description: data.get("description") as string,
      icon: data.get("icon") as string | null,
    }
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ========================
// Work Experience
// ========================
export async function getWorks() {
  return await prisma.work.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function addWork(data: FormData) {
  await prisma.work.create({
    data: {
      role: data.get("role") as string,
      company: data.get("company") as string,
      duration: data.get("duration") as string,
      description: data.get("description") as string,
    }
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteWork(id: string) {
  await prisma.work.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ========================
// Testimonials
// ========================
export async function getTestimonials() {
  return await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function addTestimonial(data: FormData) {
  await prisma.testimonial.create({
    data: {
      name: data.get("name") as string,
      role: data.get("role") as string,
      content: data.get("content") as string,
      imageUrl: (data.get("imageUrl") as string) || null,
      rating: parseInt(data.get("rating") as string) || 5,
    }
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ========================
// Certificates
// ========================
export async function getCertificates() {
  return await prisma.certificate.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function addCertificate(data: FormData) {
  await prisma.certificate.create({
    data: {
      title: data.get("title") as string,
      issuer: data.get("issuer") as string,
      date: data.get("date") as string,
      imageUrl: (data.get("imageUrl") as string) || null,
      credUrl: (data.get("credUrl") as string) || null,
    }
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/about");
}

export async function deleteCertificate(id: string) {
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/about");
}

// ========================
// Site Settings
// ========================
export async function getSiteSettings() {
  let settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: { id: "main" }
    });
  }
  return settings;
}

export async function updateSiteSettings(data: FormData) {
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {
      heroTitle: data.get("heroTitle") as string,
      heroSubtitle: data.get("heroSubtitle") as string,
      aboutText: data.get("aboutText") as string,
      cvUrl: data.get("cvUrl") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      location: data.get("location") as string,
      githubUrl: data.get("githubUrl") as string,
      linkedinUrl: data.get("linkedinUrl") as string,
      twitterUrl: data.get("twitterUrl") as string,
      instagramUrl: data.get("instagramUrl") as string,
      whatsappUrl: data.get("whatsappUrl") as string,
    },
    create: {
      id: "main",
      heroTitle: data.get("heroTitle") as string,
      heroSubtitle: data.get("heroSubtitle") as string,
      aboutText: data.get("aboutText") as string,
      cvUrl: data.get("cvUrl") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      location: data.get("location") as string,
      githubUrl: data.get("githubUrl") as string,
      linkedinUrl: data.get("linkedinUrl") as string,
      twitterUrl: data.get("twitterUrl") as string,
      instagramUrl: data.get("instagramUrl") as string,
      whatsappUrl: data.get("whatsappUrl") as string,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ========================
// Chatbot Q&A
// ========================
export async function getChatbotQAs() {
  return await prisma.chatbotQA.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function addChatbotQA(data: FormData) {
  await prisma.chatbotQA.create({
    data: {
      question: data.get("question") as string,
      answer: data.get("answer") as string,
      category: (data.get("category") as string) || null,
    }
  });
  revalidatePath("/admin");
}

export async function deleteChatbotQA(id: string) {
  await prisma.chatbotQA.delete({ where: { id } });
  revalidatePath("/admin");
}
