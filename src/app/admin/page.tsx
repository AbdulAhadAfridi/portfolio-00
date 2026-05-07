import {
  getProjects, getServices, getWorks, getTestimonials, getCertificates, getChatbotQAs, getSiteSettings,
  addProject, addService, addWork, addTestimonial, addCertificate, addChatbotQA,
  deleteProject, deleteService, deleteWork, deleteTestimonial, deleteCertificate, deleteChatbotQA,
  updateSiteSettings,
} from "../actions";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const resolvedParams = await searchParams;
  const tab = resolvedParams.tab || "projects";

  const projects = await getProjects();
  const services = await getServices();
  const works = await getWorks();
  const testimonials = await getTestimonials();
  const certificates = await getCertificates();
  const chatbotQAs = await getChatbotQAs();
  const settings = await getSiteSettings();

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 capitalize">{tab} Management</h1>
      
      {/* ========== PROJECTS ========== */}
      {tab === "projects" && (
        <div className="flex flex-col gap-12">
          <form action={addProject} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-cyan-400">Add New Project</h2>
            <input name="title" placeholder="Project Title" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
            <textarea name="description" placeholder="Description" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500 min-h-[100px]" />
            <input name="techStack" placeholder="Tech Stack (comma separated)" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
            <input name="imageUrl" placeholder="Image URL (optional)" className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
            <input name="demoUrl" placeholder="Live Demo URL (optional)" className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
            <input name="githubUrl" placeholder="GitHub URL (optional)" className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
            <button type="submit" className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 p-3 rounded font-bold hover:bg-cyan-500/30 transition-colors">Add Project</button>
          </form>

          <div className="flex flex-col gap-4">
            {projects.map(p => (
              <div key={p.id} className="bg-black border border-white/10 p-4 rounded flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{p.title}</h3>
                  <p className="text-sm text-cyan-400 mb-1">{p.techStack}</p>
                  <p className="text-sm text-gray-500">{p.description}</p>
                  {p.imageUrl && <p className="text-xs text-gray-600 mt-1">📷 {p.imageUrl}</p>}
                  {p.demoUrl && <p className="text-xs text-blue-400 mt-1">🔗 {p.demoUrl}</p>}
                  {p.githubUrl && <p className="text-xs text-gray-400 mt-1">💻 {p.githubUrl}</p>}
                </div>
                <form action={deleteProject.bind(null, p.id)}>
                  <button type="submit" className="text-red-400 hover:text-red-300 text-sm bg-red-400/10 px-3 py-1 rounded">Delete</button>
                </form>
              </div>
            ))}
            {projects.length === 0 && <p className="text-gray-500">No projects found.</p>}
          </div>
        </div>
      )}

      {/* ========== SERVICES ========== */}
      {tab === "services" && (
        <div className="flex flex-col gap-12">
          <form action={addService} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-purple-400">Add New Service</h2>
            <input name="title" placeholder="Service Title" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-purple-500" />
            <textarea name="description" placeholder="Description" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-purple-500 min-h-[100px]" />
            <button type="submit" className="bg-purple-500/20 text-purple-400 border border-purple-500/50 p-3 rounded font-bold hover:bg-purple-500/30 transition-colors">Add Service</button>
          </form>

          <div className="flex flex-col gap-4">
            {services.map(s => (
              <div key={s.id} className="bg-black border border-white/10 p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{s.title}</h3>
                  <p className="text-sm text-gray-500">{s.description}</p>
                </div>
                <form action={deleteService.bind(null, s.id)}>
                  <button type="submit" className="text-red-400 hover:text-red-300 text-sm bg-red-400/10 px-3 py-1 rounded">Delete</button>
                </form>
              </div>
            ))}
            {services.length === 0 && <p className="text-gray-500">No services found.</p>}
          </div>
        </div>
      )}

      {/* ========== WORK ========== */}
      {tab === "work" && (
        <div className="flex flex-col gap-12">
          <form action={addWork} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-green-400">Add Work Experience</h2>
            <input name="role" placeholder="Role/Job Title" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-green-500" />
            <input name="company" placeholder="Company Name" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-green-500" />
            <input name="duration" placeholder="Duration (e.g. 2021 - Present)" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-green-500" />
            <textarea name="description" placeholder="Description" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-green-500 min-h-[100px]" />
            <button type="submit" className="bg-green-500/20 text-green-400 border border-green-500/50 p-3 rounded font-bold hover:bg-green-500/30 transition-colors">Add Work</button>
          </form>

          <div className="flex flex-col gap-4">
            {works.map(w => (
              <div key={w.id} className="bg-black border border-white/10 p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{w.role} <span className="text-green-400">@ {w.company}</span></h3>
                  <p className="text-sm text-gray-400 mb-1">{w.duration}</p>
                  <p className="text-sm text-gray-500">{w.description}</p>
                </div>
                <form action={deleteWork.bind(null, w.id)}>
                  <button type="submit" className="text-red-400 hover:text-red-300 text-sm bg-red-400/10 px-3 py-1 rounded">Delete</button>
                </form>
              </div>
            ))}
            {works.length === 0 && <p className="text-gray-500">No work experience found.</p>}
          </div>
        </div>
      )}

      {/* ========== TESTIMONIALS ========== */}
      {tab === "testimonials" && (
        <div className="flex flex-col gap-12">
          <form action={addTestimonial} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-yellow-400">Add Testimonial</h2>
            <input name="name" placeholder="Person's Name" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-yellow-500" />
            <input name="role" placeholder="Role (e.g. CEO at TechCorp)" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-yellow-500" />
            <textarea name="content" placeholder="Testimonial content / review" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-yellow-500 min-h-[100px]" />
            <input name="imageUrl" placeholder="Avatar Image URL (optional)" className="bg-black border border-white/10 p-3 rounded outline-none focus:border-yellow-500" />
            <select name="rating" defaultValue="5" className="bg-black border border-white/10 p-3 rounded outline-none focus:border-yellow-500">
              <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
              <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
              <option value="3">⭐⭐⭐ (3 Stars)</option>
            </select>
            <button type="submit" className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 p-3 rounded font-bold hover:bg-yellow-500/30 transition-colors">Add Testimonial</button>
          </form>

          <div className="flex flex-col gap-4">
            {testimonials.map(t => (
              <div key={t.id} className="bg-black border border-white/10 p-4 rounded flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{t.name}</h3>
                  <p className="text-sm text-yellow-400 mb-1">{t.role}</p>
                  <p className="text-sm text-gray-500 italic">&ldquo;{t.content}&rdquo;</p>
                  <p className="text-yellow-400 text-xs mt-1">{"⭐".repeat(t.rating)}</p>
                </div>
                <form action={deleteTestimonial.bind(null, t.id)}>
                  <button type="submit" className="text-red-400 hover:text-red-300 text-sm bg-red-400/10 px-3 py-1 rounded">Delete</button>
                </form>
              </div>
            ))}
            {testimonials.length === 0 && <p className="text-gray-500">No testimonials found.</p>}
          </div>
        </div>
      )}

      {/* ========== CERTIFICATES ========== */}
      {tab === "certificates" && (
        <div className="flex flex-col gap-12">
          <form action={addCertificate} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-orange-400">Add Certificate</h2>
            <input name="title" placeholder="Certificate Title" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-orange-500" />
            <input name="issuer" placeholder="Issuer (e.g. Google, Coursera)" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-orange-500" />
            <input name="date" placeholder="Date (e.g. Jan 2024)" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-orange-500" />
            <input name="imageUrl" placeholder="Certificate Image URL (optional)" className="bg-black border border-white/10 p-3 rounded outline-none focus:border-orange-500" />
            <input name="credUrl" placeholder="Verification URL (optional)" className="bg-black border border-white/10 p-3 rounded outline-none focus:border-orange-500" />
            <button type="submit" className="bg-orange-500/20 text-orange-400 border border-orange-500/50 p-3 rounded font-bold hover:bg-orange-500/30 transition-colors">Add Certificate</button>
          </form>

          <div className="flex flex-col gap-4">
            {certificates.map(c => (
              <div key={c.id} className="bg-black border border-white/10 p-4 rounded flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{c.title}</h3>
                  <p className="text-sm text-orange-400 mb-1">{c.issuer}</p>
                  <p className="text-sm text-gray-500">{c.date}</p>
                  {c.credUrl && <a href={c.credUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">🔗 Verify</a>}
                </div>
                <form action={deleteCertificate.bind(null, c.id)}>
                  <button type="submit" className="text-red-400 hover:text-red-300 text-sm bg-red-400/10 px-3 py-1 rounded">Delete</button>
                </form>
              </div>
            ))}
            {certificates.length === 0 && <p className="text-gray-500">No certificates found.</p>}
          </div>
        </div>
      )}

      {/* ========== CHATBOT Q&A ========== */}
      {tab === "chatbot" && (
        <div className="flex flex-col gap-12">
          <form action={addChatbotQA} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-pink-400">Add Chatbot Q&A</h2>
            <p className="text-gray-500 text-xs">Add keyword triggers and their responses for the portfolio chatbot.</p>
            <input name="question" placeholder="Question / Keywords (e.g. 'projects, work, portfolio')" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-pink-500" />
            <textarea name="answer" placeholder="Bot Response" required className="bg-black border border-white/10 p-3 rounded outline-none focus:border-pink-500 min-h-[100px]" />
            <select name="category" className="bg-black border border-white/10 p-3 rounded outline-none focus:border-pink-500">
              <option value="">Select Category (optional)</option>
              <option value="about">About</option>
              <option value="projects">Projects</option>
              <option value="skills">Skills</option>
              <option value="contact">Contact</option>
              <option value="resume">Resume</option>
              <option value="services">Services</option>
            </select>
            <button type="submit" className="bg-pink-500/20 text-pink-400 border border-pink-500/50 p-3 rounded font-bold hover:bg-pink-500/30 transition-colors">Add Q&A</button>
          </form>

          <div className="flex flex-col gap-4">
            {chatbotQAs.map(qa => (
              <div key={qa.id} className="bg-black border border-white/10 p-4 rounded flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-pink-400">Q: {qa.question}</h3>
                  <p className="text-sm text-gray-400 mt-1 whitespace-pre-line">A: {qa.answer}</p>
                  {qa.category && <span className="text-xs text-gray-600 mt-2 inline-block px-2 py-0.5 bg-white/5 rounded">{qa.category}</span>}
                </div>
                <form action={deleteChatbotQA.bind(null, qa.id)}>
                  <button type="submit" className="text-red-400 hover:text-red-300 text-sm bg-red-400/10 px-3 py-1 rounded">Delete</button>
                </form>
              </div>
            ))}
            {chatbotQAs.length === 0 && <p className="text-gray-500">No chatbot Q&A entries. The chatbot will use built-in responses.</p>}
          </div>
        </div>
      )}

      {/* ========== SITE SETTINGS ========== */}
      {tab === "settings" && (
        <div className="flex flex-col gap-12">
          <form action={updateSiteSettings} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-cyan-400">Site Settings</h2>
            <p className="text-gray-500 text-xs">Update your portfolio&apos;s global settings. Changes appear on all pages.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-mono">Hero Title</label>
                <input name="heroTitle" defaultValue={settings.heroTitle} className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-mono">Hero Subtitle</label>
                <input name="heroSubtitle" defaultValue={settings.heroSubtitle} className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-mono">About Text</label>
              <textarea name="aboutText" defaultValue={settings.aboutText} placeholder="Extended about me description..." className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500 min-h-[120px]" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-mono">CV/Resume PDF URL</label>
              <input name="cvUrl" defaultValue={settings.cvUrl} placeholder="https://drive.google.com/..." className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-mono">Email</label>
                <input name="email" defaultValue={settings.email} className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-mono">Phone</label>
                <input name="phone" defaultValue={settings.phone} className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-mono">Location</label>
                <input name="location" defaultValue={settings.location} className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
              </div>
            </div>

            <h3 className="text-sm font-bold text-gray-400 mt-4 border-t border-white/5 pt-4">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-mono">GitHub</label>
                <input name="githubUrl" defaultValue={settings.githubUrl} className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-mono">LinkedIn</label>
                <input name="linkedinUrl" defaultValue={settings.linkedinUrl} className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-mono">Twitter</label>
                <input name="twitterUrl" defaultValue={settings.twitterUrl} className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-mono">Instagram</label>
                <input name="instagramUrl" defaultValue={settings.instagramUrl} className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-mono">WhatsApp</label>
                <input name="whatsappUrl" defaultValue={settings.whatsappUrl} className="bg-black border border-white/10 p-3 rounded outline-none focus:border-cyan-500" />
              </div>
            </div>

            <button type="submit" className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 p-3 rounded font-bold hover:bg-cyan-500/30 transition-colors mt-4">Save Settings</button>
          </form>
        </div>
      )}
    </div>
  );
}
