'use client';

import {
  Card, Arrow, SectionHeader, Note, Legend, DiagramStyles, useDiagramVars,
} from './diagram-kit';

// Native HTML/CSS recreation of the 7 process flows from the AI-Driven Audit
// Management System spec — no SVG, no images, same visual system as the other
// project diagrams, built on the shared ./diagram-kit primitives.
//
// Two deliberate departures from the default "vertical stepper" layout, per
// the spec's own notes:
//  - Flow 3's four scoring agents render as a genuinely parallel grid (they
//    fire simultaneously via LangGraph, not one after another).
//  - Flow 7 (the audit trail) is a cross-cutting concern, not a user-triggered
//    process, so it's laid out as a wide band at the end rather than another
//    vertical stepper — it runs continuously alongside everything above it.

const complianceSwatch = { style: { background: 'var(--diag-amber-bg)', border: '1px solid var(--diag-amber-border)' }, label: 'compliance-critical' };
const humanSwatch = { style: { background: 'var(--diag-blue-bg)', border: '1px solid var(--diag-blue-border)', borderLeft: '3px solid var(--diag-blue)' }, label: 'human-in-the-loop' };

const AGENTS = [
  { title: 'Skill-Fit Agent', caption: 'reasons about expertise match' },
  { title: 'Availability Agent', caption: 'evaluates scheduling fit' },
  { title: 'Performance Agent', caption: 'reviews historical audit outcomes' },
  { title: 'Interpersonal-Fit Agent', caption: 'evaluates auditee compatibility' },
];

export default function AuditFlowDiagrams({ isDarkMode }: { isDarkMode: boolean }) {
  const vars = useDiagramVars(isDarkMode);

  return (
    <div style={vars} className="font-sans">
      <DiagramStyles />
      {/* Intro */}
      <p className="text-[11px] font-mono font-semibold tracking-widest mb-2" style={{ color: 'var(--diag-text-faint)' }}>
        SEVEN FLOWS, ONE MDR-REGULATED WORKFLOW
      </p>
      <p className="text-sm mb-6 max-w-3xl" style={{ color: 'var(--diag-text-body)' }}>
        A raw audit request becomes four AI agents reasoning in parallel, a fairness-checked ranking, and a
        human manager's final call — with every decision, including that human override, written to an
        immutable audit trail that runs beneath all of it.
      </p>
      <Legend extra={[complianceSwatch, humanSwatch]} />

      {/* FLOW 1 — Audit Intake & Requirement Parsing */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 1" title="AUDIT INTAKE & REQUIREMENT PARSING" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="New audit request enters the system" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="process"
            center
            title="Parse audit requirements"
            caption="scope, regulatory standard, timeline, location"
            detail="The raw request likely arrives as semi-structured text/forms — this is where it becomes something the rest of the pipeline can actually reason over."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Extract required assessor skills/expertise" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Extract constraints" caption="timeline, location, conflict-of-interest rules" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="store" pill title="Build structured audit requirement profile" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Ready for assessor matching" caption="Flow 2" />
        </div>
      </section>

      {/* FLOW 2 — Assessor Candidate Retrieval (Knowledge Graph Query) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 2" title="ASSESSOR CANDIDATE RETRIEVAL — KNOWLEDGE GRAPH QUERY" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Structured audit requirement profile" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Query knowledge graph for assessors with matching skills" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Filter by current availability" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="decision"
            center
            title="Conflict-of-interest check"
            detail="A hard filter, not a soft preference the AI weighs against other factors — in a regulated (MDR) context, a conflict-of-interest violation is a process failure, not a suboptimal match."
          />
          <Note text="⚠ compliance-critical — this exclusion is a hard rule, applied before any scoring happens" color="var(--diag-amber)" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-2">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="conflict found" color="var(--diag-red)" />
            <Card kind="fail" compact center title="Exclude assessor from candidate pool" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="clear" color="var(--diag-green)" />
            <Card kind="success" compact center title="Include in candidate pool" />
          </div>
        </div>
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-1">
          <Arrow color="var(--diag-blue)" label="both branches land here" />
          <Card kind="store" pill title="Candidate assessor pool" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Ready for multi-agent scoring" caption="Flow 3" />
        </div>
      </section>

      {/* FLOW 3 — Multi-Agent Reasoning & Scoring (genuinely parallel) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 3" title="MULTI-AGENT REASONING & SCORING — LANGGRAPH ORCHESTRATION" color="var(--diag-green)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Candidate assessor pool + audit requirements" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="LangGraph orchestrator dispatches to agents" />
          <Arrow color="var(--diag-green)" label="fired simultaneously, not sequentially" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {AGENTS.map((a) => (
            <Card key={a.title} kind="success" title={a.title} caption={a.caption} />
          ))}
        </div>
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-2">
          <Arrow color="var(--diag-green)" label="all four converge here" />
          <Card kind="process" center title="Collect all agent scores + reasoning" />
          <Arrow color="var(--diag-green)" />
          <Card
            kind="success"
            center
            title="Ground reasoning in RAG/GraphRAG retrieval"
            caption="audit history, past feedback"
            detail="This is what makes the scores explainable rather than opaque — the system can point to specific past outcomes for why a candidate scored the way it did, not just output a number."
          />
          <Arrow color="var(--diag-green)" />
          <Card kind="outcome" pill center title="Scored candidates + explainable reasoning" caption="ready for Flow 4" />
        </div>
      </section>

      {/* FLOW 4 — Fair Team Formation & Ranking */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 4" title="FAIR TEAM FORMATION & RANKING" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Scored candidates + reasoning" caption="Flow 3" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Aggregate multi-dimension scores per candidate" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Rank candidates" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="decision"
            center
            title="Fairness check: workload distribution across the pool?"
            detail="A pure 'best match' ranking, applied repeatedly, would over-assign the same top-scoring assessors to every audit. This check exists specifically to catch and correct that."
          />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="imbalanced →" color="var(--diag-amber)" />
            <Card kind="async" compact title="Adjust ranking to distribute workload fairly" />
          </div>
          <Arrow color="var(--diag-blue)" label="balanced, or adjusted" />
          <Card kind="process" center title="Finalize ranked recommendation list" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Ranked audit team recommendation" />
        </div>
      </section>

      {/* FLOW 5 — Human Review & Override (human-in-the-loop checkpoint) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 5" title="HUMAN REVIEW & OVERRIDE" color="var(--diag-blue)" />
        <Note text="🧑 human-in-the-loop checkpoint — the AI recommends, a human decides" color="var(--diag-blue)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="Ranked recommendation presented to audit manager" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Manager reviews recommended team + AI reasoning" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Manager decision?" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-2">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="approve as-is" color="var(--diag-blue)" />
            <Card kind="process" compact center title="Confirm audit team" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="override" color="var(--diag-amber)" />
            <Card kind="process" compact center title="Manager manually selects different assessor(s)" />
            <Arrow color="var(--diag-amber)" />
            <Card
              kind="async"
              compact
              center
              title="Log override + reason"
              detail="Preserves human accountability for the final decision, and creates a feedback signal that could improve future matching if the AI's reasoning was systematically off."
            />
          </div>
        </div>
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-1">
          <Arrow color="var(--diag-blue)" label="both paths confirm a team" />
          <Card kind="outcome" pill center title="Assessors notified, audit team finalized" />
        </div>
      </section>

      {/* FLOW 6 — CI/CD Deployment (Azure DevOps) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 6" title="CI/CD DEPLOYMENT — AZURE DEVOPS" color="var(--diag-neutral)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="platform" pill center title="Developer pushes code" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="platform" center title="Azure DevOps pipeline triggered → run automated tests" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="decision" center title="Pass?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact title="Build fails, developer notified" />
          </div>
          <Arrow color="var(--diag-neutral)" label="yes" />
          <Card kind="platform" center title="Build application" caption="Django backend" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="platform" center title="Deploy to staging environment" />
          <Arrow color="var(--diag-neutral)" />
          <Card
            kind="decision"
            center
            title="Staging validation passes?"
            detail="A bug in the matching/scoring logic wouldn't just be a technical issue — it could directly affect which assessor gets assigned to a real regulated audit. That's why this gate exists before production."
          />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact title="Build fails, developer notified" />
          </div>
          <Arrow color="var(--diag-neutral)" label="yes" />
          <Card kind="platform" center title="Deploy to production" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="outcome" pill center title="New version live" />
        </div>
      </section>

      {/* FLOW 7 — Audit Trail & Explainability (cross-cutting, not a linear flow) */}
      <section>
        <SectionHeader kicker="FLOW 7" title="AUDIT TRAIL & EXPLAINABILITY LOGGING" color="var(--diag-amber)" />
        <Note text="⚠ compliance-critical — runs continuously alongside Flows 1–5, not a separate user-triggered process" color="var(--diag-amber)" />
        <div
          className="rounded-xl border p-5 mt-3"
          style={{ borderColor: 'var(--diag-amber-border)', borderStyle: 'dashed', background: 'var(--diag-amber-bg)' }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--diag-text-strong)' }}>
            Every decision point across Flows 1–5 writes here
          </p>
          <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--diag-text-body)' }}>
            Requirement parsing, agent scoring, ranking, and any human override — each logs full context and
            reasoning to an immutable audit trail. In an MDR-regulated context, reconstructing why a specific
            assessor was matched to a specific audit, on demand, is a compliance requirement, not optional
            logging.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-1 mb-4">
            {['Flow 1 · parsing', 'Flow 2 · CoI check', 'Flow 3 · agent scores', 'Flow 4 · ranking', 'Flow 5 · human decision'].map((f) => (
              <span key={f} className="text-[11px] font-mono" style={{ color: 'var(--diag-amber)' }}>{f}</span>
            ))}
          </div>
          <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
            <Arrow color="var(--diag-amber)" dashed />
            <Card kind="store" pill title="Immutable audit trail" />
            <Arrow color="var(--diag-amber)" dashed />
            <Card kind="decision" center title="Compliance review or dispute raised?" />
            <div className="flex flex-wrap justify-center items-center gap-3 my-2">
              <Note text="no →" color="var(--diag-text-faint)" />
              <Card kind="platform" compact title="Normal operation continues" />
            </div>
            <Arrow color="var(--diag-amber)" label="yes" />
            <Card kind="process" center title="Retrieve full decision trail for the audit" />
            <Arrow color="var(--diag-amber)" />
            <Card kind="outcome" pill center title="Reconstruct: why this assessor, what each agent reasoned" />
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-between gap-1 mt-8 pt-4 border-t text-[11px] font-mono"
           style={{ borderColor: 'var(--diag-surface-border)', color: 'var(--diag-text-faint)' }}>
        <span>AI-Driven Audit Management System · MDR-regulated multi-agent matching</span>
        <span>4 parallel agents · 1 fairness check · 1 human checkpoint · 1 audit trail</span>
      </div>
    </div>
  );
}
