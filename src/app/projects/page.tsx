'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { projects, projectFilterTags, tagCounts } from '@/lib/projects-data';

const PROJECTS_NAV_IDX = 1;

export default function ProjectsPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const lastScrollY = useRef(0);
  const navBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    const btn = navBtnRefs.current[PROJECTS_NAV_IDX];
    if (!btn) return;
    setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, []);

  // Close the mobile menu on resize back to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navLinks = [
    { label: 'Home',           action: () => router.push('/') },
    { label: 'Work',           action: () => {} },
    { label: 'About',          action: () => router.push('/#about') },
    { label: 'Certifications', action: () => router.push('/certifications') },
    { label: 'Blog',           action: () => router.push('/blog') },
    { label: 'Contact',        action: () => router.push('/#contact') },
  ];

  const filtered = projects.filter(project => {
    const matchTag = activeTag === 'All' || project.tags.includes(activeTag);
    const q = search.toLowerCase();
    const matchSearch =
      q === '' ||
      project.name.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.badges.some(b => b.toLowerCase().includes(q)) ||
      project.tags.some(t => t.toLowerCase().includes(q)) ||
      (project.organization?.toLowerCase().includes(q) ?? false);
    return matchTag && matchSearch;
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: isDarkMode ? '#181716' : '#e9e7da' }}>

      {/* ── Navbar ── */}
      <div
        className={`px-4 py-3 sm:px-6 lg:px-12 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navHidden ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ backgroundColor: isDarkMode ? '#181716' : '#e9e7da' }}
      >
        <nav
          className="flex items-center justify-between md:justify-center px-3 sm:px-6 py-2 rounded-full shadow-lg mx-auto max-w-6xl relative"
          style={{ backgroundColor: isDarkMode ? '#1E1E1E' : '#EEEDE9' }}
        >
          <div className="flex items-center gap-2 sm:gap-3 md:absolute md:left-6">
            <button
              onClick={() => router.push('/')}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-transparent hover:ring-[#f2b75f] transition-all duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/profile.png" alt="Rishabh.k. Sharma" className="w-full h-full object-cover" />
            </button>
            <button
              onClick={() => router.push('/')}
              className={`hidden sm:inline font-semibold text-lg transition-all duration-300 hover:scale-105 ${isDarkMode ? 'text-white' : 'text-black'}`}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#f2b75f')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = '')}
            >
              Rishabh.k. Sharma
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
                  style={{ color: i === PROJECTS_NAV_IDX ? '#000000' : isDarkMode ? '#9ca3af' : '#6b7280' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 md:absolute md:right-6">
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
            <button
              onClick={() => router.push('/#contact')}
              className={`hidden sm:flex px-5 py-2 rounded-full font-medium transition-colors items-center gap-2 text-sm ${isDarkMode ? 'bg-gray-200 text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-gray-800'}`}
            >
              Let&apos;s Talk
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Hamburger toggle (mobile only) */}
            <button
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className={`md:hidden p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}`}
            >
              <svg className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden mx-auto max-w-6xl overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}
        >
          <div
            className="flex flex-col gap-1 p-3 rounded-3xl shadow-lg"
            style={{ backgroundColor: isDarkMode ? '#1E1E1E' : '#EEEDE9' }}
          >
            {navLinks.map((item, i) => (
              <button
                key={item.label}
                onClick={() => { item.action(); setMobileMenuOpen(false); }}
                className="px-4 py-3 rounded-2xl text-sm font-medium text-left transition-colors duration-200"
                style={{
                  color: i === PROJECTS_NAV_IDX ? '#000000' : isDarkMode ? '#9ca3af' : '#6b7280',
                  backgroundColor: i === PROJECTS_NAV_IDX ? '#f2b75f' : 'transparent',
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { router.push('/#contact'); setMobileMenuOpen(false); }}
              className={`mt-1 px-4 py-3 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 transition-colors ${isDarkMode ? 'bg-gray-200 text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-gray-800'}`}
            >
              Let&apos;s Talk
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
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
          Projects
        </p>
        <h1 className={`text-3xl lg:text-4xl font-bold mb-4 leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Selected Work
        </h1>
        <p className={`text-sm max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {projects.length} projects spanning enterprise AI platforms, multi-agent systems, and full-stack applications built in production.
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
              placeholder="Search projects, technologies, or clients..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`flex-1 bg-transparent outline-none text-sm ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
            />
            {search && (
              <button onClick={() => setSearch('')} className={`text-xs ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>✕</button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {projectFilterTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
                style={
                  activeTag === tag
                    ? { backgroundColor: '#f2b75f', color: '#000' }
                    : {
                        backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
                        color: isDarkMode ? '#9ca3af' : '#374151',
                        border: `1px solid ${isDarkMode ? '#2a2a2a' : '#e5e7eb'}`,
                      }
                }
              >
                {tag}
                {tag !== 'All' && (
                  <span className="ml-1.5 text-xs opacity-60">{tagCounts[tag] ?? 0}</span>
                )}
                {tag === 'All' && (
                  <span className="ml-1.5 text-xs opacity-60">{projects.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>
        {filtered.length !== projects.length && (
          <p className={`text-center text-xs mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Showing {filtered.length} of {projects.length} projects
          </p>
        )}
      </section>

      {/* ── Projects Grid ── */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className={`text-center py-24 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              No projects match your search.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map(project => (
                <div
                  key={project.id}
                  onClick={() => router.push(`/projects/${project.slug}`)}
                  className={`group rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}
                >
                  {/* ── Banner ── */}
                  <div className="relative h-40 overflow-hidden" style={{ background: project.previewBg }}>
                    {project.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                    )}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)' }}
                    />
                    {project.organization && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-black" style={{ backgroundColor: '#f2b75f' }}>
                          {project.organization}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ── Content ── */}
                  <div className="p-6 flex flex-col gap-3">
                    <h2 className={`text-sm font-bold leading-snug transition-colors duration-200 group-hover:text-[#f2b75f] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {project.name}
                    </h2>

                    {project.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.badges.map(badge => (
                          <span
                            key={badge}
                            className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap font-medium ${isDarkMode ? 'border border-gray-400 text-white' : 'bg-black text-white'}`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Divider */}
                    <div className={`h-px ${isDarkMode ? 'bg-[#2A2A2A]' : 'bg-gray-100'}`} />

                    {/* Description */}
                    <p className={`text-xs leading-relaxed line-clamp-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs transition-colors ${isDarkMode ? 'bg-[#2A2A2A] text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-1 flex-wrap">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-xs font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200"
                          style={{ color: '#f2b75f' }}
                        >
                          Live Demo
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className={`text-xs font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200 ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-700'}`}
                        >
                          View Code
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                      {!project.liveUrl && !project.githubUrl && (
                        <span className={`text-xs font-medium flex items-center gap-1.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          View case study
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      )}
                    </div>
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
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Rishabh.k. Sharma</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>AI/ML Engineer &amp; Full-Stack Developer</p>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Architecting enterprise-grade AI systems — from RAG and multi-agent orchestration to production-scale full-stack platforms.
            </p>
            <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Indore, India
            </div>
          </div>

          <div>
            <h4 className={`text-base font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Navigation</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home',           href: '/' },
                { label: 'Projects',       href: '/projects' },
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
                { label: 'Linkedin',  href: 'https://linkedin.com/in/rishabhssharma', icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth={1.5} /></> },
                { label: 'Twitter',   icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /> },
                { label: 'Instagram', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5} stroke="currentColor" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2} strokeLinecap="round" stroke="currentColor" /></> },
                { label: 'Email',     icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
              ].map(({ label, icon, href }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 text-sm transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                      {label}
                    </a>
                  ) : (
                    <button className={`flex items-center gap-3 text-sm transition-colors duration-200 cursor-pointer ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                      {label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
          style={{ borderTop: `1px solid ${isDarkMode ? '#2a2a2a' : '#e5e7eb'}` }}
        >
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            © 2026 Rishabh.k. Sharma. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className={`text-sm transition-colors cursor-pointer ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>Privacy Policy</button>
            <button className={`text-sm transition-colors cursor-pointer ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>Terms of Service</button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer flex-shrink-0 ${isDarkMode ? 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
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
