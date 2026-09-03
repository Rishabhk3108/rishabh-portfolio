'use client';

import { use, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProjectBySlug } from '@/lib/projects-data';
import CrmArchitectureDiagram from './CrmArchitectureDiagram';

const PROJECTS_NAV_IDX = 1;

function CheckBullet() {
  return (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill="#f2b75f" opacity="0.2" />
      <path d="M5 8l2 2 4-4" stroke="#f2b75f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NumberedGrid({
  items,
  cardBg,
  headingText,
  mutedText,
  className = '',
}: {
  items: { label: string; description: string }[];
  cardBg: string;
  headingText: string;
  mutedText: string;
  className?: string;
}) {
  return (
    <div className={`grid sm:grid-cols-2 gap-5 ${className}`}>
      {items.map((item, i) => (
        <div key={item.label} className={`rounded-2xl p-6 ${cardBg}`}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#f2b75f' }}
            >
              <span className="text-black font-bold text-xs select-none">{i + 1}</span>
            </div>
            <h4 className={`font-bold text-sm ${headingText}`}>{item.label}</h4>
          </div>
          <p className={`text-sm leading-relaxed ${mutedText}`}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const project = getProjectBySlug(slug);
  const detail = project?.detail;

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
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
    const btn = navBtnRefs.current[PROJECTS_NAV_IDX];
    if (!btn) return;
    setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxImg ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxImg]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxImg(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navLinks = [
    { label: 'Home',           action: () => router.push('/') },
    { label: 'Work',           action: () => router.push('/projects') },
    { label: 'About',          action: () => router.push('/#about') },
    { label: 'Certifications', action: () => router.push('/certifications') },
    { label: 'Blog',           action: () => router.push('/blog') },
    { label: 'Contact',        action: () => router.push('/#contact') },
  ];

  const cardBg = isDarkMode ? 'bg-[#1E1E1E]' : 'bg-white';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const headingText = isDarkMode ? 'text-white' : 'text-black';

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
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => router.push('/projects')}
            className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer"
            style={{ color: '#9ca3af' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = isDarkMode ? '#ffffff' : '#000000'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9ca3af'; }}
          >
            ← Back to Projects
          </button>
        </div>
      </div>

      {!project ? (
        <section className="px-6 lg:px-12 py-24 text-center">
          <p className={`text-2xl font-bold mb-4 ${headingText}`}>Project not found</p>
          <p className={`text-sm mb-8 ${mutedText}`}>The project you&apos;re looking for doesn&apos;t exist or may have moved.</p>
          <button
            onClick={() => router.push('/projects')}
            className="px-6 py-3 rounded-full font-medium text-sm text-black"
            style={{ backgroundColor: '#f2b75f' }}
          >
            Back to Projects
          </button>
        </section>
      ) : (
        <>
          {/* ── Hero ── */}
          <section className="px-6 lg:px-12 pt-8 pb-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#f2b75f' }}>
                  {project.organization ? `Case Study · ${project.organization}` : 'Case Study'}
                </p>
                {detail?.period && (
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-[#2A2A2A] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                    {detail.period}
                  </span>
                )}
              </div>
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${headingText}`}>
                {project.name}
              </h1>
              <p className={`text-lg leading-relaxed max-w-3xl mb-8 ${mutedText}`}>
                {detail?.tagline || project.description}
              </p>

              {/* Cover visual */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl h-56 sm:h-72 lg:h-96 mb-8" style={{ background: project.previewBg }}>
                {project.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
                )}
              </div>

              {/* Actions */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex flex-wrap gap-4 mb-8">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full font-medium text-sm text-black flex items-center gap-2 hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#f2b75f' }}
                    >
                      Live Demo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 border transition-colors ${isDarkMode ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700' : 'bg-white text-black border-gray-200 hover:bg-gray-50'}`}
                    >
                      View Code
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              )}

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {(detail?.fullStack ?? project.badges).map(tech => (
                  <span
                    key={tech}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${isDarkMode ? 'border border-gray-400 text-white' : 'bg-black text-white'}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {detail ? (
            <>
              {/* ── Gallery ── */}
              {detail.gallery && detail.gallery.length > 0 && (
                <section className="px-6 lg:px-12 py-10">
                  <div className="max-w-5xl mx-auto">
                    <h2 className={`text-2xl font-bold mb-6 ${headingText}`}>Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {detail.gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setLightboxImg(img)}
                          className="relative rounded-2xl overflow-hidden aspect-video group cursor-pointer"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={`${project.name} screenshot ${i + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ── CRM unified-flow architecture diagram (live SVG, not an image) ── */}
              {project.slug === 'ai-enterprise-crm-platform' && (
                <section className="px-6 lg:px-12 py-10">
                  <div className="max-w-5xl mx-auto">
                    <h2 className={`text-2xl font-bold mb-2 ${headingText}`}>Flow &amp; Architecture</h2>
                    <p className={`text-sm mb-6 ${mutedText}`}>
                      Every entry point — lead creation, NL query, account summary, search, inbound
                      messages — through one auth gate and one Kafka → Celery async backbone. Scroll to
                      explore; it redraws for the current theme.
                    </p>
                    <CrmArchitectureDiagram isDarkMode={isDarkMode} />
                  </div>
                </section>
              )}

              {/* ── Diagrams (embedded inline — no click needed to see them) ── */}
              {detail.diagrams && detail.diagrams.length > 0 && (
                <section className="px-6 lg:px-12 py-10">
                  <div className="max-w-5xl mx-auto">
                    <h2 className={`text-2xl font-bold mb-6 ${headingText}`}>Flow &amp; Architecture Diagrams</h2>
                    <div className="space-y-10">
                      {detail.diagrams.map((diag, i) => (
                        <div key={i}>
                          <div className={`rounded-3xl overflow-hidden p-4 sm:p-6 ${cardBg}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={diag.image}
                              alt={diag.label}
                              onClick={() => setLightboxImg(diag.image)}
                              className="w-full h-auto rounded-2xl cursor-zoom-in"
                            />
                          </div>
                          <p className={`font-bold mt-4 ${headingText}`}>{diag.label}</p>
                          {diag.caption && <p className={`text-sm mt-1 ${mutedText}`}>{diag.caption}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ── Overview ── */}
              <section className="px-6 lg:px-12 py-10">
                <div className="max-w-5xl mx-auto">
                  <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f2b75f' }}>
                    Project Overview
                  </p>
                  <p className={`text-lg leading-relaxed ${detail.overviewPoints?.length || detail.overviewClosing?.length || detail.capabilityGroups.length > 0 ? 'mb-8' : ''} ${mutedText}`}>
                    {detail.overviewIntro}
                  </p>

                  {detail.overviewPoints && detail.overviewPoints.length > 0 && (
                    <div className={`grid sm:grid-cols-2 gap-5 ${detail.overviewClosing?.length || detail.capabilityGroups.length > 0 ? 'mb-8' : ''}`}>
                      {detail.overviewPoints.map((point, i) => (
                        <div key={point.label} className={`rounded-2xl p-6 ${cardBg}`}>
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: '#f2b75f' }}
                            >
                              <span className="text-black font-bold text-xs select-none">{i + 1}</span>
                            </div>
                            <h4 className={`font-bold text-sm ${headingText}`}>{point.label}</h4>
                          </div>
                          <p className={`text-sm leading-relaxed ${mutedText}`}>{point.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {detail.overviewClosing && detail.overviewClosing.length > 0 && (
                    <div className={`space-y-4 ${detail.capabilityGroups.length > 0 ? 'mb-8' : ''}`}>
                      {detail.overviewClosing.map((para, i) => (
                        <p key={i} className={`text-base leading-relaxed ${mutedText}`}>{para}</p>
                      ))}
                    </div>
                  )}

                  {detail.capabilityGroups.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {detail.capabilityGroups.map(group => (
                        <div key={group.title} className={`rounded-3xl p-7 ${cardBg}`}>
                          <h3 className={`text-lg font-bold mb-4 ${headingText}`}>{group.title}</h3>
                          <ul className="space-y-3">
                            {group.items.map(item => (
                              <li key={item} className="flex items-start gap-2">
                                <CheckBullet />
                                <span className={`text-sm leading-relaxed ${mutedText}`}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* ── What the System Does (optional secondary grid) ── */}
              {detail.functionsSection && detail.functionsSection.items.length > 0 && (
                <section className="px-6 lg:px-12 py-10">
                  <div className="max-w-5xl mx-auto">
                    <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f2b75f' }}>
                      {detail.functionsSection.title ?? 'What It Does'}
                    </p>
                    <h2 className={`text-2xl sm:text-3xl font-bold mb-8 ${headingText}`}>{detail.functionsSection.heading ?? 'Key capabilities'}</h2>
                    <NumberedGrid
                      items={detail.functionsSection.items}
                      cardBg={cardBg}
                      headingText={headingText}
                      mutedText={mutedText}
                      className={detail.functionsSection.closing?.length ? 'mb-8' : ''}
                    />
                    {detail.functionsSection.closing && detail.functionsSection.closing.length > 0 && (
                      <div className="space-y-4">
                        {detail.functionsSection.closing.map((para, i) => (
                          <p key={i} className={`text-base leading-relaxed ${mutedText}`}>{para}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* ── System Architecture ── */}
              {detail.architecture.length > 0 && (
                <section className="px-6 lg:px-12 py-10">
                  <div className="max-w-5xl mx-auto">
                    <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f2b75f' }}>
                      {detail.architectureTitle ?? 'System Architecture'}
                    </p>
                    <h2 className={`text-2xl sm:text-3xl font-bold mb-8 ${headingText}`}>{detail.architectureHeading ?? 'Under the hood'}</h2>
                    <NumberedGrid
                      items={detail.architecture}
                      cardBg={cardBg}
                      headingText={headingText}
                      mutedText={mutedText}
                      className={detail.architectureClosing?.length ? 'mb-8' : ''}
                    />
                    {detail.architectureClosing && detail.architectureClosing.length > 0 && (
                      <div className="space-y-4">
                        {detail.architectureClosing.map((para, i) => (
                          <p key={i} className={`text-base leading-relaxed ${mutedText}`}>{para}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* ── Technical Highlights ── */}
              {detail.highlights && detail.highlights.length > 0 && (
                <section className="px-6 lg:px-12 py-10">
                  <div className="max-w-5xl mx-auto">
                    <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f2b75f' }}>
                      Technical Highlights
                    </p>
                    <h2 className={`text-2xl sm:text-3xl font-bold mb-8 ${headingText}`}>What stood out</h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {detail.highlights.map(item => (
                        <div key={item.label} className={`rounded-2xl p-6 ${cardBg}`}>
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: isDarkMode ? '#2A1F0F' : '#FEF3E2' }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="#f2b75f" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <h4 className={`font-bold text-sm ${headingText}`}>{item.label}</h4>
                          </div>
                          <p className={`text-sm leading-relaxed ${mutedText}`}>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ── My Role & Contribution ── */}
              {detail.role.length > 0 && (
                <section className="px-6 lg:px-12 py-10">
                  <div className="max-w-5xl mx-auto">
                    <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#f2b75f' }}>
                      My Role &amp; Contribution
                    </p>
                    {detail.roleIntro && (
                      <p className={`text-base leading-relaxed mb-8 ${mutedText}`}>{detail.roleIntro}</p>
                    )}

                    <div className="relative pl-8">
                      <div
                        className="absolute top-2 bottom-2 w-0.5"
                        style={{ left: '15px', backgroundColor: '#f2b75f', opacity: 0.3 }}
                      />
                      <div className="space-y-6">
                        {detail.role.map(r => (
                          <div key={r.title} className="relative">
                            <div
                              className="absolute w-8 h-8 rounded-full flex items-center justify-center"
                              style={{ left: '-32px', top: 0, backgroundColor: isDarkMode ? '#2A2A2A' : 'white', border: '3px solid #f2b75f' }}
                            >
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#f2b75f' }} />
                            </div>
                            <div className={`rounded-2xl p-5 ${cardBg}`}>
                              <h4 className={`font-bold mb-2 ${headingText}`}>{r.title}</h4>
                              <p className={`text-sm leading-relaxed ${mutedText}`}>{r.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {detail.roleClosing && detail.roleClosing.length > 0 && (
                      <div className="space-y-4 mt-8">
                        {detail.roleClosing.map((para, i) => (
                          <p key={i} className={`text-base leading-relaxed ${mutedText}`}>{para}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* ── Outcome ── */}
              <section className="px-6 lg:px-12 py-10">
                <div className="max-w-5xl mx-auto">
                  <div
                    className="rounded-3xl p-8 sm:p-10"
                    style={{ backgroundColor: isDarkMode ? '#2A1F0F' : '#FEF3E2' }}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
                      style={{ backgroundColor: isDarkMode ? '#3A2A10' : '#f2b75f' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke={isDarkMode ? '#f2b75f' : '#000'} strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${headingText}`}>Outcome</h3>
                    <p className={`text-base leading-relaxed ${detail.outcomeStats && detail.outcomeStats.length > 0 ? 'mb-8' : ''} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {detail.outcome}
                    </p>

                    {detail.outcomeStats && detail.outcomeStats.length > 0 && (
                      <div className="flex flex-wrap gap-8">
                        {detail.outcomeStats.map(stat => (
                          <div key={stat.label} className="max-w-[16rem]">
                            <div className={`text-3xl sm:text-4xl font-bold ${headingText}`}>{stat.value}</div>
                            <div className={`text-sm mt-1 leading-snug ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {detail.note && (
                    <p className={`text-xs italic leading-relaxed text-center mt-6 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                      {detail.note}
                    </p>
                  )}
                </div>
              </section>
            </>
          ) : (
            <section className="px-6 lg:px-12 py-10">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-xs ${isDarkMode ? 'bg-[#2A2A2A] text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={`rounded-3xl p-8 text-center ${cardBg}`}>
                  <p className={`text-sm ${mutedText}`}>Full case study coming soon — check back for the detailed write-up on this project.</p>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ── Lightbox ── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.88)' }}
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <button
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              onClick={() => setLightboxImg(null)}
            >
              Close ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImg}
              alt="Expanded view"
              className="w-full h-auto rounded-2xl shadow-2xl object-contain max-h-[85vh] mx-auto"
            />
          </div>
        </div>
      )}

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
