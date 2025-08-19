'use client';
import React, { useState, useEffect, useRef } from "react";

// Logo SVG component
const EVHLogo = ({ className = "h-8 w-8", variant = "gradient" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10 C70 20, 85 35, 85 50 C85 65, 70 80, 50 90 C30 80, 15 65, 15 50 C15 35, 30 20, 50 10 Z M50 25 C60 30, 70 40, 70 50 C70 60, 60 70, 50 75 C50 70, 55 65, 55 50 C55 40, 50 30, 50 25 Z" 
          fill={variant === "gradient" ? "url(#logoGradient)" : variant === "white" ? "#ffffff" : "#8B8B8B"} />
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
    { role: "assistant", content: "Welcome to EVH. I'm your AI assistant. Ask anything about our mission, services, partnerships, or investment thesis." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { ref: streamRef, scrollToBottom } = useAutoScroll();
  const leadershipScrollRef = useRef(null);

  // Leadership scroll functions
  const scrollLeadershipLeft = () => {
    if (leadershipScrollRef.current) {
      leadershipScrollRef.current.scrollBy({
        left: -320, // Width of one card (w-80 = 320px) 
        behavior: 'smooth'
      });
    }
  };

  const scrollLeadershipRight = () => {
    if (leadershipScrollRef.current) {
      leadershipScrollRef.current.scrollBy({
        left: 320, // Width of one card (w-80 = 320px)
        behavior: 'smooth'
      });
    }
  };

  const linkedinPosts = [
    {
      id: 1,
      date: "2 months ago",
      content: "EVH Corp in Monaco: Reflections from the EY World Entrepreneur of the Year 2025. Our CEO, Ben Cowart, represented EVH Corp at the EY World Entrepreneur of the Year Conference in Monaco, an exceptional gathering of world-class entrepreneurs, investors, and innovators from over 43 countries.",
      engagement: "3+ reactions",
      link: "https://www.linkedin.com/company/evhcorp/",
      highlight: "EY World Entrepreneur Conference"
    },
    {
      id: 2,
      date: "3 months ago", 
      content: "Today marks an exciting new chapter in the energy transition journey. At EVH Corporate Development, LLC, we're leveraging decades of expertise from our founder, Ben Cowart—who successfully led Vertex Energy to become a top innovator in sustainable fuel and product solutions.",
      engagement: "5 reactions",
      link: "https://www.linkedin.com/company/evhcorp/",
      highlight: "New Chapter in Energy Transition"
    },
    {
      id: 3,
      date: "3 months ago",
      content: "EVH Corp is an energy operating & holdings firm bending the curve on new energy solutions. From sustainable technology breakthroughs to strategic acquisitions, our team believes in the transformative power of investing and long-term collaboration.",
      engagement: "Multiple reactions",
      link: "https://www.linkedin.com/company/evhcorp/",
      highlight: "Bending the Curve on Energy Solutions"
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
            <div className="flex items-center justify-center mb-6">
              <EVHLogo className="h-16 w-16 md:h-20 md:w-20" variant="gradient" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-emerald-400 via-gray-200 to-emerald-500 bg-clip-text text-transparent">
                Bending the Curve
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-200 via-emerald-400 to-gray-200 bg-clip-text text-transparent">
                On new energy solutions
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

      {/* EVH Leadership Section */}
      <div className="relative max-w-6xl w-full mx-4 md:mx-8 lg:mx-auto mb-8">
        <div className="relative bg-black/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 via-gray-600/10 to-emerald-500/10 rounded-3xl blur opacity-50"></div>
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-emerald-400 via-gray-200 to-emerald-500 bg-clip-text text-transparent">
                  EVH Leadership
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Bending the curve on energy transition—guided by experience, powered by innovation, committed to sustainable impact.
              </p>
              <div className="mt-6">
                <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm font-medium shadow-lg shadow-emerald-500/25 transition-all duration-300 backdrop-blur-sm">
                  <span className="bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent font-semibold">
                    Partner with us
                  </span>
                </button>
              </div>
            </div>

            {/* Leadership Team Horizontal Scroll with Navigation */}
            <div className="relative">
              {/* Navigation Buttons */}
              <button 
                onClick={scrollLeadershipLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-all duration-300 backdrop-blur-sm -ml-6"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={scrollLeadershipRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-all duration-300 backdrop-blur-sm -mr-6"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div ref={leadershipScrollRef} className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
                {/* Benjamin P. Cowart */}
                <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-emerald-400/30">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center p-4 mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">BC</span>
                    </div>
                    <h3 className="text-xl font-bold text-white text-center mb-2">Benjamin P. Cowart</h3>
                    <p className="text-emerald-400 text-sm font-medium text-center mb-4">
                      CEO/Founder, Governance, Corporate Development & Strategy
                    </p>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Ben is the Founder and CEO of EVH Corporate Development, LLC, with 39+ years of leadership in the energy transition. He previously led Vertex Energy through refinery transformation for renewable fuels. A Harvard AMP graduate and Ernst & Young Entrepreneur of the Year National finalist, Cowart is recognized for bridging traditional energy with sustainable innovation across the evolving energy landscape.
                  </p>
                </div>

                {/* Ayana L. Hill */}
                <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-emerald-400/30">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center p-4 mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">AH</span>
                    </div>
                    <h3 className="text-xl font-bold text-white text-center mb-2">Ayana L. Hill</h3>
                    <p className="text-emerald-400 text-sm font-medium text-center mb-4">
                      Executive Director, Creative Strategy & Brand Innovation
                    </p>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Ayana Hill is a strategic brand innovator with over 13 years' experience in technology, advertising, government, and sports/entertainment. At EVH Corp, she oversees brand identity, communications, and creative operations, driving impactful storytelling and sustainable energy transition solutions.
                  </p>
                </div>

                {/* Taylor Barnes */}
                <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-emerald-400/30">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center p-4 mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">TB</span>
                    </div>
                    <h3 className="text-xl font-bold text-white text-center mb-2">Taylor Barnes</h3>
                    <p className="text-emerald-400 text-sm font-medium text-center mb-4">
                      Intern – Finance Major, Corporate Execution
                    </p>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Taylor Barnes, a finance major intern at EVH Corporate Development, supports key research and operational initiatives. Currently a Dean's List student at the University of St. Thomas, she demonstrates strong analytical and entrepreneurial skills through her academic research and competition involvement.
                  </p>
                </div>

                {/* Chris Carlson */}
                <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-emerald-400/30">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center p-4 mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">CC</span>
                    </div>
                    <h3 className="text-xl font-bold text-white text-center mb-2">Chris Carlson</h3>
                    <p className="text-emerald-400 text-sm font-medium text-center mb-4">
                      CFO
                    </p>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Christopher Carlson is a veteran public company CFO with over 20 years of experience leading financial strategy, regulatory compliance, and capital markets execution. As Chief Financial Officer at 360Fuel, he brings deep expertise in SEC reporting, investor relations, and infrastructure finance. Previously, he served as CFO of Vertex Energy (NASDAQ: VTNR), where he led the company's public market transition and national growth strategy. His leadership reinforces 360Fuel's operational discipline and institutional alignment as it scales its automated, AI-powered retail energy platform.
                  </p>
                </div>

                {/* Paul Cowart */}
                <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-emerald-400/30">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center p-4 mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">PC</span>
                    </div>
                    <h3 className="text-xl font-bold text-white text-center mb-2">Paul Cowart</h3>
                    <p className="text-emerald-400 text-sm font-medium text-center mb-4">
                      AI Product Manager
                    </p>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Paul is an IBM-certified Product Manager with deep expertise in artificial intelligence and a proven track record in sales. He combines a strong technical foundation with years of client-facing experience, allowing him to align product innovation with market needs. Paul is passionate about applying emerging technologies to create practical, growth-focused solutions, and his ability to connect strategy with execution makes him a valuable addition to the team.
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LinkedIn Posts Section */}
      <div className="relative max-w-6xl w-full mx-4 md:mx-8 lg:mx-auto mb-8">
        <div className="relative bg-black/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 via-gray-600/10 to-emerald-500/10 rounded-3xl blur opacity-50"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-gray-200 to-emerald-500 bg-clip-text text-transparent">
                Latest from EVH Corporate Development
              </h2>
              <a 
                href="https://www.linkedin.com/company/evhcorp/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2"
              >
                View on LinkedIn
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            
            {/* Horizontal Scrolling Posts */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
                {linkedinPosts.map((post) => (
                  <div 
                    key={post.id} 
                    className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-emerald-400/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center p-2">
                          <EVHLogo className="h-6 w-6" variant="white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">EVH Corporate Development</h3>
                          <p className="text-xs text-gray-400">{post.date}</p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    
                    {post.highlight && (
                      <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs text-emerald-300 mb-3">
                        {post.highlight}
                      </div>
                    )}
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{post.engagement}</span>
                      <a 
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 text-xs font-medium transition-colors duration-300"
                      >
                        Read more →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
