"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Download, FolderOpen, Mail } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const QUICK_ACTIONS = [
  { label: "About Developer", icon: User, query: "Tell me about this developer" },
  { label: "View Projects", icon: FolderOpen, query: "What projects has he built?" },
  { label: "Download Resume", icon: Download, query: "Download resume" },
  { label: "Contact Info", icon: Mail, query: "Contact info" },
];

const FALLBACK_RESPONSES = [
  "I'm not sure about that. You can ask me about Abdul Ahad's projects, skills, experience, or contact information!",
  "Hmm, I don't have info on that. Try asking about his tech stack, projects, or how to reach him!",
  "I can help with questions about Abdul Ahad's work, skills, services, or how to contact him. What would you like to know?",
];

// Built-in knowledge base (used when no DB responses match)
const DEFAULT_QA: Record<string, string> = {
  "hello|hi|hey|greetings": "Hello! 👋 I'm Abdul Ahad's portfolio assistant. I can tell you about his projects, skills, experience, and how to reach him. What would you like to know?",
  "who|about|developer|tell me": "Abdul Ahad Afridi is a Full Stack Web Developer & Frontend Engineer from Pakistan. He specializes in React.js, Next.js, Node.js, Python, and more. He builds scalable, production-ready web applications with modern tech stacks.",
  "skills|technologies|tech stack|what can he do": "Abdul Ahad is skilled in:\n\n🔹 Frontend: React.js, Next.js, TypeScript, Tailwind CSS\n🔹 Backend: Node.js, Python, FastAPI, Django\n🔹 Database: SQL, MongoDB, Prisma\n🔹 DevOps: Docker, Cloud Services\n🔹 Other: AI Chatbot Integration, CMS Development",
  "projects|work|portfolio|what has he built": "Abdul Ahad has worked on various projects including custom websites, full-stack applications, AI chatbot integrations, and CMS platforms. Visit the Projects page to see his complete portfolio with live demos and GitHub links!",
  "contact|reach|email|phone|hire": "You can reach Abdul Ahad at:\n\n📧 Email: abdulahadafridi@gmail.com\n📱 Phone/WhatsApp: +92 312-8760904\n🔗 GitHub: github.com/AAhadAfridi\n🔗 LinkedIn: linkedin.com/in/abdul-ahad-afridi\n\nOr use the Contact page to send a message directly!",
  "resume|cv|download": "You can download Abdul Ahad's resume/CV from the Resume page. It includes his education, experience, skills, and certifications. Click the 'Download CV' button on the Resume page!",
  "services|what do you offer|what does he offer": "Abdul Ahad offers:\n\n🌐 Custom Website Development\n📱 Responsive Web Design\n⚛️ Frontend Development (React/Next.js)\n🐍 Python Backend Development\n🤖 AI Chatbot Integration\n🚀 Landing Pages for Startups\n🔧 Website Optimization & Maintenance\n📊 Database & API Design",
  "experience|work history|where has he worked": "Abdul Ahad has experience in web development, frontend engineering, and Python development. Check the Resume page for his detailed work history and experience timeline!",
  "education|degree|university": "For detailed information about Abdul Ahad's education, check out the Resume page where all educational background is listed!",
  "location|where|country|based": "Abdul Ahad is based in Pakistan and is available for remote work worldwide! 🌍",
  "thank|thanks|bye|goodbye": "You're welcome! Feel free to ask anything else. Have a great day! 😊",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! 👋 I'm Abdul Ahad's portfolio assistant. Ask me anything about his work, skills, or how to reach him!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const findAnswer = async (query: string): Promise<string> => {
    const lowerQuery = query.toLowerCase();

    // Try API first (DB responses)
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.answer) return data.answer;
      }
    } catch {
      // Fall through to default responses
    }

    // Try built-in knowledge base
    for (const [keywords, answer] of Object.entries(DEFAULT_QA)) {
      const keywordList = keywords.split("|");
      if (keywordList.some((kw) => lowerQuery.includes(kw))) {
        return answer;
      }
    }

    // Fallback
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

    const answer = await findAnswer(messageText);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: answer,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          isOpen
            ? "bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
            : "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        {/* Pulse */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping opacity-30" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[60] w-[90vw] max-w-[380px] h-[500px] max-h-[70vh] rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 bg-white/[0.02] flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Bot size={18} className="text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">Portfolio Assistant</p>
                <p className="text-green-400 text-[10px] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-cyan-500/20 border border-cyan-500/20 text-white rounded-br-md"
                        : "bg-white/5 border border-white/10 text-gray-300 rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.query)}
                    className="flex items-center gap-1.5 text-[10px] px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all font-mono"
                  >
                    <action.icon size={12} />
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 transition-all disabled:opacity-30 disabled:hover:bg-cyan-500/20"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
