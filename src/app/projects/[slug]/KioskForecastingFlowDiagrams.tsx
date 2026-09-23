'use client';

import {
  Card, Arrow, SectionHeader, Note, Legend, DiagramStyles, useDiagramVars,
} from './diagram-kit';

// Native HTML/CSS recreation of the 7 process flows from the Kiosk
// Forecasting Pipeline spec — no SVG, no images, same visual system as the
// other project diagrams, built on the shared ./diagram-kit primitives.
//
// The spec explicitly asks that three different frequencies not read as
// equivalent: Flows 1-5 are the recurring 15-day cycle, Flow 6 is a one-time
// historical migration, and Flow 7 is a continuous monitoring layer. Each
// section carries a small frequency badge to keep that distinction visible
// rather than letting all 7 look like they happen equally often.

function FrequencyBadge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="inline-block text-[10px] font-mono font-semibold tracking-wide px-2 py-0.5 rounded-full border mb-3"
      style={{ color, borderColor: color, background: 'transparent' }}
    >
      {text}
    </span>
  );
}

const recurringSwatch = { style: { background: 'var(--diag-blue-bg)', border: '1px solid var(--diag-blue-border)' }, label: 'recurring · every 15 days' };
const oneTimeSwatch = { style: { background: 'var(--diag-surface)', border: '1px solid var(--diag-surface-border)', borderLeft: '3px solid var(--diag-neutral)' }, label: 'one-time migration' };
const monitorSwatch = { style: { background: 'var(--diag-amber-bg)', border: '1px solid var(--diag-amber-border)' }, label: 'continuous monitoring' };

export default function KioskForecastingFlowDiagrams({ isDarkMode }: { isDarkMode: boolean }) {
  const vars = useDiagramVars(isDarkMode);

  return (
    <div style={vars} className="font-sans">
      <DiagramStyles />
      {/* Intro */}
      <p className="text-[11px] font-mono font-semibold tracking-widest mb-2" style={{ color: 'var(--diag-text-faint)' }}>
        THREE FREQUENCIES, ONE PIPELINE
      </p>
      <p className="text-sm mb-6 max-w-3xl" style={{ color: 'var(--diag-text-body)' }}>
        Flows 1–5 run on a recurring 15-day cycle with no human in the loop. Flow 6 happened once, converting
        the graph's schema itself so time became a first-class dimension rather than an afterthought. Flow 7
        watches Flows 1–4 continuously, since nobody is manually checking whether each cycle succeeded.
      </p>
      <Legend extra={[recurringSwatch, oneTimeSwatch, monitorSwatch]} />

      {/* FLOW 1 — Scheduled Data Ingestion */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 1" title="SCHEDULED DATA INGESTION" />
        <FrequencyBadge text="RECURRING · EVERY 15 DAYS" color="var(--diag-blue)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Scheduler triggers" caption="every 15 days" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Connect to client kiosk data source" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="decision"
            center
            title="Fetch successful?"
            detail="Runs unattended on a schedule, not triggered by a person — a failed fetch can't fail silently, or a connectivity blip could mean an entire cycle's data goes missing unnoticed."
          />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no / connection error →" color="var(--diag-amber)" />
          </div>
          <Card kind="decision" compact center title="Retries remaining?" />
          <Note text="↺ yes → wait, retry connecting" color="var(--diag-amber)" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact title="Alert: ingestion failed, needs attention" />
          </div>
          <Arrow color="var(--diag-blue)" label="yes" />
          <Card kind="store" pill title="Raw kiosk data retrieved" caption="earnings, traffic" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Ready for Flow 2: validation & preprocessing" />
        </div>
      </section>

      {/* FLOW 2 — Data Validation & Preprocessing */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 2" title="DATA VALIDATION & PREPROCESSING" />
        <FrequencyBadge text="RECURRING · EVERY 15 DAYS" color="var(--diag-blue)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Raw kiosk data" caption="Flow 1" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Validate" caption="completeness, expected ranges, no duplicate records" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="decision"
            center
            title="Data quality issues found?"
            detail="A kiosk reporting zero traffic for 15 days straight might be a real closure or a data pipeline issue — flagging it beats silently forecasting on bad data and producing a misleading projection."
          />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="yes →" color="var(--diag-amber)" />
            <Card kind="async" compact title="Flag affected kiosks, exclude if unresolved" />
          </div>
          <Arrow color="var(--diag-blue)" label="no, or flagged and continuing" />
          <Card kind="process" center title="Clean & normalize" caption="handle missing values, align time periods" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Preprocessed data ready for Flow 3: forecasting" />
        </div>
      </section>

      {/* FLOW 3 — Time-Series Forecasting (intentionally generic) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 3" title="TIME-SERIES FORECASTING" color="var(--diag-green)" />
        <FrequencyBadge text="RECURRING · EVERY 15 DAYS" color="var(--diag-blue)" />
        <Note text="ℹ generic by design — the specific method (ARIMA, Prophet, an ML model) wasn't part of the original spec" color="var(--diag-text-faint)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="Preprocessed data" caption="Flow 2" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Process per-kiosk historical time series" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Run forecasting model" caption="project earnings & traffic forward" />
          <Arrow color="var(--diag-green)" />
          <Card kind="success" center title="Generate forecast + confidence range" />
          <Arrow color="var(--diag-green)" />
          <Card kind="outcome" pill center title="Forecast results ready for Flow 4: graph update" />
        </div>
      </section>

      {/* FLOW 4 — Temporal Knowledge Graph Update */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 4" title="TEMPORAL KNOWLEDGE GRAPH UPDATE" />
        <FrequencyBadge text="RECURRING · EVERY 15 DAYS" color="var(--diag-blue)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Forecast results" caption="Flow 3" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="process"
            center
            title="Attach time-index to new data points"
            detail="The key distinction from a standard graph update: a new data point doesn't overwrite a 'current' value — it's added as a new time-indexed relationship, preserving the full history."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Kiosk node already exists in graph?" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-2">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="no" color="var(--diag-text-faint)" />
            <Card kind="process" compact center title="Create new kiosk node" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="yes" color="var(--diag-blue)" />
            <Card kind="process" compact center title="Update existing node with new time-indexed relationship" />
          </div>
        </div>
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-1">
          <Arrow color="var(--diag-blue)" label="both branches land here" />
          <Card kind="store" pill title="Write to Neo4j temporal knowledge graph" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Graph updated, available for Flow 5: querying" />
        </div>
      </section>

      {/* FLOW 5 — Trend & Relationship Querying */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 5" title="TREND & RELATIONSHIP QUERYING" />
        <FrequencyBadge text="ON-DEMAND · PART OF THE SAME CYCLE'S VALUE" color="var(--diag-blue)" />
        <Note text="🎯 the payoff flow — the reason the schema was redesigned as temporal in the first place" color="var(--diag-green)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="Analyst/business user submits a query" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Query type?" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-2">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="single-kiosk trend over time" color="var(--diag-blue)" />
            <Card kind="store" compact center title="Query time-indexed relationships for that kiosk" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="comparative — vs. nearby kiosks / region" color="var(--diag-green)" />
            <Card kind="success" compact center title="Query graph relationships across kiosks + time range" />
          </div>
        </div>
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-1">
          <Arrow color="var(--diag-blue)" label="both return the same shape" />
          <Card kind="process" center title="Return trend data" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Displayed to analyst/business user" />
        </div>
      </section>

      {/* FLOW 6 — Static-to-Temporal Schema Migration (one-time, before/after) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 6" title="STATIC-TO-TEMPORAL SCHEMA MIGRATION" color="var(--diag-neutral)" />
        <FrequencyBadge text="ONE-TIME HISTORICAL EVENT" color="var(--diag-neutral)" />
        <Note text="🕐 not a recurring flow — included because it was the most technically significant part of the build" color="var(--diag-neutral)" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mt-3">
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-[10px] font-mono font-semibold tracking-widest" style={{ color: 'var(--diag-text-faint)' }}>
              BEFORE · STATIC SCHEMA
            </p>
            <Card
              kind="platform"
              center
              title="Kiosk node → fixed properties"
              detail="'Current earnings' is a single value on the node, overwritten on every update. No history — only the latest state is ever known."
            />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-[10px] font-mono font-semibold tracking-widest" style={{ color: 'var(--diag-blue)' }}>
              AFTER · TIME-INDEXED SCHEMA
            </p>
            <Card
              kind="success"
              center
              title="Kiosk node → time-indexed relationships"
              detail="One relationship per period, each carrying its own timestamp. Full history preserved natively, so trend queries (Flow 5) need no separate time-series store."
            />
          </div>
        </div>

        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-4">
          <Card kind="trigger" pill center title="Existing static graph schema" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="platform" center title="Audit existing relationships & properties" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="platform" center title="Design time-indexed schema equivalent for each relationship type" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="platform" center title="Migrate existing data into time-indexed structure" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="decision" center title="Migrated data validates against original?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-amber)" />
            <Card kind="async" compact title="Fix discrepancies, re-migrate" />
          </div>
          <Note text="↺ back to migration" color="var(--diag-amber)" />
          <Arrow color="var(--diag-neutral)" label="yes" />
          <Card kind="platform" center title="Cut over: new pipeline writes to temporal schema going forward" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="outcome" pill center title="Migration complete" />
        </div>
      </section>

      {/* FLOW 7 — Pipeline Reliability (continuous monitoring, cross-cutting) */}
      <section>
        <SectionHeader kicker="FLOW 7" title="PIPELINE RELIABILITY — UNATTENDED OPERATION" color="var(--diag-amber)" />
        <FrequencyBadge text="CONTINUOUS MONITORING" color="var(--diag-amber)" />
        <Note text="👁 cross-cutting — spans Flows 1–4, since the whole pipeline runs without a human checking each cycle" color="var(--diag-amber)" />
        <div
          className="rounded-xl border p-5 mt-3"
          style={{ borderColor: 'var(--diag-amber-border)', borderStyle: 'dashed', background: 'var(--diag-amber-bg)' }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--diag-text-strong)' }}>
            Recurring and unattended only works if failures route themselves
          </p>
          <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--diag-text-body)' }}>
            Nobody manually checks whether each 15-day cycle succeeded, so the pipeline needs its own internal
            monitoring layer that catches a failure at any stage and routes it to the right handling logic —
            the difference between "recurring, unattended" and "recurring, and hope nothing breaks."
          </p>
          <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
            <Card kind="trigger" pill center title="Each 15-day cycle" caption="Flows 1–4" />
            <Arrow color="var(--diag-amber)" dashed />
            <Card kind="platform" center title="Monitor each stage for failures" />
            <Arrow color="var(--diag-amber)" dashed />
            <Card kind="decision" center title="Failure at any stage?" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto mt-3">
            <div className="flex flex-col items-center gap-1.5">
              <Note text="ingestion failure" color="var(--diag-amber)" />
              <Card kind="async" compact center title="→ Flow 1's retry/alert logic" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Note text="data quality failure" color="var(--diag-amber)" />
              <Card kind="async" compact center title="→ Flow 2's flagging logic" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Note text="forecast/graph write failure" color="var(--diag-red)" />
              <Card kind="fail" compact center title="Alert ops team directly" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Note text="no failures" color="var(--diag-green)" />
              <Card kind="success" compact center title="Cycle completes successfully, logged" />
            </div>
          </div>
          <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-2">
            <Arrow color="var(--diag-amber)" label="direct alert path lands here" />
            <Card kind="outcome-negative" pill center title="Incident logged for review" />
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-between gap-1 mt-8 pt-4 border-t text-[11px] font-mono"
           style={{ borderColor: 'var(--diag-surface-border)', color: 'var(--diag-text-faint)' }}>
        <span>Temporal Graph-Based Kiosk Forecasting Pipeline</span>
        <span>1 recurring cycle · 1 one-time migration · 1 monitoring layer</span>
      </div>
    </div>
  );
}
