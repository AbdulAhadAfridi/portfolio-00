import {
  getProjects, getServices, getWorks, getTestimonials, getCertificates,
  getChatbotQAs, getSiteSettings, getReviews, getContactMessages,
} from "../actions";
import AdminTabs from "./AdminTabs";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const resolvedParams = await searchParams;
  const tab = resolvedParams.tab || "dashboard";

  const [projects, services, works, testimonials, certificates, chatbotQAs, settings, reviews, messages] =
    await Promise.all([
      getProjects(), getServices(), getWorks(), getTestimonials(),
      getCertificates(), getChatbotQAs(), getSiteSettings(), getReviews(), getContactMessages(),
    ]);

  return (
    <AdminTabs
      tab={tab}
      projects={projects}
      services={services}
      works={works}
      testimonials={testimonials}
      certificates={certificates}
      chatbotQAs={chatbotQAs}
      settings={settings}
      reviews={reviews}
      messages={messages}
    />
  );
}
