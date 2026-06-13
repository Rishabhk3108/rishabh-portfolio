'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const allPosts = [
  {
    category: 'Development',
    readTime: '7 min read',
    title: 'Building and Deploying Telegram Bots on AWS EC2 (ARM64)',
    desc: 'From writing the bot logic to fixing ARM64 compatibility issues on Ubuntu — a practical walkthrough of what actually goes wrong and how to fix it.',
    date: 'Apr 2025',
    previewBg: 'linear-gradient(160deg, #0d1b2a 0%, #1a2f44 50%, #0a1520 100%)',
  },
  {
    category: 'SEO',
    readTime: '6 min read',
    title: 'How I Ranked #1 on Google for My Own Name — Beating a 13-Year Veteran',
    desc: "SEO isn't magic. It's meta tags, consistency, and patience. Here's exactly what I did to outrank someone with over a decade of head start.",
    date: 'Mar 2025',
    previewBg: 'linear-gradient(160deg, #2c1810 0%, #4a2c1a 50%, #1e1008 100%)',
  },
  {
    category: 'Journey',
    readTime: '5 min read',
    title: 'How I Learned Web Design Using Only a Mobile Device',
    desc: "No laptop, no desktop — just an Android phone, a browser, and an obsession with learning. Here's how I went from inspecting other sites to building my own.",
    date: 'Jan 2025',
    previewBg: 'linear-gradient(160deg, #1a2535 0%, #2a3d52 50%, #111c28 100%)',
  },
  {
    category: 'Startup',
    readTime: '8 min read',
    title: "What I Learned from Failing My First Startup (Badhon Tech)",
    desc: "Badhon Tech didn't survive. But the lessons from building it — servers, users, decisions, pressure — became the foundation for everything I do now.",
    date: 'Dec 2024',
    previewBg: 'linear-gradient(160deg, #1a0d00 0%, #3a1f00 50%, #110800 100%)',
  },
  {
    category: 'Development',
    readTime: '4 min read',
    title: "When Your Device Can't Keep Up — Move to the Cloud",
    desc: "My Android couldn't run React builds or local servers anymore. So I moved everything to the cloud. Here's how that changed my entire workflow.",
    date: 'Jun 2024',
    previewBg: 'linear-gradient(160deg, #0a1a0a 0%, #1a3a1a 50%, #050f05 100%)',
  },
  {
    category: 'Journey',
    readTime: '6 min read',
    title: 'How I Mastered CSS by Refusing to Give Up',
    desc: "I didn't read a course. I saw a design, I tried to copy it, I failed, I learned why, and I tried again. That loop is how CSS actually sticks.",
    date: 'Aug 2023',
    previewBg: 'linear-gradient(160deg, #1a1a2e 0%, #2a2a4e 50%, #0d0d1e 100%)',
  },
  {
    category: 'SEO',
    readTime: '5 min read',
    title: 'Why Your Portfolio Website Is Invisible on Google (And How to Fix It)',
    desc: "Most developer portfolios have zero SEO. No meta tags, no structure, no strategy. Here's a simple checklist I used to make mine discoverable.",
    date: 'Nov 2024',
    previewBg: 'linear-gradient(160deg, #0f1a0f 0%, #1e3a1e 50%, #080f08 100%)',
  },
  {
    category: 'Startup',
    readTime: '7 min read',
    title: 'From Idea to Deployed: Building BadhonAI in 30 Days',
    desc: "I gave myself one month to go from concept to a live product. No team, no funding — just focus, a clear scope, and a lot of late nights.",
    date: 'Feb 2025',
    previewBg: 'linear-gradient(160deg, #1a0d20 0%, #3a1a4a 50%, #100815 100%)',
  },
  {
    category: 'Development',
    readTime: '9 min read',
    title: 'React Performance in 2025: What Still Matters and What Doesn\'t',
    desc: "With React 19 and the compiler, some old performance tricks are obsolete. Here's what still counts — and where beginners waste the most effort.",
    date: 'Mar 2025',
    previewBg: 'linear-gradient(160deg, #1a1200 0%, #3d2b00 50%, #110c00 100%)',
  },
];

const categories = ['All', 'Development', 'SEO', 'Journey', 'Startup'];

export default function BlogPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const lastScrollY = useRef(0);
  const navBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  // Blog is always index 4 (Home=0, Work=1, About=2, Certifications=3, Blog=4, Contact=5)
  const BLOG_NAV_IDX = 4;

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 80) setNavHidden(true);
      else if (y < lastScrollY.current) setNavHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Measure pill position for the Blog button
  useEffect(() => {
    const btn = navBtnRefs.current[BLOG_NAV_IDX];
    if (!btn) return;
    setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, []);

  const navLinks = [
    { label: 'Home',           action: () => router.push('/') },
    { label: 'Work',           action: () => router.push('/#projects') },
    { label: 'About',          action: () => router.push('/#about') },
    { label: 'Certifications', action: () => router.push('/#certifications') },
    { label: 'Blog',           action: () => {} },
    { label: 'Contact',        action: () => router.push('/#contact') },
  ];

  const filtered = allPosts.filter(post => {
    const matchCat = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch =
      search === '' ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: isDarkMode ? '#181716' : '#e9e7da' }}>

      {/* ── Navbar ── */}
      <div
        className={`px-6 py-3 lg:px-12 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navHidden ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ backgroundColor: isDarkMode ? '#181716' : '#e9e7da' }}
      >
        <nav
          className="flex items-center justify-center px-6 py-2 rounded-full shadow-lg mx-auto max-w-6xl relative"
          style={{ backgroundColor: isDarkMode ? '#1E1E1E' : '#EEEDE9' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 absolute left-6">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white' : 'bg-black'}`}>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-black' : 'text-white'}`}>B</span>
            </div>
            <button
              onClick={() => router.push('/')}
              className={`font-semibold text-lg transition-all duration-300 hover:scale-105 ${isDarkMode ? 'text-white' : 'text-black'}`}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#f2b75f')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = '')}
            >
              Badhon Biswas
            </button>
          </div>

          {/* Nav links with sliding pill */}
          <div className="hidden md:flex items-center">
            <div
              className="relative flex items-center gap-1 px-2 py-1.5 rounded-full"
              style={{ backgroundColor: isDarkMode ? '#2A2A2A' : '#F5F4F0' }}
            >
              {/* Sliding pill */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: pillStyle.left,
                  width: pillStyle.width,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  height: 'calc(100% - 8px)',
                  backgroundColor: '#f2b75f',
                  transition: 'left 0.4s cubic-bezier(0.34,1.56,0.64,1), width 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                }}
              />
              {navLinks.map((item, i) => (
                <button
                  key={item.label}
                  ref={el => { navBtnRefs.current[i] = el; }}
                  onClick={item.action}
                  className="relative z-10 px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200"
                  style={{ color: i === BLOG_NAV_IDX ? '#000000' : isDarkMode ? '#9ca3af' : '#6b7280' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 absolute right-6">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            <button className={`px-5 py-2 rounded-full font-medium transition-colors flex items-center gap-2 text-sm ${isDarkMode ? 'bg-gray-200 text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-gray-800'}`}>
              Let&apos;s Talk
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* ── Back Button ── */}
      <div className="px-6 lg:px-12 pt-28 pb-0">
        <div className="max-w-7xl mx-auto pl-[10%] lg:pl-[15%]">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer"
            style={{ color: '#9ca3af' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = isDarkMode ? '#ffffff' : '#000000'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9ca3af'; }}
          >
            ← Back
          </button>
        </div>
      </div>

      {/* ── Blog Header ── */}
      <section className="pt-12 pb-14 px-6 lg:px-12 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f2b75f' }}>
          Blog
        </p>
        <h1 className={`text-3xl lg:text-4xl font-bold mb-4 leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Articles on frontend, React, and UI/UX
        </h1>
        <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Insights from Badhon Biswas on modern frontend development, React, UI/UX design, performance, and SEO-friendly web building.
        </p>
      </section>

      {/* ── Search + Filters ── */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          {/* Search bar */}
          <div className={`flex-1 flex items-center gap-3 px-5 py-3.5 rounded-full shadow-sm ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
            <svg className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`flex-1 bg-transparent outline-none text-sm ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
            />
          </div>

          {/* Category chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
                style={
                  activeCategory === cat
                    ? { backgroundColor: '#f2b75f', color: '#000' }
                    : {
                        backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
                        color: isDarkMode ? '#9ca3af' : '#374151',
                        border: `1px solid ${isDarkMode ? '#2a2a2a' : '#e5e7eb'}`,
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Posts Grid ── */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className={`text-center py-24 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              No articles match your search.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((post, i) => (
                <article
                  key={i}
                  className={`group rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: '220px', background: post.previewBg }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(0,0,0,0.25)' }}>
                      <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3">
                    {/* Meta row */}
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#f2b75f' }}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {post.category}
                      </span>
                      <span className={`flex items-center gap-1 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className={`text-base font-bold leading-snug transition-colors duration-200 group-hover:text-[#f2b75f] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {post.desc}
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between pt-2 mt-auto">
                      <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{post.date}</span>
                      <button
                        className="text-xs font-semibold flex items-center gap-1 transition-all duration-200 hover:gap-2"
                        style={{ color: '#f2b75f' }}
                      >
                        Read more
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: isDarkMode ? '#181716' : '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4 max-w-xs">
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Badhon Biswas</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>UI/UX Designer &amp; Developer</p>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Crafting beautiful, functional digital experiences that users love and businesses rely on.
            </p>
            <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Dhaka, Bangladesh
            </div>
          </div>

          <div>
            <h4 className={`text-base font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Navigation</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home',    href: '/' },
                { label: 'Projects', href: '/#projects' },
                { label: 'About',  href: '/#about' },
                { label: 'Blog',   href: '/blog' },
                { label: 'Contact', href: '/#contact' },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => router.push(item.href)}
                    className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black'}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`text-base font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Connect</h4>
            <ul className="space-y-4">
              {[
                { label: 'Github',    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /> },
                { label: 'Linkedin',  icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth={1.5} /></> },
                { label: 'Twitter',   icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /> },
                { label: 'Instagram', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5} stroke="currentColor" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2} strokeLinecap="round" stroke="currentColor" /></> },
                { label: 'Email',     icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
              ].map(({ label, icon }) => (
                <li key={label}>
                  <button className={`flex items-center gap-3 text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between"
          style={{ borderTop: `1px solid ${isDarkMode ? '#2a2a2a' : '#e5e7eb'}` }}
        >
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            © 2026 Badhon Biswas. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className={`text-sm transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>Privacy Policy</button>
            <button className={`text-sm transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>Terms of Service</button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${isDarkMode ? 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
