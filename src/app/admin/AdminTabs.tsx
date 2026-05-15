"use client";
import DashboardTab from "./tabs/DashboardTab";
import ProjectsTab from "./tabs/ProjectsTab";
import ServicesTab from "./tabs/ServicesTab";
import WorkTab from "./tabs/WorkTab";
import TestimonialsTab from "./tabs/TestimonialsTab";
import ReviewsTab from "./tabs/ReviewsTab";
import CertificatesTab from "./tabs/CertificatesTab";
import ChatbotTab from "./tabs/ChatbotTab";
import MessagesTab from "./tabs/MessagesTab";
import SettingsTab from "./tabs/SettingsTab";

interface AdminTabsProps {
  tab: string;
  projects: any[];
  services: any[];
  works: any[];
  testimonials: any[];
  certificates: any[];
  chatbotQAs: any[];
  settings: any;
  reviews: any[];
  messages: any[];
}

export default function AdminTabs({
  tab, projects, services, works, testimonials,
  certificates, chatbotQAs, settings, reviews, messages,
}: AdminTabsProps) {
  const pendingReviews = reviews.filter((r: any) => r.status === "pending");
  const unreadMessages = messages.filter((m: any) => !m.read);

  const renderTab = () => {
    switch (tab) {
      case "projects":
        return <ProjectsTab projects={projects} />;
      case "services":
        return <ServicesTab services={services} />;
      case "work":
        return <WorkTab works={works} />;
      case "testimonials":
        return <TestimonialsTab testimonials={testimonials} />;
      case "reviews":
        return <ReviewsTab reviews={reviews} />;
      case "certificates":
        return <CertificatesTab certificates={certificates} />;
      case "chatbot":
        return <ChatbotTab chatbotQAs={chatbotQAs} />;
      case "messages":
        return <MessagesTab messages={messages} />;
      case "settings":
        return <SettingsTab settings={settings} />;
      default:
        return (
          <DashboardTab
            projects={projects}
            services={services}
            works={works}
            testimonials={testimonials}
            certificates={certificates}
            chatbotQAs={chatbotQAs}
            reviews={reviews}
            messages={messages}
            pendingReviews={pendingReviews}
            unreadMessages={unreadMessages}
          />
        );
    }
  };

  return (
    <div className="min-h-[80vh]">
      {renderTab()}
    </div>
  );
}
