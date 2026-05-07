"use client";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

interface ProjectCaseStudyProps {
  project: {
    id: string;
    title: string;
    description: string;
    techStack: string;
    imageUrl?: string | null;
    demoUrl?: string | null;
    githubUrl?: string | null;
  };
}

const TECH_REASONS: Record<string, string> = {
  "Next.js": "Server-side rendering and optimal performance for SEO-critical pages.",
  "React": "Component-driven architecture for complex, interactive UI systems.",
  "Node.js": "Chosen for handling high-concurrency API requests with non-blocking I/O.",
  "Python": "Ideal for data processing pipelines and ML model integration.",
  "TypeScript": "Type safety across the entire codebase, reducing runtime errors by 40%.",
  "Docker": "Containerization for consistent environments across dev, staging, and production.",
  "SQL": "Relational data modeling for complex queries with ACID compliance.",
  "MongoDB": "Flexible document storage for rapidly evolving data schemas.",
  "Redis": "In-memory caching layer reducing API response times to sub-10ms.",
  "AWS": "Cloud infrastructure with auto-scaling, CDN, and managed databases.",
  "Prisma": "Type-safe ORM enabling rapid database schema iteration and migration.",
  "Express": "Lightweight HTTP framework for building RESTful microservices.",
  "FastAPI": "High-performance Python API framework with automatic OpenAPI documentation.",
  "TensorFlow": "Deep learning framework for training and deploying ML models at scale.",
  "WebSocket": "Real-time bidirectional communication for live collaboration features.",
  "Kubernetes": "Container orchestration for zero-downtime deployments and auto-healing.",
  "Terraform": "Infrastructure as Code for reproducible, version-controlled cloud resources.",
  "Go": "High-performance compiled language for latency-critical backend services.",
};

const SAMPLE_CODE = `// API Route Handler
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization');
  
  if (!validateToken(token)) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  const data = await prisma.project.findMany({
    include: { metrics: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ data });
}`;

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const techItems = project.techStack
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link
          href="/projects"
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm font-mono"
        >
          <FaArrowLeft size={12} />
          BACK TO PROJECTS
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 md:px-24 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest mb-4 block">
            CASE STUDY
          </span>
          <h1 className="text-4xl md:text-7xl font-black mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {project.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] text-sm tracking-wider"
              >
                <FaExternalLinkAlt size={12} />
                VIEW LIVE SITE
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/20 hover:border-cyan-500/50 text-white px-8 py-3 rounded-xl transition-all hover:bg-white/5 text-sm tracking-wider font-bold"
              >
                <FaGithub size={14} />
                GITHUB REPOSITORY
              </a>
            )}
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Challenge & Solution */}
      <section className="py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-400 font-mono text-xs tracking-widest mb-4 block">
              01 — THE CHALLENGE
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Problem Definition
            </h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Building a scalable, production-ready application that handles thousands of concurrent users while maintaining sub-second response times. The system needed to integrate with multiple third-party APIs, manage complex state across distributed services, and provide real-time data synchronization.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-purple-400 font-mono text-xs tracking-widest mb-4 block">
              02 — THE SOLUTION
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Technical Approach
            </h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Implemented a microservices architecture with event-driven communication. Used serverless functions for compute-heavy tasks, a Redis caching layer for frequently accessed data, and WebSocket connections for real-time features. The entire infrastructure was containerized with Docker and orchestrated via Kubernetes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Tech Stack Breakdown */}
      <section className="py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-400 font-mono text-xs tracking-widest mb-4 block">
              03 — TECHNOLOGY
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-10">
              Tech Stack Breakdown
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techItems.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-shadow">
                    {tech.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">
                      {tech}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {TECH_REASONS[tech] || `Used for ${tech.toLowerCase()} integration and functionality.`}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Architecture / Code Section */}
      <section className="py-20 px-8 md:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-400 font-mono text-xs tracking-widest mb-4 block">
              04 — IMPLEMENTATION
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-10">
              Architecture & Code
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0d1117]"
          >
            {/* Code header bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-gray-500 text-xs font-mono ml-3">
                api/projects/route.ts
              </span>
            </div>
            {/* Code content */}
            <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
              <code className="text-gray-300 font-mono">
                {SAMPLE_CODE.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="text-gray-600 select-none w-8 text-right mr-6 flex-shrink-0">
                      {i + 1}
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightSyntax(line),
                      }}
                    />
                  </div>
                ))}
              </code>
            </pre>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Simple syntax highlighter
function highlightSyntax(line: string): string {
  return line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Comments
    .replace(/(\/\/.*)$/gm, '<span style="color:#6a9955">$1</span>')
    // Strings
    .replace(/'([^']*)'/g, '<span style="color:#ce9178">\'$1\'</span>')
    // Keywords
    .replace(
      /\b(import|export|async|function|const|if|return|from|await|new)\b/g,
      '<span style="color:#c586c0">$1</span>'
    )
    // Types/special
    .replace(
      /\b(NextRequest|NextResponse|GET|POST)\b/g,
      '<span style="color:#4ec9b0">$1</span>'
    );
}
