'use client';

import { useState } from 'react';

// Shared visual system for native HTML/CSS process-flow diagrams (no SVG, no
// images). Used by every per-project architecture diagram so they share one
// look, one theming mechanism, and one hover/flow-animation behavior instead
// of each diagram reinventing its own.

export const LIGHT_VARS: Record<string, string> = {
  '--diag-text-strong': '#17181a',
  '--diag-text-body': '#55575b',
  '--diag-text-faint': '#7a7c80',
  '--diag-surface': '#ffffff',
  '--diag-surface-border': '#e2ded4',
  '--diag-blue': '#2d5aa8',
  '--diag-blue-bg': '#e7edf7',
  '--diag-blue-border': '#cfd6e4',
  '--diag-green': '#1c7a5e',
  '--diag-green-bg': '#f6fbf9',
  '--diag-green-border': '#b6dbcd',
  '--diag-amber': '#a8641c',
  '--diag-amber-bg': '#fdf8f1',
  '--diag-amber-border': '#e5cba6',
  '--diag-red': '#b03636',
  '--diag-red-strong': '#8a2b2b',
  '--diag-red-bg': '#fbeeee',
  '--diag-red-border': '#e2bcbc',
  '--diag-neutral': '#5c5f63',
};

export const DARK_VARS: Record<string, string> = {
  '--diag-text-strong': '#f2f0ec',
  '--diag-text-body': '#c9c7c2',
  '--diag-text-faint': '#8f8d89',
  '--diag-surface': '#242320',
  '--diag-surface-border': '#3a3934',
  '--diag-blue': '#6fa0e8',
  '--diag-blue-bg': '#1c2c47',
  '--diag-blue-border': '#35507e',
  '--diag-green': '#4bbf98',
  '--diag-green-bg': '#16302a',
  '--diag-green-border': '#2f5c4d',
  '--diag-amber': '#e0a052',
  '--diag-amber-bg': '#332916',
  '--diag-amber-border': '#5c4626',
  '--diag-red': '#e2726f',
  '--diag-red-strong': '#f0a29e',
  '--diag-red-bg': '#3a2222',
  '--diag-red-border': '#6b3535',
  '--diag-neutral': '#a3a19c',
};

export function useDiagramVars(isDarkMode: boolean): React.CSSProperties {
  return (isDarkMode ? DARK_VARS : LIGHT_VARS) as React.CSSProperties;
}

export type Kind =
  | 'trigger' | 'process' | 'store' | 'success' | 'fail'
  | 'async' | 'platform' | 'outcome' | 'outcome-negative' | 'decision';

export const KIND_STYLE: Record<Kind, { bg: string; border: string; bar?: string; text: string }> = {
  trigger:            { bg: 'var(--diag-blue-bg)',  border: 'var(--diag-blue-border)',    text: 'var(--diag-text-strong)' },
  process:            { bg: 'var(--diag-surface)',  border: 'var(--diag-surface-border)', bar: 'var(--diag-blue)',    text: 'var(--diag-text-strong)' },
  store:              { bg: 'var(--diag-blue-bg)',  border: 'var(--diag-blue-border)',    text: 'var(--diag-text-strong)' },
  success:            { bg: 'var(--diag-green-bg)', border: 'var(--diag-green-border)',   bar: 'var(--diag-green)',   text: 'var(--diag-text-strong)' },
  fail:               { bg: 'var(--diag-red-bg)',   border: 'var(--diag-red-border)',     bar: 'var(--diag-red)',     text: 'var(--diag-red-strong)' },
  async:              { bg: 'var(--diag-amber-bg)', border: 'var(--diag-amber-border)',   bar: 'var(--diag-amber)',   text: 'var(--diag-text-strong)' },
  platform:           { bg: 'var(--diag-surface)',  border: 'var(--diag-surface-border)', bar: 'var(--diag-neutral)', text: 'var(--diag-text-strong)' },
  outcome:            { bg: 'var(--diag-blue-bg)',  border: 'var(--diag-blue-border)',    text: 'var(--diag-text-strong)' },
  'outcome-negative': { bg: 'var(--diag-red-bg)',   border: 'var(--diag-red-border)',     text: 'var(--diag-red-strong)' },
  decision:           { bg: 'var(--diag-surface)',  border: 'var(--diag-blue-border)',    text: 'var(--diag-text-strong)' },
};

export function Card({
  kind, title, caption, detail, pill = false, center = false, compact = false,
}: {
  kind: Kind;
  title: React.ReactNode;
  caption?: React.ReactNode;
  detail?: React.ReactNode;
  pill?: boolean;
  center?: boolean;
  compact?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const s = KIND_STYLE[kind];
  const activeBorder = s.bar ?? s.border;

  return (
    <div
      tabIndex={0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onClick={() => setHover((h) => !h)}
      className={`relative border outline-none transition-all duration-200 ease-out cursor-default select-none
        ${pill ? 'rounded-full' : 'rounded-xl'} ${compact ? 'px-3 py-2' : 'px-4 py-3'} ${center ? 'text-center' : ''}`}
      style={{
        background: s.bg,
        borderColor: hover ? activeBorder : s.border,
        color: s.text,
        boxShadow: hover ? '0 10px 24px -10px rgba(0,0,0,0.35)' : '0 0 0 rgba(0,0,0,0)',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      {s.bar && !pill && (
        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full" style={{ background: s.bar }} />
      )}
      <div className={s.bar && !pill ? 'pl-2' : ''}>
        <p className={`font-semibold leading-snug ${compact ? 'text-xs' : 'text-sm'}`}>{title}</p>
        {caption && <p className="text-xs mt-1 opacity-70 leading-snug">{caption}</p>}
        {detail && (
          <div
            className="overflow-hidden transition-all duration-200 ease-out text-xs opacity-80 leading-relaxed"
            style={{ maxHeight: hover ? 140 : 0, marginTop: hover ? 6 : 0 }}
          >
            {detail}
          </div>
        )}
      </div>
    </div>
  );
}

export function Arrow({
  color = 'var(--diag-blue)', label, dashed = false, live = false,
}: { color?: string; label?: string; dashed?: boolean; live?: boolean }) {
  const dash = dashed ? '3px' : '6px';
  const gap = dashed ? '5px' : '3px';
  return (
    <div className="flex flex-col items-center justify-center py-1.5 gap-1">
      <div
        className="diag-flow w-[2px] h-5"
        style={{
          '--flow-color': color,
          '--flow-dash': dash,
          '--flow-gap': gap,
          animationDuration: live ? '0.5s' : '0.9s',
        } as React.CSSProperties}
      />
      {/* arrowhead stays fixed in place — only the line's dash pattern animates */}
      <div
        style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `7px solid ${color}` }}
      />
      {label && <span className="text-[11px] font-mono text-center max-w-[240px]" style={{ color }}>{label}</span>}
    </div>
  );
}

export function SectionHeader({ kicker, title, color = 'var(--diag-blue)' }: { kicker: string; title: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-xs font-mono font-semibold tracking-widest whitespace-nowrap" style={{ color }}>
        {kicker} · {title}
      </span>
      <span className="flex-1 h-px" style={{ background: 'var(--diag-surface-border)' }} />
    </div>
  );
}

export function ColumnHeader({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-mono font-semibold tracking-widest mb-2" style={{ color: 'var(--diag-text-faint)' }}>
      {label}
    </p>
  );
}

export function Note({ text, color = 'var(--diag-amber)' }: { text: string; color?: string }) {
  return <p className="text-[11px] font-mono leading-snug" style={{ color }}>{text}</p>;
}

export function Legend({ extra }: { extra?: { style: React.CSSProperties; label: string }[] }) {
  const swatches: { style: React.CSSProperties; label: string }[] = [
    { style: { background: 'var(--diag-blue-bg)', border: '1px solid var(--diag-blue-border)' }, label: 'entry point' },
    { style: { background: 'var(--diag-surface)', border: '1px solid var(--diag-surface-border)', borderLeft: '3px solid var(--diag-blue)' }, label: 'process step' },
    { style: { background: 'var(--diag-surface)', border: '1px solid var(--diag-blue-border)' }, label: 'decision' },
    { style: { background: 'var(--diag-blue-bg)', border: '1px solid var(--diag-blue-border)' }, label: 'data store' },
    { style: { background: 'var(--diag-red-bg)', border: '1px solid var(--diag-red-border)' }, label: 'fail-safe path' },
    ...(extra ?? []),
  ];
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
      {swatches.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          <span className="w-6 h-3.5 rounded" style={s.style} />
          <span className="text-[11px] font-mono" style={{ color: 'var(--diag-text-faint)' }}>{s.label}</span>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <span className="w-6 h-0.5" style={{ background: 'var(--diag-blue)' }} />
        <span className="text-[11px] font-mono" style={{ color: 'var(--diag-text-faint)' }}>synchronous</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-6 h-0.5 border-t-2" style={{ borderColor: 'var(--diag-amber)', borderStyle: 'dashed' }} />
        <span className="text-[11px] font-mono" style={{ color: 'var(--diag-text-faint)' }}>asynchronous</span>
      </div>
    </div>
  );
}

// Renders the flowing-arrow keyframes once per diagram instance.
export function DiagramStyles() {
  return (
    <style>{`
      .diag-flow {
        background-image: repeating-linear-gradient(
          to bottom,
          var(--flow-color) 0,
          var(--flow-color) var(--flow-dash),
          transparent var(--flow-dash),
          transparent calc(var(--flow-dash) + var(--flow-gap))
        );
        background-size: 100% calc(var(--flow-dash) + var(--flow-gap));
        animation-name: diag-flow-move;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      @keyframes diag-flow-move {
        from { background-position: 0 0; }
        to { background-position: 0 calc(var(--flow-dash) + var(--flow-gap)); }
      }
      @media (prefers-reduced-motion: reduce) {
        .diag-flow { animation: none; background-image: none; background-color: var(--flow-color); }
      }
    `}</style>
  );
}
