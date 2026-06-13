'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const allCerts = [
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI · Coursera',
    date: 'Nov 2024',
    category: 'AI / ML',
    description: 'Supervised & unsupervised learning, neural networks, decision trees, and real-world ML deployment strategies with hands-on Python projects.',
    skills: ['Python', 'NumPy', 'scikit-learn', 'TensorFlow', 'ML Pipelines'],
    previewBg: 'linear-gradient(160deg, #0d1b2a 0%, #1a3a5c 50%, #0a1520 100%)',
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI · Coursera',
    date: 'Jul 2024',
    category: 'AI / ML',
    description: 'Neural network architectures, CNNs, RNNs, LSTMs, and hyperparameter tuning for production-grade deep learning models across 5 courses.',
    skills: ['Python', 'TensorFlow', 'Keras', 'CNNs', 'RNNs', 'LSTMs'],
    previewBg: 'linear-gradient(160deg, #0f1f0f 0%, #1a3a1a 50%, #0a150a 100%)',
  },
  {
    title: 'Generative AI with LLMs',
    issuer: 'DeepLearning.AI · AWS',
    date: 'Dec 2024',
    category: 'AI / ML',
    description: 'Transformer architecture, fine-tuning strategies, RLHF, prompt engineering, and deploying generative AI models in production with SageMaker.',
    skills: ['Transformers', 'Fine-tuning', 'RLHF', 'Prompt Eng.', 'SageMaker'],
    previewBg: 'linear-gradient(160deg, #1a0d20 0%, #3a1a4a 50%, #100815 100%)',
  },
  {
    title: 'LangChain & LLM Engineering',
    issuer: 'DeepLearning.AI',
    date: 'Mar 2025',
    category: 'AI / ML',
    description: 'Building production LLM applications with LangChain — chains, agents, memory modules, RAG pipelines, and third-party tool integrations.',
    skills: ['LangChain', 'LLMs', 'RAG', 'Vector DBs', 'Agents', 'Prompt Eng.'],
    previewBg: 'linear-gradient(160deg, #1a1a0a 0%, #3a3510 50%, #100f05 100%)',
  },
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Sep 2024',
    category: 'Cloud',
    description: 'Core AWS services, cloud architecture fundamentals, IAM security best practices, and pricing models for building scalable cloud infrastructure.',
    skills: ['AWS EC2', 'S3', 'IAM', 'CloudWatch', 'Lambda', 'VPC'],
    previewBg: 'linear-gradient(160deg, #1a1200 0%, #3d2b00 50%, #110c00 100%)',
  },
  {
    title: 'Google Cloud Fundamentals',
    issuer: 'Google Cloud · Coursera',
    date: 'Feb 2025',
    category: 'Cloud',
    description: 'Core infrastructure, networking, storage, and compute services on Google Cloud Platform — designed for aspiring cloud architects.',
    skills: ['GCP', 'BigQuery', 'Cloud Run', 'GKE', 'Pub/Sub'],
    previewBg: 'linear-gradient(160deg, #0a1520 0%, #1a2f44 50%, #071015 100%)',
  },
  {
    title: 'System Design for ML',
    issuer: 'Educative.io',
    date: 'Jan 2025',
    category: 'MLOps',
    description: 'End-to-end ML system design covering feature stores, model serving infrastructure, A/B testing frameworks, monitoring, and retraining pipelines.',
    skills: ['MLOps', 'Feature Stores', 'Model Serving', 'Monitoring', 'CI/CD'],
    previewBg: 'linear-gradient(160deg, #0a1020 0%, #151e35 50%, #060a12 100%)',
  },
  {
    title: 'Docker & Kubernetes Essentials',
    issuer: 'KodeKloud',
    date: 'Oct 2024',
    category: 'MLOps',
    description: 'Containerising applications with Docker, orchestrating workloads with Kubernetes, and building CI/CD pipelines for cloud-native production environments.',
    skills: ['Docker', 'Kubernetes', 'Helm', 'CI/CD', 'YAML', 'Pods'],
    previewBg: 'linear-gradient(160deg, #051520 0%, #0a2535 50%, #030a10 100%)',
  },
  {
    title: 'React — The Complete Guide',
    issuer: 'Udemy · Academind',
    date: 'Aug 2023',
    category: 'Web Dev',
    description: 'Advanced React patterns including hooks, context, Redux Toolkit, React Router, and building production-grade SPAs and SSR apps with Next.js.',
    skills: ['React', 'Redux', 'Hooks', 'Context API', 'Next.js', 'TypeScript'],
    previewBg: 'linear-gradient(160deg, #0d1a2a 0%, #1a3050 50%, #080f1a 100%)',
  },
  {
    title: 'MongoDB Developer Certification',
    issuer: 'MongoDB University',
    date: 'Jun 2024',
    category: 'Web Dev',
    description: 'Schema design patterns, aggregation pipelines, indexing strategies, and building highly scalable NoSQL applications with MongoDB Atlas.',
    skills: ['MongoDB', 'NoSQL', 'Aggregation', 'Atlas', 'Mongoose', 'Indexing'],
    previewBg: 'linear-gradient(160deg, #0a1a0f 0%, #143020 50%, #050f08 100%)',
  },
  {
    title: 'Python for Data Science & ML',
    issuer: 'IBM · Coursera',
    date: 'May 2024',
    category: 'AI / ML',
    description: 'Data analysis with Pandas, visualisation with Matplotlib and Seaborn, and machine learning workflows — from data cleaning to model deployment.',
    skills: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'scikit-learn', 'Jupyter'],
    previewBg: 'linear-gradient(160deg, #1a100a 0%, #35200f 50%, #100a05 100%)',
  },
  {
    title: 'Node.js & Express Masterclass',
    issuer: 'Udemy',
    date: 'Apr 2023',
    category: 'Web Dev',
    description: 'Building RESTful APIs, authentication with JWT, real-time features with Socket.io, and deploying Node.js services to cloud platforms.',
    skills: ['Node.js', 'Express', 'JWT', 'REST API', 'Socket.io', 'MongoDB'],
    previewBg: 'linear-gradient(160deg, #0f1a10 0%, #1e3520 50%, #08100a 100%)',
  },
];

const categories = ['All', 'AI / ML', 'Cloud', 'MLOps', 'Web Dev'];

const CERT_NAV_IDX = 3;

export default function CertificationsPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const lastScrollY = useRef(0);
  const navBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

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

  useEffect(() => {
    const btn = navBtnRefs.current[CERT_NAV_IDX];
    if (!btn) return;
    setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, []);

  const navLinks = [
    { label: 'Home',           action: () => router.push('/') },
    { label: 'Work',           action: () => router.push('/#projects') },
    { label: 'About',          action: () => router.push('/#about') },
    { label: 'Certifications', action: () => {} },
    { label: 'Blog',           action: () => router.push('/blog') },
    { label: 'Contact',        action: () => router.push('/#contact') },
  ];

  const filtered = allCerts.filter(cert => {
    const matchCat = activeCategory === 'All' || cert.category === activeCategory;
    const matchSearch =
      search === '' ||
      cert.title.toLowerCase().includes(search.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(search.toLowerCase()) ||
      cert.description.toLowerCase().includes(search.toLowerCase()) ||
      cert.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
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

          <div className="hidden md:flex items-center">
            <div
              className="relative flex items-center gap-1 px-2 py-1.5 rounded-full"
              style={{ backgroundColor: isDarkMode ? '#2A2A2A' : '#F5F4F0' }}
            >
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
                  style={{ color: i === CERT_NAV_IDX ? '#000000' : isDarkMode ? '#9ca3af' : '#6b7280' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

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

      {/* ── Header ── */}
      <section className="pt-12 pb-14 px-6 lg:px-12 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f2b75f' }}>
          Certifications
        </p>
        <h1 className={`text-3xl lg:text-4xl font-bold mb-4 leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Licenses &amp; Certifications
        </h1>
        <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Credentials earned across AI, machine learning, cloud infrastructure, and full-stack development — continuously expanding expertise across the full stack.
        </p>
      </section>

      {/* ── Search + Filters ── */}
      <section className="px-6 lg:px-12 pb-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className={`flex-1 flex items-center gap-3 px-5 py-3.5 rounded-full shadow-sm ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
            <svg className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search certifications, skills, or issuers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`flex-1 bg-transparent outline-none text-sm ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
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

      {/* ── Cert Grid ── */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className={`text-center py-24 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              No certifications match your search.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((cert, i) => (
                <div
                  key={i}
                  className={`group rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
                >
                  {/* Banner */}
                  <div className="relative h-36" style={{ background: cert.previewBg }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                        <svg className="w-7 h-7" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-black" style={{ backgroundColor: '#f2b75f' }}>
                        {cert.category}
                      </span>
                    </div>
                    {/* Quote decoration */}
                    <div className="absolute top-4 right-4 opacity-30">
                      <svg viewBox="0 0 32 24" width="24" height="18" fill="#f2b75f">
                        <path d="M0 24V14.4C0 6.08 5.12 1.44 15.36 0l1.28 2.88C11.52 4.16 8.96 6.72 8.32 11.2H14.4V24H0zm17.6 0V14.4C17.6 6.08 22.72 1.44 32.96 0l1.28 2.88C29.12 4.16 26.56 6.72 25.92 11.2H32V24H17.6z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3">
                    {/* Title */}
                    <h2 className={`text-base font-bold leading-snug transition-colors duration-200 group-hover:text-[#f2b75f] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {cert.title}
                    </h2>

                    {/* Issuer + date */}
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      {cert.issuer} · {cert.date}
                    </p>

                    {/* Divider */}
                    <div className={`h-px ${isDarkMode ? 'bg-[#2A2A2A]' : 'bg-gray-100'}`} />

                    {/* Description */}
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {cert.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map(skill => (
                        <span
                          key={skill}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-[#2A2A2A] text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Verify link */}
                    <button
                      className="mt-1 text-xs font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200 cursor-pointer"
                      style={{ color: '#f2b75f' }}
                    >
                      Verify Credential
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
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
                { label: 'Home',           href: '/' },
                { label: 'Projects',       href: '/#projects' },
                { label: 'About',          href: '/#about' },
                { label: 'Certifications', href: '/certifications' },
                { label: 'Blog',           href: '/blog' },
                { label: 'Contact',        href: '/#contact' },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => router.push(item.href)}
                    className={`text-sm transition-colors duration-200 cursor-pointer ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black'}`}
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
                  <button className={`flex items-center gap-3 text-sm transition-colors duration-200 cursor-pointer ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
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
            <button className={`text-sm transition-colors cursor-pointer ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>Privacy Policy</button>
            <button className={`text-sm transition-colors cursor-pointer ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>Terms of Service</button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer ${isDarkMode ? 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
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
