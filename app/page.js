'use client';
import React, { useState, useEffect, useRef } from "react";

// Logo SVG component
const EVHLogo = ({ className = "h-8 w-8" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10 C70 20, 85 35, 85 50 C85 65, 70 80, 50 90 C30 80, 15 65, 15 50 C15 35, 30 20, 50 10 Z" 
          fill="url(#logoGradient)" />
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);

const prompts = [
  "What is EVH’s mission?",
  "What services do you provide?",
  "Who are your partners?",
  "Tell me about your investment thesis.",
  "How do I schedule a meeting?",
  "What markets do you focus on?"
];

const seedAnswers = {
  "what is evh’s mission?":
    "EVH builds durable energy businesses that enable the energy transition. We provide capital, operating expertise, and long-term partnerships to scale companies in power, fuels, and industrial decarbonization.",
  "what services do you provide?":
    "We focus on project development, capital deployment, asset operations, and strategic partnerships. EVH combines operating discipline with data-driven strategies to improve safety, reliability, and returns.",
  "who are your partners?":
    "Our partners include operators, technology providers, utilities, industrials, EPCs, and project developers. We co-own and operate alongside partners for the long term.",
  "tell me about your investment thesis.":
    "We invest in energy platforms and assets that generate cash and support decarbonization. By applying operational excellence and technology, we bend cost and emissions curves while building businesses that last.",
  "how do i schedule a meeting?":
    "You can schedule a meeting using the button on the right. We look forward to connecting and discussing opportunities.",
  "what markets do you focus on?":
    "EVH focuses primarily on North America with selective global opportunities. We target power generation, clean fuels, waste-to-value, and grid-adjacent infrastructure."
};

function fakeAnswer(q) {
  const key = q.trim().toLowerCase();
  const found = seedAnswers[key];
  const generic =
    "I can help with EVH’s mission, services, partnerships, and investment thesis. Ask anything or use a quick prompt.";
  return new Promise((resolve) => setTimeout(() => resolve(found || generic), 600));
}

function useAutoScroll() {
  const ref = useRef(null);
  const scrollToBottom = () => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };
  return { ref, scrollToBottom };
}

export default function Page() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome to EVH. I’m your AI assistant. Ask anything about our mission, services, partnerships, or investment thesis." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { ref: streamRef, scrollToBottom } = useAutoScroll();

  const linkedinPosts = [
    {
      id: 1,
      date: "2 days ago",
      content: "Excited to announce our partnership with leading renewable energy developers in the Pacific Northwest. Together, we're accelerating the deployment of clean energy infrastructure that will power communities for decades to come.",
      engagement: "45 likes • 12 comments",
      link: "https://www.linkedin.com/company/evhcorp/"
    },
    {
      id: 2,
      date: "1 week ago", 
      content: "Our latest project in Texas demonstrates how operational excellence and cutting-edge technology can drive both profitability and environmental impact. Read more about our approach to sustainable energy development.",
      engagement: "72 likes • 18 comments",
      link: "https://www.linkedin.com/company/evhcorp/"
    }
  ];

  const ask = async (q) => {
    const text = (q ?? input).trim();
    if (!text) return;
    setInput("");
    setMessages(m => [...m, { role: "user", content: text }]);
    setLoading(true);
    const answer = await fakeAnswer(text);
    setMessages(m => [...m, { role: "assistant", content: answer }]);
    setLoading(false);
    setTimeout(scrollToBottom, 0);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-950 via-black to-gray-900 font-[Helvetica,Arial,sans-serif] relative overflow-hidden py-8">
      <div className="relative max-w-6xl w-full text-center mb-10">
        <div className="relative bg-black/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 via-gray-600/10 to-emerald-500/10 rounded-3xl blur opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-emerald-400 via-gray-200 to-emerald-500 bg-clip-text text-transparent">
                Building Durable
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-200 via-emerald-400 to-gray-200 bg-clip-text text-transparent">
                Energy Businesses
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              EVH partners with operators and investors to develop, fund, and grow companies 
              across <span className="text-emerald-400 font-medium">power, fuels, and industrial decarbonization</span>.
            </p>
          </div>
        </div>
      </div>
      {/* Chat Container */}
      <div className="relative max-w-6xl w-full h-[80vh] mx-4 md:mx-8 lg:mx-auto flex flex-col rounded-3xl border border-white/10 bg-black/20 backdrop-blur-2xl shadow-2xl overflow-hidden mb-8">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-gray-600/20 to-emerald-500/20 rounded-3xl blur opacity-75"></div>
        <header className="relative z-10 p-6 border-b border-white/10 flex items-center gap-3">
          <EVHLogo className="h-10 w-10" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-gray-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg">
              EVH AI Assistant
            </h1>
            <p className="text-xs bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent opacity-80">
              Powered by next-generation intelligence
            </p>
          </div>
        </header>
        <main ref={streamRef} className="relative z-10 flex-1 overflow-auto px-8 py-8 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[90%] md:max-w-[85%] lg:max-w-[80%] px-6 py-4 rounded-2xl text-base leading-relaxed border shadow-lg backdrop-blur-sm
                  ${m.role === "user"
                    ? "bg-gradient-to-r from-emerald-600/80 to-emerald-700/80 text-white border-emerald-400/30 shadow-emerald-500/20"
                    : "bg-gray-900/40 text-gray-100 border-white/10 shadow-black/20"}`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-5 py-4 rounded-2xl bg-gray-900/40 border border-white/10 text-gray-300 text-base backdrop-blur-sm">
                <span className="animate-pulse bg-gradient-to-r from-emerald-400 to-gray-300 bg-clip-text text-transparent">
                  Thinking…
                </span>
              </div>
            </div>
          )}
        </main>
        <footer className="relative z-10 border-t border-white/10 p-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {prompts.map((p, i) => (
              <button
                key={i}
                onClick={() => ask(p)}
                className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-emerald-600/20 hover:to-gray-700/20 border border-white/10 hover:border-emerald-400/30 text-sm text-gray-200 hover:text-white transition-all duration-300 backdrop-blur-sm shadow-lg"
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && ask()}
              placeholder="Type your question…"
              className="flex-1 px-5 py-3 rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 text-sm text-white placeholder-gray-400 backdrop-blur-sm"
            />
            <button
              onClick={() => ask()}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm font-medium disabled:opacity-50 shadow-lg shadow-emerald-500/25 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent font-semibold">
                Send
              </span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
