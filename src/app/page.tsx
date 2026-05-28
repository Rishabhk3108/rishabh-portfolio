'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [navHidden, setNavHidden] = useState(false);
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  const [expVisible, setExpVisible] = useState(false);
  const [hoveredInfinity, setHoveredInfinity] = useState(false);
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState(0);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expSectionRef = useRef<HTMLDivElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const lastScrollY = useRef(0);
  const navBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, i]));
          } else if (entry.intersectionRatio === 0) {
            setVisibleCards(prev => {
              const next = new Set(prev);
              next.delete(i);
              return next;
            });
          }
        },
        { threshold: [0, 0.12] }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Nav hide / show
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setNavHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setNavHidden(false);
      }
      lastScrollY.current = currentScrollY;

      // Active section detection
      // Section becomes active when its top reaches the viewport midpoint (~50% visible)
      const viewportH = window.innerHeight;
      const midpoint = currentScrollY + viewportH * 0.5;
      let active = 0;
      for (const { id, nav } of [
        { id: 'projects',       nav: 1 },
        { id: 'about',          nav: 2 },
        { id: 'certifications', nav: 3 },
        { id: 'blog',           nav: 4 },
      ]) {
        const el = document.getElementById(id);
        if (el && midpoint >= el.offsetTop) active = nav;
      }
      // Contact: activate as soon as footer enters the bottom of the viewport
      const footer = document.querySelector('footer') as HTMLElement | null;
      if (footer && currentScrollY + viewportH >= footer.offsetTop + 60) active = 5;
      setActiveNav(active);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // sync on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = expSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { setExpVisible(entry.isIntersecting); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const rect = clipRectRef.current;
    if (!rect) return;
    if (!expVisible) {
      rect.setAttribute('width', '0');
      return;
    }
    const start = performance.now();
    const dur = 2200;
    const run = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      rect.setAttribute('width', String(Math.ceil(eased * 1220)));
      if (t < 1) requestAnimationFrame(run);
    };
    const id = requestAnimationFrame(run);
    return () => cancelAnimationFrame(id);
  }, [expVisible]);

  // Slide the pill to whichever nav button is active
  useEffect(() => {
    const btn = navBtnRefs.current[activeNav];
    if (!btn) return;
    setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [activeNav]);

  // Measure initial pill size after first paint
  useEffect(() => {
    const btn = navBtnRefs.current[0];
    if (!btn) return;
    setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedCert(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const certs = [
    {
      title: 'Machine Learning Specialization',
      issuer: 'DeepLearning.AI · Coursera',
      date: 'Nov 2024',
      description: 'Supervised & unsupervised learning, neural networks, decision trees, and real-world ML deployment strategies.',
      skills: ['Python', 'NumPy', 'scikit-learn', 'TensorFlow', 'ML Pipelines'],
      previewBg: 'linear-gradient(160deg, #0d1b2a 0%, #1a3a5c 50%, #0a1520 100%)',
    },
    {
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: 'Sep 2024',
      description: 'Core AWS services, cloud architecture fundamentals, security best practices, and pricing models for scalable cloud infrastructure.',
      skills: ['AWS EC2', 'S3', 'IAM', 'CloudWatch', 'Lambda'],
      previewBg: 'linear-gradient(160deg, #1a1200 0%, #3d2b00 50%, #110c00 100%)',
    },
    {
      title: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI · Coursera',
      date: 'Jul 2024',
      description: 'Neural network architectures, CNNs, RNNs, LSTMs, and hyperparameter tuning for production-grade deep learning models.',
      skills: ['Python', 'TensorFlow', 'Keras', 'CNNs', 'RNNs', 'LSTMs'],
      previewBg: 'linear-gradient(160deg, #0f1f0f 0%, #1a3a1a 50%, #0a150a 100%)',
    },
    {
      title: 'LangChain & LLM Engineering',
      issuer: 'DeepLearning.AI',
      date: 'Mar 2025',
      description: 'Building production LLM applications with LangChain — chains, agents, memory, RAG pipelines, and tool integrations.',
      skills: ['LangChain', 'LLMs', 'RAG', 'Vector DBs', 'Agents', 'Prompt Eng.'],
      previewBg: 'linear-gradient(160deg, #1a1a0a 0%, #3a3510 50%, #100f05 100%)',
    },
    {
      title: 'System Design for ML',
      issuer: 'Educative.io',
      date: 'Jan 2025',
      description: 'End-to-end ML system design: feature stores, model serving, A/B testing, monitoring, and scalable retraining pipelines.',
      skills: ['MLOps', 'Feature Stores', 'Model Serving', 'Monitoring', 'CI/CD'],
      previewBg: 'linear-gradient(160deg, #0a1520 0%, #1a2f44 50%, #071015 100%)',
    },
    {
      title: 'Generative AI with LLMs',
      issuer: 'DeepLearning.AI · AWS',
      date: 'Dec 2024',
      description: 'Transformer architecture, fine-tuning strategies, RLHF, prompt engineering, and production deployment of generative AI models.',
      skills: ['Transformers', 'Fine-tuning', 'RLHF', 'Prompt Eng.', 'SageMaker'],
      previewBg: 'linear-gradient(160deg, #1a0d20 0%, #3a1a4a 50%, #100815 100%)',
    },
  ];

  return (
    <div 
      className="min-h-screen transition-colors duration-300" 
      style={{ backgroundColor: isDarkMode ? '#181716' : '#e9e7da' }}
    >
      {/* Navigation */}
      <div
        className={`px-6 py-3 lg:px-12 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${navHidden ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ backgroundColor: isDarkMode ? '#181716' : '#e9e7da' }}
      >
        <nav 
          className="flex items-center justify-center px-6 py-2 rounded-full shadow-lg transition-colors mx-auto max-w-6xl relative"
          style={{ backgroundColor: isDarkMode ? '#1E1E1E' : '#EEEDE9' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 absolute left-6">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white' : 'bg-black'}`}>
              <span className={`text-sm font-bold transition-colors ${isDarkMode ? 'text-black' : 'text-white'}`}>B</span>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`font-semibold text-lg transition-all duration-300 hover:scale-105 ${isDarkMode ? 'text-white' : 'text-black'}`}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#f2b75f'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = ''}
            >
              Badhon Biswas
            </button>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex items-center gap-6">
            {/* Inner oval for navigation buttons */}
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
              {[
                { label: 'Home',           onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                { label: 'Work',           onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'About',          onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Certifications', onClick: () => router.push('/certifications') },
                { label: 'Blog',           onClick: () => router.push('/blog') },
                { label: 'Contact',        onClick: () => document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' }) },
              ].map((item, i) => (
                <button
                  key={item.label}
                  ref={el => { navBtnRefs.current[i] = el; }}
                  onClick={item.onClick}
                  className="relative z-10 px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200"
                  style={{ color: activeNav === i ? '#000000' : isDarkMode ? '#9ca3af' : '#6b7280' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4 absolute right-6">
            {/* Theme Toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}
            >
              {isDarkMode ? (
                // Moon icon for dark mode
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                // Sun icon for light mode
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Let's Talk Button */}
            <button className={`px-5 py-2 rounded-full font-medium transition-colors flex items-center gap-2 text-sm ${isDarkMode ? 'bg-gray-200 text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-gray-800'}`}>
              Let's Talk
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="px-6 py-20 mt-20 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Available Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-full shadow-sm transition-all duration-300 cursor-pointer group ${isDarkMode ? 'bg-gray-800 opacity-60 hover:opacity-100' : 'bg-white opacity-60 hover:opacity-100'}`}>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className={`text-sm transition-colors ${isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-black'}`}>Available for new projects</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className={`transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>Hello, I'm</span>
                  <br />
                  <span style={{ color: '#f2b75f' }}>Badhon Biswas</span>
                </h1>
                
                <p className={`text-xl lg:text-2xl max-w-lg leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Crafting beautiful, functional digital experiences that users love and businesses rely on.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-12">
                <div>
                  <div className={`text-3xl lg:text-4xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>7+</div>
                  <div className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Years Experience</div>
                </div>
                <div>
                  <div className={`text-3xl lg:text-4xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>50+</div>
                  <div className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Projects Delivered</div>
                </div>
                <div>
                  <div className={`text-3xl lg:text-4xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>30+</div>
                  <div className={`text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Happy Clients</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 text-black rounded-full font-medium hover:opacity-90 transition-colors flex items-center gap-2"
                  style={{ backgroundColor: '#f2b75f' }}
                >
                  View my work
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                <button className={`px-8 py-4 rounded-full font-medium transition-colors border ${isDarkMode ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700' : 'bg-white text-black border-gray-200 hover:bg-gray-50'}`}>
                  Learn more
                </button>
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div className="relative flex justify-center lg:justify-start lg:pl-8">
              <div className="relative">
                {/* Floating White/Dark Dot - Further top right of photo, visible and animated */}
                <div 
                  className="absolute -top-12 -right-12 w-16 h-16 rounded-full shadow-lg animate-float-slow z-20 transition-colors"
                  style={{ backgroundColor: isDarkMode ? '#1F1F1F' : 'white' }}
                ></div>
                
                {/* Background Decorative Elements - Repositioned and animated */}
                <div 
                  className="absolute -top-16 -left-12 w-32 h-32 rounded-full opacity-60 animate-float-orange-1 transition-colors" 
                  style={{ backgroundColor: isDarkMode ? '#57452A' : '#f2b75f' }}
                ></div>
                <div 
                  className="absolute -bottom-8 -right-16 w-24 h-24 rounded-full opacity-40 animate-float-orange-2 transition-colors" 
                  style={{ backgroundColor: isDarkMode ? '#57452A' : '#f2b75f' }}
                ></div>
                {/* Additional Orange Rounded Square - Bottom left */}
                <div 
                  className="absolute bottom-16 -left-12 w-20 h-20 rounded-2xl opacity-50 animate-float-square transition-colors" 
                  style={{ backgroundColor: isDarkMode ? '#57452A' : '#f2b75f' }}
                ></div>
                
                {/* Profile Card - Made larger */}
                <div className="relative bg-white rounded-3xl p-10 shadow-xl z-10">
                  <div className="w-96 h-[28rem] bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                    {/* Placeholder for profile image */}
                    <div className="text-center text-gray-500">
                      <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-6"></div>
                      <p className="text-lg">Profile Image</p>
                      <p className="text-sm">Upload your photo here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-6 py-12 lg:px-12" style={{ backgroundColor: isDarkMode ? '#181716' : '#F4F3EE' }}>
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <div className={`relative w-full max-w-2xl rounded-full shadow-lg transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center px-6 py-4">
                <svg className={`w-5 h-5 mr-4 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search projects, skills, or technologies..."
                  className={`flex-1 bg-transparent outline-none transition-colors ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                />
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              Featured
            </button>
            <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              Web
            </button>
            <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              Mobile
            </button>
            <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              UI/UX
            </button>
            <button className="px-4 py-2 bg-orange-400 text-black rounded-full text-sm font-medium hover:opacity-90 transition-colors" style={{ backgroundColor: '#f2b75f' }}>
              Open Source
            </button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="px-6 py-16 lg:px-12" style={{ backgroundColor: isDarkMode ? '#181716' : '#F4F3EE' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className={`text-sm font-medium mb-4 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              FEATURED PROJECTS
            </p>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Selected work by Badhon Biswas
            </h2>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              A curated selection of web and mobile projects combining UI/UX design, React development, smooth interactions, and modern, responsive performance-focused interfaces.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'BadhonDev Portfolio',
                badge: 'Next.js',
                description: 'Personal developer portfolio showcasing web development skills, projects, and services. Buil...',
                tags: ['Portfolio', 'Developer', 'React'],
                previewBg: 'linear-gradient(160deg, #111827 0%, #1e293b 60%, #0f172a 100%)',
              },
              {
                name: 'iPhone UI Portfolio',
                badge: 'HTML/CSS/JS',
                description: 'A creative portfolio presented as an iOS-style phone interface, complete with simulated...',
                tags: ['Creative', 'Portfolio', 'iOS UI'],
                previewBg: 'linear-gradient(160deg, #1c1c2e 0%, #2c2c3e 50%, #1a1a2e 100%)',
              },
              {
                name: 'PulseNow',
                badge: 'React',
                description: 'Live cryptocurrency dashboard showing real-time prices, trending coins, and the Fear &...',
                tags: ['Crypto', 'Dashboard', 'Real-time'],
                previewBg: 'linear-gradient(160deg, #0a0f1a 0%, #0d1b2a 60%, #071020 100%)',
              },
            ].map((project, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`group rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} ${visibleCards.has(i) ? 'card-reveal' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 180}ms` }}
              >
                {/* Preview Image Area */}
                <div className="relative h-56" style={{ background: project.previewBg }}>
                  {/* Bookmark button */}
                  <button
                    className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-gray-600/60 hover:bg-gray-500/80' : 'bg-white/80 hover:bg-white'}`}
                  >
                    <svg
                      className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>

                  {/* Hover overlay with open-in-new-tab arrow */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: isDarkMode
                        ? 'linear-gradient(to left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)'
                        : 'linear-gradient(to left, rgba(244,242,235,0.92) 0%, rgba(244,242,235,0.45) 55%, transparent 100%)',
                    }}
                  >
                    <div className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className={`text-lg font-bold transition-colors duration-300 group-hover:text-[#f2b75f] ${isDarkMode ? 'text-white' : 'text-black'}`}
                    >
                      {project.name}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs rounded-full whitespace-nowrap font-medium flex-shrink-0 ${isDarkMode ? 'border border-gray-400 text-white' : 'bg-black text-white'}`}
                    >
                      {project.badge}
                    </span>
                  </div>

                  <p className={`text-sm leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-xs transition-colors ${isDarkMode ? 'bg-[#2A2A2A] text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient fade between Projects and About */}
      <div
        style={{
          height: '100px',
          background: isDarkMode
            ? 'linear-gradient(to bottom, #181716, #181716)'
            : 'linear-gradient(to bottom, #F4F3EE, #EAE6D9)',
        }}
      />

      {/* About Section */}
      <section id="about" className="px-6 py-24 lg:px-12" style={{ backgroundColor: isDarkMode ? '#181716' : '#EAE6D9' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — Photo card */}
            <div className="relative flex justify-center lg:justify-start lg:pl-8">
              <div className="relative">
                {/* Only bottom orange circle kept */}
                <div
                  className="absolute -bottom-8 -right-16 w-24 h-24 rounded-full opacity-40 animate-float-orange-2 transition-colors"
                  style={{ backgroundColor: isDarkMode ? '#57452A' : '#f2b75f' }}
                />

                {/* Card — no padding so image fills edge to edge, rounded corners clip it */}
                <div
                  className="group relative rounded-3xl overflow-hidden shadow-xl z-10 cursor-pointer"
                >
                  <div
                    className="w-[520px] h-[34rem] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    style={{ backgroundColor: isDarkMode ? '#2A2A2A' : '#f0ede4' }}
                  >
                    <div className="w-full h-full flex items-end justify-center">
                      <div className="text-center pb-10 text-gray-400">
                        <div className="w-24 h-24 rounded-full mx-auto mb-4" style={{ backgroundColor: isDarkMode ? '#3A3A3A' : '#d9d6ce' }} />
                        <p className="text-sm">Profile photo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Content */}
            <div className="space-y-6">
              {/* Label */}
              <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#f2b75f' }}>
                About Badhon
              </p>

              {/* Heading */}
              <h2 className={`text-4xl lg:text-5xl font-bold leading-tight transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Frontend &amp; Mobile Developer in Dhaka building modern UI
              </h2>

              {/* Bio paragraphs */}
              <p className={`text-base leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                I&apos;m a frontend developer and UI/UX designer with a strong focus on building fast, clean, and modern digital experiences. I blend design thinking with hands-on development to turn ideas into polished products.
              </p>
              <p className={`text-base leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                I believe good design feels effortless. Whether I&apos;m crafting a responsive website or a mobile-first interface, I focus on clarity, usability, and performance—solving real problems with simple, scalable solutions.
              </p>
              <p className={`text-base leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Outside of designing and coding, I enjoy exploring new tools, refining workflows, and experimenting with visuals and motion. I&apos;m driven by curiosity and a constant desire to improve both products and myself.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-3 pt-4">
                {[
                  { value: '7+',  label: 'Years\nExperience' },
                  { value: '50+', label: 'Projects\nDelivered' },
                  { value: '30+', label: 'Happy\nClients' },
                  { value: '100', label: 'Success\nRate' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`group rounded-2xl p-4 text-center cursor-default transition-all duration-300 hover:scale-[1.07] hover:shadow-lg ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
                  >
                    <div
                      className="inline-block text-2xl font-bold transition-transform duration-300 group-hover:scale-[1.25]"
                      style={{ color: '#f2b75f' }}
                    >
                      {stat.value}
                    </div>
                    <div className={`text-xs mt-1 leading-tight whitespace-pre-line transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Gradient fade: About → Skills */}
      <div style={{ height: '80px', background: isDarkMode ? '#181716' : 'linear-gradient(to bottom, #EAE6D9, #EDEBE3)' }} />

      {/* Skills & Tech Stack Section */}
      <section className="px-6 pb-24 lg:px-12" style={{ backgroundColor: isDarkMode ? '#181716' : '#EDEBE3' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f2b75f' }}>
              Skills &amp; Tech Stack
            </p>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
              React, UI/UX, and modern frontend tools
            </h2>
            <p className={`text-lg max-w-2xl mx-auto leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              My day-to-day stack for building fast, clean, SEO-friendly web apps and mobile experiences: HTML, CSS, JavaScript, React, UI/UX design, and performance-first implementation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Design',
                skills: ['UI Design', 'Visual Design', 'Responsive Design', 'Claymorphism', 'Glassmorphism', 'Motion Design', 'SEO & Meta Tags'],
              },
              {
                title: 'Development',
                skills: ['HTML & CSS', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'GSAP', 'Python', 'MongoDB', 'Supabase', 'AWS EC2'],
              },
              {
                title: 'Tools & Platforms',
                skills: ['Notion', 'Git', 'Vercel', 'Telegram Bot API', 'Docker', 'Gemini AI', 'Binance API'],
              },
            ].map((category, i) => (
              <div
                key={category.title}
                ref={(el) => { cardRefs.current[3 + i] = el; }}
                className={`group rounded-3xl p-8 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} ${visibleCards.has(3 + i) ? 'card-reveal' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 180}ms` }}
              >
                <h3 className={`text-xl font-bold mb-6 transition-colors duration-300 group-hover:text-[#f2b75f] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        i === 0
                          ? 'text-black cursor-default'
                          : isDarkMode
                          ? 'bg-[#2A2A2A] text-gray-300 hover:bg-[#3A2A10] hover:text-[#f2b75f] cursor-pointer'
                          : 'bg-gray-100 text-gray-600 hover:bg-[#FEF3E2] hover:text-[#c8851a] cursor-pointer'
                      }`}
                      style={i === 0 ? { backgroundColor: '#f2b75f' } : {}}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient fade: Skills → Services */}
      <div style={{ height: '80px', background: isDarkMode ? '#181716' : 'linear-gradient(to bottom, #EDEBE3, #E0DDD0)' }} />

      {/* Services Section */}
      <section className="px-6 pb-24 lg:px-12" style={{ backgroundColor: isDarkMode ? '#181716' : '#E0DDD0' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f2b75f' }}>
              Services
            </p>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Design + Development for modern web &amp; mobile
            </h2>
            <p className={`text-lg max-w-2xl mx-auto leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              End-to-end UI/UX design and frontend development for responsive websites, React web apps, and mobile-friendly interfaces—focused on clean design, smooth UX, and real-world performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Web Design & Development',
                description: 'Mobile-first websites and portfolios built with clean HTML, CSS, React, and Tailwind CSS. Responsive, fast, and visually polished across all devices.',
                tags: ['HTML/CSS/JS', 'React & Tailwind', 'Responsive Design', 'Vercel Deployment'],
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="#f2b75f" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3m8-6l3 3-3 3M14 5l-4 14" />
                  </svg>
                ),
              },
              {
                title: 'UI Design',
                description: 'Modern interface design with styles like glassmorphism and claymorphism. Smooth animations with GSAP and attention to every visual detail.',
                tags: ['Visual Design', 'GSAP Animations', 'Glassmorphism', 'Mobile-First'],
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="#f2b75f" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88" />
                  </svg>
                ),
              },
              {
                title: 'Bot & Automation Development',
                description: 'Telegram bots, automation scripts, and AI-powered tools built with Python and modern APIs to streamline workflows and save time.',
                tags: ['Telegram Bot API', 'Python', 'Gemini AI', 'Automation'],
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="#f2b75f" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                  </svg>
                ),
              },
              {
                title: 'SEO & Web Presence',
                description: 'Proper meta tags, structured data, and on-page SEO that gets your website noticed by search engines and users alike.',
                tags: ['Meta Tags', 'Structured Data', 'Performance', 'Analytics'],
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="#f2b75f" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                ),
              },
            ].map((service, i) => (
              <div
                key={service.title}
                ref={(el) => { cardRefs.current[6 + i] = el; }}
                className={`group rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} ${visibleCards.has(6 + i) ? 'card-reveal' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 180}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: isDarkMode ? '#2A1F0F' : '#FEF3E2' }}
                >
                  {service.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-[#f2b75f] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-xs transition-all duration-200 cursor-pointer ${isDarkMode ? 'bg-[#2A2A2A] text-gray-400 hover:bg-[#3A2A10] hover:text-[#f2b75f]' : 'bg-gray-100 text-gray-500 hover:bg-[#FEF3E2] hover:text-[#c8851a]'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200" style={{ color: '#f2b75f' }}>
                  Learn more →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient fade: Services → Experience */}
      <div style={{ height: '80px', background: isDarkMode ? '#181716' : 'linear-gradient(to bottom, #E0DDD0, #EDEADF)' }} />

      {/* Experience Section */}
      <section className="px-6 pb-32 lg:px-12" style={{ backgroundColor: isDarkMode ? '#181716' : '#EDEADF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f2b75f' }}>
              Experience
            </p>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
              My journey so far
            </h2>
            <p className={`text-lg max-w-2xl mx-auto leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              From student projects to founding an AI company — each stop on the map shaped who I am as a developer and designer.
            </p>
          </div>

          {/* Road Map */}
          <div ref={expSectionRef} className="relative w-full" style={{ height: '620px' }}>
            {/* SVG dotted direction path */}
            <svg
              viewBox="0 0 1200 230"
              preserveAspectRatio="none"
              className="absolute inset-x-0 w-full"
              style={{ height: '230px', top: '100px', overflow: 'visible' }}
            >
              <defs>
                <clipPath id="exp-line-clip">
                  <rect ref={clipRectRef} x={-10} y={-60} height={380} />
                </clipPath>
                <marker id="exp-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#f2b75f" />
                </marker>
              </defs>

              {/* Start point with pulse ring */}
              {expVisible && (
                <g>
                  <circle cx="20" cy="180" r="5" fill="#f2b75f" />
                  <circle cx="20" cy="180" r="5" fill="none" stroke="#f2b75f" strokeWidth="1.5" opacity="0.7">
                    <animate attributeName="r" from="5" to="22" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.7" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}

              <g clipPath="url(#exp-line-clip)">
                {/* Soft glow */}
                <path
                  d="M 20,180 C 80,180 150,80 280,90 C 410,100 450,200 570,190 C 690,180 760,80 890,90 C 970,97 1040,110 1116,115"
                  fill="none" stroke="#f2b75f" strokeWidth="14" strokeLinecap="round" opacity="0.09"
                />
                {/* Dotted direction line */}
                <path
                  d="M 20,180 C 80,180 150,80 280,90 C 410,100 450,200 570,190 C 690,180 760,80 890,90 C 970,97 1040,110 1116,115"
                  fill="none" stroke="#f2b75f" strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray="5 14" markerEnd="url(#exp-arrow)" opacity="0.8"
                />
              </g>
            </svg>

            {/* Infinity destination marker — HTML so it renders crisp at any scale */}
            <div
              className="absolute"
              style={{ left: '95%', top: '31%', transform: 'translateX(-50%)' }}
              onMouseEnter={() => setHoveredInfinity(true)}
              onMouseLeave={() => setHoveredInfinity(false)}
            >
              {/* Pulse ring */}
              {expVisible && (
                <div
                  className="absolute rounded-full animate-ping"
                  style={{ inset: '-10px', backgroundColor: '#f2b75f', opacity: 0.15 }}
                />
              )}
              {/* Circle badge */}
              <div
                className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                style={{
                  backgroundColor: hoveredInfinity ? '#f2b75f' : isDarkMode ? '#2A2A2A' : 'white',
                  border: '3px solid #f2b75f',
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                  transform: hoveredInfinity ? 'scale(1.18)' : 'scale(1)',
                }}
              >
                {/* Custom infinity SVG icon — two interlocked loops */}
                <svg viewBox="0 0 40 20" width="26" height="13" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path
                    d="M 20,10 C 20,4 14,1 10,4 C 6,7 6,13 10,16 C 14,19 20,16 20,10 C 20,4 26,1 30,4 C 34,7 34,13 30,16 C 26,19 20,16 20,10 Z"
                    stroke={hoveredInfinity ? 'white' : '#f2b75f'}
                    strokeWidth="2"
                    fill="none"
                    style={{ transition: 'stroke 0.3s ease' }}
                  />
                </svg>
              </div>

              {/* Motivational popup */}
              <div
                className={`rounded-2xl shadow-2xl p-5 ${isDarkMode ? 'bg-[#1E1E1E] border border-[#2A2A2A]' : 'bg-white border border-gray-100'}`}
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 14px)',
                  left: '50%',
                  transform: `translateX(-75%) translateY(${hoveredInfinity ? '0px' : '8px'})`,
                  width: '250px',
                  opacity: hoveredInfinity ? 1 : 0,
                  pointerEvents: hoveredInfinity ? 'auto' : 'none',
                  transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  zIndex: 60,
                }}
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: isDarkMode ? '#2A1F0F' : '#FEF3E2' }}>
                  <svg className="w-5 h-5" fill="none" stroke="#f2b75f" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className={`text-sm font-bold text-center mb-2 leading-snug ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  The Journey Never Ends
                </h4>
                <p className={`text-xs leading-relaxed text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  &ldquo;Every milestone is a launchpad. Success is not where you stop — it&apos;s the relentless habit of never stopping.&rdquo;
                </p>
                <div className="mt-3 pt-3 border-t text-center" style={{ borderColor: isDarkMode ? '#333' : '#f0ede4' }}>
                  <span className="text-xs font-semibold" style={{ color: '#f2b75f' }}>Keep Building. Keep Growing.</span>
                </div>
              </div>
            </div>

            {/* Nodes */}
            {[
              {
                label: 'Founder & Developer',
                company: 'Badhon AI',
                period: '2025 – Present',
                description: 'Founded and built Badhon AI, an AI-powered platform combining automation tools, smart bots, and intuitive interfaces. Leading product design, frontend development, and AI integration end-to-end.',
                bullets: ['AI product design & architecture', 'Full-stack development (Next.js + Python)', 'Telegram bot automation & Gemini AI'],
                left: '20%',
                top: '27%',
              },
              {
                label: 'Freelance Frontend Developer',
                company: 'Self Employed',
                period: '2023 – 2025',
                description: 'Delivered 30+ client projects including portfolios, dashboards, and landing pages. Focused on pixel-perfect design, responsive layouts, and smooth interactions.',
                bullets: ['React & Tailwind CSS projects', 'Client communication & delivery', 'Performance optimization & SEO'],
                left: '41%',
                top: '42%',
              },
              {
                label: 'UI/UX Designer',
                company: 'Freelance',
                period: '2022 – 2023',
                description: 'Designed interfaces for web and mobile apps with a focus on modern aesthetics—glassmorphism, claymorphism, and motion design. Delivered Figma-to-code handoffs.',
                bullets: ['Figma design systems', 'Motion & micro-interaction design', 'Responsive mobile-first UI'],
                left: '63%',
                top: '32%',
              },
              {
                label: 'Student Developer',
                company: 'Personal Projects',
                period: '2021 – 2022',
                description: 'Learned web development through building real projects—from simple HTML/CSS pages to interactive JavaScript apps. Laid the foundation for everything that followed.',
                bullets: ['HTML, CSS, JavaScript fundamentals', 'First React projects', 'Open source experimentation'],
                left: '83%',
                top: '30%',
              },
            ].map((exp, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: exp.left, top: exp.top, transform: 'translateX(-50%)' }}
                onMouseEnter={() => setHoveredExp(i)}
                onMouseLeave={() => setHoveredExp(null)}
              >
                {/* Animated wrapper — pin drops in after line draws */}
                <div
                  style={{
                    opacity: expVisible ? 1 : 0,
                    transform: expVisible ? 'translateY(0) scale(1)' : 'translateY(-14px) scale(0.5)',
                    transition: expVisible
                      ? `opacity 0.45s cubic-bezier(0.34,1.56,0.64,1) ${1.3 + i * 0.35}s, transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${1.3 + i * 0.35}s`
                      : 'none',
                  }}
                >
                  {/* Pin */}
                  <div className="relative flex flex-col items-center cursor-pointer group">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-125 z-20 relative"
                      style={{
                        backgroundColor: hoveredExp === i ? '#f2b75f' : isDarkMode ? '#2A2A2A' : 'white',
                        border: `3px solid ${hoveredExp === i ? '#d4944a' : '#f2b75f'}`,
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke={hoveredExp === i ? 'white' : '#f2b75f'} strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="w-0.5 h-4" style={{ backgroundColor: '#f2b75f', opacity: 0.6 }} />
                    <div className={`text-xs font-semibold mt-1 text-center whitespace-nowrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ maxWidth: '120px' }}>
                      {exp.company}
                    </div>
                  </div>

                  {/* Popup — always rendered, animates open/close */}
                  <div
                    className={`rounded-2xl shadow-2xl p-6 ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      left: '50%',
                      transform: `translateX(-50%) translateY(${hoveredExp === i ? '0px' : '8px'})`,
                      width: '300px',
                      opacity: hoveredExp === i ? 1 : 0,
                      pointerEvents: hoveredExp === i ? 'auto' : 'none',
                      transition: 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                      zIndex: 50,
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className={`text-base font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>{exp.label}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${isDarkMode ? 'bg-[#2A2A2A] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                        {exp.period}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: isDarkMode ? '#2A1F0F' : '#FEF3E2' }}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="#f2b75f" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{exp.company}</span>
                    </div>
                    <p className={`text-xs leading-relaxed mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#f2b75f" opacity="0.2" />
                            <path d="M5 8l2 2 4-4" stroke="#f2b75f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient fade: Experience → Process */}
      <div style={{ height: '100px', background: isDarkMode ? '#181716' : 'linear-gradient(to bottom, #EDEADF, #DFDBCD)' }} />

      {/* How I Design & Build Section */}
      <section className="px-6 pb-28 lg:px-12" style={{ backgroundColor: isDarkMode ? '#181716' : '#DFDBCD' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
              How I design and build
            </h2>
            <p className={`text-lg max-w-2xl mx-auto leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              A clear, repeatable process: discover → design → build → refine — delivering clean UI, smooth interactions, and fast, responsive results.
            </p>
          </div>

          {/* Process cards */}
          <div className="relative">
            {/* Connecting line through badge centers */}
            <div
              className="absolute"
              style={{
                top: '56px',
                left: '10%',
                right: '10%',
                height: '1px',
                backgroundColor: isDarkMode ? '#333' : '#d8d4c8',
                zIndex: 0,
              }}
            />

            <div className="grid grid-cols-5 gap-5">
              {[
                {
                  num: 1,
                  title: 'Discover',
                  desc: 'Deep-dive into requirements, system constraints, and scalability goals. Define SLAs, data contracts, and edge cases before a line of code is written — aligning business needs with sound engineering decisions.',
                },
                {
                  num: 2,
                  title: 'Architect',
                  desc: 'Design high-level and low-level system architecture — service boundaries, data flows, API contracts, and AI pipeline components. Every decision optimized for scalability, fault tolerance, and future extensibility.',
                },
                {
                  num: 3,
                  title: 'Engineer',
                  desc: 'Build production-grade systems with clean, modular, and testable code. From AI model integration to data pipelines and backend services — engineered with traceability and observability instrumented from day one.',
                },
                {
                  num: 4,
                  title: 'Optimize',
                  desc: 'Profile bottlenecks, tune latency and throughput, and enforce quality gates. Implement distributed tracing, structured logging, and metrics so every layer of the system is measurable, debuggable, and observable.',
                },
                {
                  num: 5,
                  title: 'Ship & Scale',
                  desc: 'Automate delivery through CI/CD pipelines with staged rollouts and automated rollbacks. Monitor production with real-time dashboards, alerting, and SLO tracking — built to scale reliably on demand.',
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className={`group relative rounded-3xl p-8 shadow-sm cursor-default z-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03] ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
                >
                  {/* Number badge */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: '#f2b75f' }}
                  >
                    <span className="text-black font-bold text-lg select-none">{step.num}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-lg font-bold mb-3 transition-colors duration-300 group-hover:text-[#f2b75f] ${isDarkMode ? 'text-white' : 'text-black'}`}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gradient fade: Process → Certifications */}
      <div style={{ height: '100px', background: isDarkMode ? '#181716' : 'linear-gradient(to bottom, #DFDBCD, #D2CDBC)' }} />

      {/* Certifications Section */}
      <section id="certifications" className="pb-28" style={{ backgroundColor: isDarkMode ? '#181716' : '#D2CDBC' }}>
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14">
          <div className="flex items-start justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f2b75f' }}>
                Certifications
              </p>
              <h2 className={`text-4xl lg:text-5xl font-bold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Licenses &amp; Certifications
              </h2>
              <p className={`text-base leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Credentials earned across AI, cloud, and systems engineering — continuously expanding expertise across the full stack.
              </p>
            </div>
            <button
              onClick={() => router.push('/certifications')}
              className="mt-2 px-8 py-4 text-black rounded-full font-medium text-sm flex items-center gap-2 hover:gap-3 hover:opacity-90 transition-all duration-200 flex-shrink-0 cursor-pointer"
              style={{ backgroundColor: '#f2b75f' }}
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Auto-scroll carousel */}
        <div style={{ position: 'relative', overflowX: 'clip', overflowY: 'visible' }}>
          {/* Left fog fade */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '160px',
              background: `linear-gradient(to right, ${isDarkMode ? '#181716' : '#D2CDBC'} 0%, transparent 100%)`,
              zIndex: 20,
              pointerEvents: 'none',
            }}
          />
          {/* Right fog fade */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '160px',
              background: `linear-gradient(to left, ${isDarkMode ? '#181716' : '#D2CDBC'} 0%, transparent 100%)`,
              zIndex: 20,
              pointerEvents: 'none',
            }}
          />
          <div className="cert-track flex gap-6 py-4">
            {[...certs, ...certs].map((cert, i) => {
              const certData = certs[i % certs.length];
              return (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-[300px] cursor-pointer"
                  style={{ height: '260px', zIndex: hoveredCert === i ? 10 : 1 }}
                  onClick={() => setSelectedCert(i)}
                  onMouseEnter={() => setHoveredCert(i)}
                  onMouseLeave={() => setHoveredCert(null)}
                >
                  <div
                    className={`absolute inset-x-0 top-0 rounded-3xl overflow-hidden ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
                    style={{
                      transform: hoveredCert === i ? 'scale(1.07) translateY(-10px)' : 'scale(1) translateY(0)',
                      transformOrigin: 'center top',
                      boxShadow: hoveredCert === i
                        ? '0 28px 56px -10px rgba(0,0,0,0.30)'
                        : '0 1px 4px rgba(0,0,0,0.08)',
                      transition: 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.38s ease',
                    }}
                  >
                    <div className="relative h-44" style={{ background: certData.previewBg }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                          <svg className="w-8 h-8" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 opacity-35">
                        <svg viewBox="0 0 32 24" width="28" height="21" fill="#f2b75f">
                          <path d="M0 24V14.4C0 6.08 5.12 1.44 15.36 0l1.28 2.88C11.52 4.16 8.96 6.72 8.32 11.2H14.4V24H0zm17.6 0V14.4C17.6 6.08 22.72 1.44 32.96 0l1.28 2.88C29.12 4.16 26.56 6.72 25.92 11.2H32V24H17.6z" />
                        </svg>
                      </div>
                    </div>
                    <div className="px-6 pt-5 pb-5">
                      <h3
                        className="text-[15px] font-bold leading-snug mb-1 transition-colors duration-300"
                        style={{ color: hoveredCert === i ? '#f2b75f' : isDarkMode ? '#ffffff' : '#000000' }}
                      >
                        {certData.title}
                      </h3>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {certData.issuer} · {certData.date}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cert detail popup */}
      {selectedCert !== null && (() => {
        const cert = certs[selectedCert % certs.length];
        return (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setSelectedCert(null)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                zIndex: 90,
                animation: 'cert-backdrop-in 0.25s ease both',
              }}
            />

            {/* Popup card */}
            <div
              className={`rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                width: '440px',
                maxHeight: '88vh',
                overflowY: 'auto',
                zIndex: 100,
                animation: 'cert-popup-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
              }}
            >
              {/* Image header */}
              <div className="relative h-52" style={{ background: cert.previewBg }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                    <svg className="w-10 h-10" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
                {/* Close button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.45)')}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Escape hint */}
                <div className="absolute bottom-3 right-4 text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Press Esc to close
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Issuer badge */}
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-black"
                    style={{ backgroundColor: '#f2b75f' }}
                  >
                    {cert.date}
                  </span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{cert.issuer}</span>
                </div>

                <h2 className={`text-2xl font-bold leading-snug mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {cert.title}
                </h2>

                <div className={`h-px mb-5 ${isDarkMode ? 'bg-[#2A2A2A]' : 'bg-gray-100'}`} />

                <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {cert.description}
                </p>

                {/* Skills */}
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Skills covered
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${isDarkMode ? 'bg-[#2A2A2A] text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button
                    className="flex-1 py-3 rounded-full text-sm font-semibold text-black flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#f2b75f' }}
                  >
                    Verify Credential
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className={`py-3 px-6 rounded-full text-sm font-semibold transition-colors ${isDarkMode ? 'bg-[#2A2A2A] text-gray-300 hover:bg-[#333]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })()}

      {/* Blog Section */}
      <section id="blog" className="px-6 pb-28 lg:px-12" style={{ backgroundColor: isDarkMode ? '#181716' : '#D2CDBC' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header row */}
          <div className="flex items-start justify-between mb-14">
            <div className="max-w-xl">
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f2b75f' }}>
                Blog
              </p>
              <h2 className={`text-4xl lg:text-5xl font-bold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Articles on AI, systems,<br />and engineering
              </h2>
              <p className={`text-base leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Insights on AI engineering, distributed systems, production architecture, and the craft of building software that scales.
              </p>
            </div>
            <button
              onClick={() => router.push('/blog')}
              className="mt-2 px-8 py-4 text-black rounded-full font-medium text-sm flex items-center gap-2 hover:gap-3 hover:opacity-90 transition-all duration-200 flex-shrink-0 cursor-pointer"
              style={{ backgroundColor: '#f2b75f' }}
            >
              View all posts
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Blog cards */}
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                previewBg: 'linear-gradient(160deg, #0d1b2a 0%, #1a2f44 50%, #0a1520 100%)',
                category: 'Development',
                readTime: '7 min read',
                title: 'Building and Deploying Telegram Bots on AWS EC2 (ARM64)',
                desc: 'From writing the bot logic to fixing ARM64 compatibility issues on Ubuntu — a practical...',
                date: 'Apr 2025',
              },
              {
                previewBg: 'linear-gradient(160deg, #2c1810 0%, #4a2c1a 50%, #1e1008 100%)',
                category: 'SEO',
                readTime: '6 min read',
                title: 'How I Ranked #1 on Google for My Own Name — Beating a 13-Year Veteran',
                desc: "SEO isn't magic. It's meta tags, consistency, and patience. Here's exactly what I did to...",
                date: 'Mar 2025',
              },
              {
                previewBg: 'linear-gradient(160deg, #1a2535 0%, #2a3d52 50%, #111c28 100%)',
                category: 'Journey',
                readTime: '5 min read',
                title: 'How I Learned Web Design Using Only a Mobile Device',
                desc: 'No laptop, no desktop — just an Android phone, a browser, and an obsession with...',
                date: 'Jan 2025',
              },
            ].map((post, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[10 + i] = el; }}
                className={`group rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'} ${visibleCards.has(10 + i) ? 'card-reveal' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 180}ms` }}
              >
                {/* Image area */}
                <div className="relative h-56 overflow-hidden" style={{ background: post.previewBg }}>
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: isDarkMode
                        ? 'linear-gradient(to left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)'
                        : 'linear-gradient(to left, rgba(222,218,208,0.92) 0%, rgba(222,218,208,0.45) 55%, transparent 100%)',
                    }}
                  >
                    <div className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6 space-y-3">
                  {/* Tag + read time */}
                  <div className="flex items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium text-black"
                      style={{ backgroundColor: '#f2b75f' }}
                    >
                      {post.category}
                    </span>
                    <div className={`flex items-center gap-1 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base font-bold leading-snug transition-colors duration-300 group-hover:text-[#f2b75f] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {post.desc}
                  </p>

                  {/* Date */}
                  <p className={`text-sm pt-1 transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {post.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — intentionally inverted: dark in light mode, light in dark mode */}
      <section
        style={{ backgroundColor: isDarkMode ? '#e9e7da' : '#141210' }}
        className="px-6 py-32 lg:px-12"
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span style={{ color: isDarkMode ? '#111827' : '#ffffff' }}>Build your next </span>
            <span style={{ color: '#f2b75f' }}>modern</span>
            <span style={{ color: isDarkMode ? '#111827' : '#ffffff' }}> experience</span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: isDarkMode ? '#6b7280' : '#9ca3af' }}
          >
            I&apos;m Badhon Biswas (BadhonAI)—a Dhaka-based frontend &amp; mobile developer and UI/UX designer. Let&apos;s create a fast, clean, SEO-friendly product with smooth interactions and modern UI.
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <button
              className="px-8 py-4 rounded-full font-semibold text-black flex items-center gap-2 hover:opacity-90 transition-all duration-200 hover:gap-3"
              style={{ backgroundColor: '#f2b75f' }}
            >
              Start a conversation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <button
              className="px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-200 hover:opacity-80"
              style={{
                backgroundColor: isDarkMode ? '#d4d0c8' : '#2a2a2a',
                color: isDarkMode ? '#111827' : '#e5e7eb',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </button>
          </div>

          {/* Status strip */}
          <div
            className="flex items-center justify-center gap-6 text-sm flex-wrap"
            style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Available for new projects
            </span>
            <span style={{ color: isDarkMode ? '#d1d5db' : '#374151' }}>|</span>
            <span>Based in Dhaka, Bangladesh</span>
            <span style={{ color: isDarkMode ? '#d1d5db' : '#374151' }}>|</span>
            <span>Response within 24h</span>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer style={{ backgroundColor: isDarkMode ? '#181716' : '#ffffff' }}>
        {/* Main footer grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
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

          {/* Navigation column */}
          <div>
            <h4 className={`text-base font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Projects', 'About', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    className={`text-sm transition-colors duration-200 hover:opacity-100 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black'}`}
                    onClick={() => item === 'Home' && window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h4 className={`text-base font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Connect</h4>
            <ul className="space-y-4">
              {[
                {
                  label: 'Github',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                    </svg>
                  ),
                },
                {
                  label: 'Linkedin',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth={1.5} />
                    </svg>
                  ),
                },
                {
                  label: 'Twitter',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5} stroke="currentColor" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2} strokeLinecap="round" stroke="currentColor" />
                    </svg>
                  ),
                },
                {
                  label: 'Email',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <li key={label}>
                  <button
                    className={`flex items-center gap-3 text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black'}`}
                  >
                    {icon}
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between"
          style={{ borderTop: `1px solid ${isDarkMode ? '#2a2a2a' : '#e5e7eb'}` }}
        >
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            © 2026 Badhon Biswas. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className={`text-sm transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
              Privacy Policy
            </button>
            <button className={`text-sm transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
              Terms of Service
            </button>
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
