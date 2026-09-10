'use client';

import { useState } from 'react';

// Native HTML/CSS recreation of the "CRM Unified Flow" architecture diagram —
// no SVG, no images. Every box is a real element with hover/focus interaction
// (lift, glow, detail reveal), and the layout is responsive grid/flex, so it
// reflows into a single readable column on small screens instead of shrinking.

const LIGHT_VARS: Record<string, string> = {
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

const DARK_VARS: Record<string, string> = {
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

type Kind =
  | 'trigger' | 'process' | 'store' | 'success' | 'fail'
  | 'async' | 'platform' | 'outcome' | 'outcome-negative' | 'decision';

const KIND_STYLE: Record<Kind, { bg: string; border: string; bar?: string; text: string }> = {
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

function Card({
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

function Arrow({
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

function StageHeader({ index, title, color = 'var(--diag-blue)' }: { index: number; title: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-xs font-mono font-semibold tracking-widest whitespace-nowrap" style={{ color }}>
        STAGE {index} · {title}
      </span>
      <span className="flex-1 h-px" style={{ background: 'var(--diag-surface-border)' }} />
    </div>
  );
}

function PathHeader({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-mono font-semibold tracking-widest mb-2" style={{ color: 'var(--diag-text-faint)' }}>
      {label}
    </p>
  );
}

function Note({ text, color = 'var(--diag-amber)' }: { text: string; color?: string }) {
  return <p className="text-[11px] font-mono leading-snug" style={{ color }}>{text}</p>;
}

function Legend() {
  const swatches: { style: React.CSSProperties; label: string }[] = [
    { style: { background: 'var(--diag-blue-bg)', border: '1px solid var(--diag-blue-border)' }, label: 'entry point' },
    { style: { background: 'var(--diag-surface)', border: '1px solid var(--diag-surface-border)', borderLeft: '3px solid var(--diag-blue)' }, label: 'process step' },
    { style: { background: 'var(--diag-surface)', border: '1px solid var(--diag-blue-border)' }, label: 'decision' },
    { style: { background: 'var(--diag-blue-bg)', border: '1px solid var(--diag-blue-border)' }, label: 'data store' },
    { style: { background: 'var(--diag-red-bg)', border: '1px solid var(--diag-red-border)' }, label: 'fail-safe path' },
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

const TRIGGERS = [
  { title: 'Rep creates a lead', detail: 'Sales rep fills out the new-lead form in the CRM UI.' },
  { title: 'User asks a question in plain language', detail: "Natural-language question submitted to the CRM's AI assistant." },
  { title: 'Rep opens an account page', detail: 'Rep clicks into an existing account / customer record.' },
  { title: 'User searches CRM records', detail: 'Free-text or filtered search across leads, contacts, and activity history.' },
  { title: 'Customer email / message arrives', detail: 'An inbound channel delivers a new customer email or message.' },
];

const STAGE4_TASKS = [
  { kind: 'success' as Kind, title: 'AI lead scoring', caption: 'gather context → LLM', detail: 'Combines account and activity history into a prompt; the LLM returns a 0–100 score with reasoning.' },
  { kind: 'success' as Kind, title: 'Sentiment analysis', caption: 'LLM classifies inbound message', detail: 'Classifies each inbound message as positive, neutral, negative, or urgent.' },
  { kind: 'platform' as Kind, title: 'Email, notifications, reports', caption: 'delivery & generation tasks', detail: 'Fan-out delivery tasks and templated report generation.' },
  { kind: 'platform' as Kind, title: 'Ingestion & re-index', caption: 'search index + embeddings refreshed', detail: 'Keeps the search index and vector embeddings current with new data.' },
];

const CICD_STEPS = [
  { title: 'Developer pushes code', pill: true },
  { title: 'Lint → Pytest → Playwright → security scan', note: 'any gate fails → build stops, dev notified' },
  { title: 'Build Docker image → push to registry' },
  { title: 'Kubernetes rolling deploy → health checks', note: 'unhealthy → auto rollback + alert' },
  { title: 'New version live, old pods drained', pill: true },
];

export default function CrmArchitectureDiagram({ isDarkMode }: { isDarkMode: boolean }) {
  const vars = (isDarkMode ? DARK_VARS : LIGHT_VARS) as React.CSSProperties;

  return (
    <div style={vars} className="font-sans">
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
      {/* Intro */}
      <p className="text-[11px] font-mono font-semibold tracking-widest mb-2" style={{ color: 'var(--diag-text-faint)' }}>
        UNIFIED END-TO-END PROCESS FLOW
      </p>
      <p className="text-sm mb-6 max-w-3xl" style={{ color: 'var(--diag-text-body)' }}>
        All entry points converge on a single auth gate; all asynchronous work converges on a single Kafka → Celery backbone.
      </p>
      <Legend />

      {/* STAGE 1 — Triggers */}
      <section className="mb-10">
        <StageHeader index={1} title="TRIGGERS" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TRIGGERS.map((t) => (
            <Card key={t.title} kind="trigger" pill center title={t.title} detail={t.detail} />
          ))}
        </div>
        <Arrow color="var(--diag-blue)" label="every entry point enters the same gate" />
      </section>

      {/* STAGE 2 — Auth & Tenant Gate */}
      <section className="mb-10">
        <StageHeader index={2} title="AUTH & TENANT GATE" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="decision" center title="Valid JWT?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no → 401" color="var(--diag-red)" />
            <Card kind="fail" compact title="Return 401 Unauthorized" />
          </div>
          <Arrow color="var(--diag-blue)" label="yes" />
          <Card kind="process" center title="Resolve tenant context from token claims" caption="tenant id · org scope" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="RBAC permits this action?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no → 403" color="var(--diag-red)" />
            <Card kind="fail" compact title="Return 403 Forbidden" />
          </div>
          <Arrow color="var(--diag-blue)" label="yes" />
          <Card kind="process" center title="Attach tenant + role context to request" caption="travels downstream" />
          <Arrow color="var(--diag-amber)" dashed />
          <Card
            kind="async"
            center
            title="Tenant context"
            caption="propagated into every step that follows"
            detail="SQL queries, cache keys, search indexes, event payloads, and RAG retrieval are all tenant-scoped from this point on."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Which request type?" caption="routes into one of the five paths below ↓" />
        </div>
      </section>

      {/* STAGE 3 — Synchronous request paths */}
      <section className="mb-10">
        <StageHeader index={3} title="SYNCHRONOUS REQUEST PATHS" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-start">

          {/* PATH A */}
          <div className="flex flex-col items-stretch gap-1">
            <PathHeader label="PATH A · LEAD WRITE" />
            <Card kind="process" title="Validate payload" caption="Pydantic schema" detail="Backend validates the incoming lead payload against a Pydantic schema before touching the database." />
            <Arrow />
            <Card kind="store" pill title="Write lead → PostgreSQL" detail="Lead record is persisted inside the request/response cycle — no async wait for AI scoring." />
            <Arrow />
            <Card kind="outcome" pill center title="Lead in UI immediately — unscored" detail="The rep sees the lead instantly; its AI score fills in moments later." />
            <div className="mt-3"><Note text="emits lead.created →" /></div>
          </div>

          {/* PATH B */}
          <div className="flex flex-col items-stretch gap-1">
            <PathHeader label="PATH B · NL QUERY" />
            <Card kind="process" title="Parse query intent" />
            <Arrow color="var(--diag-green)" />
            <Card kind="decision" center title="Retrieval scoped to this tenant?" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
              <div className="flex flex-col items-center gap-1">
                <Note text="cross-tenant" color="var(--diag-red)" />
                <Card kind="fail" compact title="Block — fail safe, no leak" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Note text="clean" color="var(--diag-green)" />
                <Card kind="store" compact title="Vector DB retrieval" detail="Similarity search runs only against this tenant's embedded knowledge base." />
              </div>
            </div>
            <Arrow color="var(--diag-green)" />
            <Card kind="success" title="Assemble context → LLM answer" detail="Retrieved context plus the user's question are assembled into a grounded prompt." />
            <Arrow />
            <Card kind="outcome" pill center title="Answer shown to user" />
            <div className="mt-3">
              <Note text="emits query.logged (audit) →" />
            </div>
          </div>

          {/* PATH C */}
          <div className="flex flex-col items-stretch gap-1">
            <PathHeader label="PATH C · ACCOUNT SUMMARY" />
            <Card kind="decision" center title="Cached summary fresh?" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
              <div className="flex flex-col items-center gap-1.5">
                <Note text="yes" color="var(--diag-blue)" />
                <Card kind="store" compact title="Serve from Redis" />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Note text="no / stale" color="var(--diag-amber)" />
                <Card kind="process" compact title="Gather account history" />
                <Arrow color="var(--diag-green)" />
                <Card kind="success" compact title="LLM summarises" />
                <Arrow />
                <Card kind="store" compact title="Cache in Redis · TTL" />
              </div>
            </div>
            <Arrow label="both branches land here" />
            <Card kind="outcome" pill center title="Summary on account page" />
            <div className="mt-3"><Note text="new activity invalidates the cache →" /></div>
          </div>

          {/* PATH D */}
          <div className="flex flex-col items-stretch gap-1">
            <PathHeader label="PATH D · FULL-TEXT SEARCH" />
            <Card kind="process" title="Query Elasticsearch / OpenSearch" caption="tenant-scoped index" />
            <Arrow />
            <Card kind="process" title="Rank & filter by relevance" />
            <Arrow />
            <Card kind="process" title="Merge entity types" caption="leads · contacts · activities" />
            <Arrow />
            <Card kind="outcome" pill center title="Unified results returned" />
            <div className="mt-3"><Note text="index kept current by async re-index →" /></div>
          </div>

          {/* PATH E */}
          <div className="flex flex-col items-stretch gap-1">
            <PathHeader label="PATH E · INBOUND COMMS" />
            <Card kind="process" title="Ingest & normalise message" />
            <Arrow />
            <Card kind="store" pill title="Save to PostgreSQL" />
            <Arrow />
            <Card kind="outcome" pill center title="Message visible in the timeline" />
            <div className="mt-3"><Note text="emits communication.received →" /></div>
          </div>
        </div>

        <Arrow color="var(--diag-amber)" dashed label="all write paths publish onto one event bus · fire & forget" />
      </section>

      {/* STAGE 4 — Shared async backbone */}
      <section className="mb-10">
        <StageHeader index={4} title="SHARED ASYNC BACKBONE" color="var(--diag-amber)" />
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--diag-amber)' }} />
            <Card kind="async" center pill title="Apache Kafka — event bus" caption="lead.created · query.logged · communication.received · report.requested" />
          </div>
          <Arrow color="var(--diag-amber)" dashed live />
          <Card kind="async" center title="Celery worker pool — consumes topics" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {STAGE4_TASKS.map((t) => (
            <Card key={t.title} kind={t.kind} title={t.title} caption={t.caption} detail={t.detail} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-1 mt-2">
          <Arrow color="var(--diag-amber)" />
          <Card kind="decision" center title="Task processed successfully?" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col items-center gap-2">
            <Note text="no · retries remaining" color="var(--diag-amber)" />
            <Card kind="async" center title="Wait (backoff), retry the task" />
            <Note text="↺ back to the worker pool" color="var(--diag-amber)" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Note text="no · retries exhausted" color="var(--diag-red)" />
            <Card kind="fail" center title="Dead-letter queue" />
            <Arrow color="var(--diag-red)" />
            <Card kind="outcome-negative" pill center title="Ops team alerted — nothing silently lost" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Note text="yes" color="var(--diag-blue)" />
            <Card kind="process" center title="Commit offset · persist result" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
              <Card kind="store" compact center title="PostgreSQL — score, sentiment, results" />
              <Card kind="store" compact center title="Redis / search / vector refresh" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <Card kind="outcome" pill center title="Lead score appears in the UI, near real-time" />
          <Card kind="outcome-negative" pill center title="Negative / urgent message flagged → rep notified immediately" />
          <Card kind="outcome" pill center title="Neutral sentiment tagged, visible in history" />
        </div>
        <p className="text-[11px] font-mono text-center mt-4" style={{ color: 'var(--diag-amber)' }}>
          results are pushed back to the client that started the flow — closing the loop
        </p>
      </section>

      {/* STAGE 5 — Platform */}
      <section>
        <StageHeader index={5} title="PLATFORM BENEATH THE WHOLE FLOW" color="var(--diag-neutral)" />
        <div className="rounded-xl border p-5" style={{ borderColor: 'var(--diag-surface-border)' }}>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            {CICD_STEPS.map((step, i) => (
              <div key={step.title} className="flex flex-col lg:flex-row items-center gap-3 flex-1">
                <div className="w-full">
                  <Card kind="platform" pill={step.pill} center title={step.title} />
                  {step.note && (
                    <p className="text-[10px] font-mono text-center mt-1.5" style={{ color: 'var(--diag-red-strong)' }}>
                      {step.note}
                    </p>
                  )}
                </div>
                {i < CICD_STEPS.length - 1 && (
                  <span className="hidden lg:inline text-lg shrink-0" style={{ color: 'var(--diag-neutral)' }}>→</span>
                )}
                {i < CICD_STEPS.length - 1 && (
                  <span className="lg:hidden text-lg" style={{ color: 'var(--diag-neutral)' }}>↓</span>
                )}
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-4" style={{ borderColor: 'var(--diag-surface-border)', borderStyle: 'dashed' }}>
            <p className="text-[11px] font-mono font-semibold tracking-wide" style={{ color: 'var(--diag-neutral)' }}>
              GRAFANA + OPENTELEMETRY
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--diag-text-faint)' }}>
              Observes every stage above — API latency, throughput, error rates, and traces that follow one tenant
              request from the gate through Kafka into async work.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-between gap-1 mt-8 pt-4 border-t text-[11px] font-mono"
           style={{ borderColor: 'var(--diag-surface-border)', color: 'var(--diag-text-faint)' }}>
        <span>AI-Powered Enterprise CRM Platform · unified process flow</span>
        <span>one gate · five request paths · one async backbone · one platform</span>
      </div>
    </div>
  );
}
