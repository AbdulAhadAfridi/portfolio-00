"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { updateSiteSettings } from "@/app/actions";
import Toast, { useToast } from "@/components/Toast";

export default function SettingsTab({ settings }: { settings: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast, showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      await updateSiteSettings(formData);
      showToast("Settings saved successfully!");
      router.refresh();
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const fields: { section: string; items: { name: string; label: string; value: string; placeholder: string; textarea?: boolean }[] }[] = [
    { section: "Hero Section", items: [
      { name: "heroTitle", label: "HERO TITLE", value: settings?.heroTitle || "", placeholder: "ABDUL AHAD" },
      { name: "heroSubtitle", label: "HERO SUBTITLE", value: settings?.heroSubtitle || "", placeholder: "Web Developer | Frontend Engineer" },
    ]},
    { section: "About Section", items: [
      { name: "aboutText", label: "ABOUT TEXT", value: settings?.aboutText || "", placeholder: "Write your bio here...", textarea: true },
    ]},
    { section: "Resume / CV", items: [
      { name: "cvUrl", label: "CV DOWNLOAD URL", value: settings?.cvUrl || "", placeholder: "https://drive.google.com/..." },
    ]},
    { section: "Contact Info", items: [
      { name: "email", label: "EMAIL", value: settings?.email || "", placeholder: "your@email.com" },
      { name: "phone", label: "PHONE", value: settings?.phone || "", placeholder: "+92 312-8760904" },
      { name: "location", label: "LOCATION", value: settings?.location || "", placeholder: "Pakistan" },
    ]},
    { section: "Social Links", items: [
      { name: "githubUrl", label: "GITHUB URL", value: settings?.githubUrl || "", placeholder: "https://github.com/..." },
      { name: "linkedinUrl", label: "LINKEDIN URL", value: settings?.linkedinUrl || "", placeholder: "https://linkedin.com/in/..." },
      { name: "twitterUrl", label: "TWITTER / X URL", value: settings?.twitterUrl || "", placeholder: "https://twitter.com/..." },
      { name: "instagramUrl", label: "INSTAGRAM URL", value: settings?.instagramUrl || "", placeholder: "https://instagram.com/..." },
      { name: "whatsappUrl", label: "WHATSAPP URL", value: settings?.whatsappUrl || "", placeholder: "https://wa.me/..." },
    ]},
  ];

  return (
    <div>
      <Toast {...toast} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Site Settings</h1>
          <p className="text-gray-500 text-sm">Manage your portfolio content and contact info</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {fields.map((section) => (
          <div key={section.section} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5 text-sm tracking-wider">{section.section}</h3>
            <div className="space-y-4">
              {section.items.map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-mono">{field.label}</label>
                  {field.textarea ? (
                    <textarea
                      name={field.name}
                      rows={5}
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors resize-none"
                    />
                  ) : (
                    <input
                      name={field.name}
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white font-bold py-4 rounded-xl hover:from-cyan-500/30 hover:to-purple-500/30 transition-all disabled:opacity-50 text-sm tracking-wider"
        >
          <Save size={16} />
          {loading ? "Saving..." : "Save All Settings"}
        </button>
      </form>
    </div>
  );
}
