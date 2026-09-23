'use client';

import {
  Card, Arrow, SectionHeader, Note, Legend, DiagramStyles, useDiagramVars,
} from './diagram-kit';

// Native HTML/CSS recreation of the 7 process flows from the AI-Based Tender
// & RFP Management System spec — no SVG, no images, same visual system as
// the other project diagrams, built on the shared ./diagram-kit primitives.
//
// Three deliberate departures from a plain vertical stepper, per the spec:
//  - Flow 1's four extraction paths (criteria, clauses, financials,
//    deadlines) render as a genuinely parallel grid, not a sequence.
//  - Flow 3 (go/no-go) is the human-decision checkpoint where the AI's
//    eligibility score meets business judgment — given the same visual
//    emphasis as the human-in-the-loop flow in the Audit Management System.
//  - Flow 6 (Power BI reporting) is cross-cutting — it draws from every
//    stage of Flows 1-5, not a downstream step after Flow 5 specifically —
//    so it renders as a wide band, same treatment as the observability
//    layers elsewhere in this series.

const EXTRACTIONS = [
  { title: 'Extract eligibility criteria' },
  { title: 'Extract key clauses' },
  { title: 'Extract financial requirements' },
  { title: 'Extract deadlines' },
];

export default function TenderRfpFlowDiagrams({ isDarkMode }: { isDarkMode: boolean }) {
  const vars = useDiagramVars(isDarkMode);

  return (
    <div style={vars} className="font-sans">
      <DiagramStyles />
      {/* Intro */}
      <p className="text-[11px] font-mono font-semibold tracking-widest mb-2" style={{ color: 'var(--diag-text-faint)' }}>
        SEVEN FLOWS, ONE TENDER PIPELINE
      </p>
      <p className="text-sm mb-6 max-w-3xl" style={{ color: 'var(--diag-text-body)' }}>
        A tender document is parsed down four parallel extraction paths into one requirement profile.
        Eligibility scoring only ever informs — a business stakeholder makes the actual go/no-go call. Every
        stage across the pipeline feeds one shared reporting layer, whether or not that tender ever reaches
        submission.
      </p>
      <Legend />

      {/* FLOW 1 — Document Ingestion & Requirement Extraction (parallel) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 1" title="DOCUMENT INGESTION & REQUIREMENT EXTRACTION" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="New tender/RFP document received" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Parse document" caption="NLP + document extraction" />
          <Arrow color="var(--diag-blue)" label="fired simultaneously, not sequentially" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {EXTRACTIONS.map((e) => (
            <Card key={e.title} kind="success" center title={e.title} />
          ))}
        </div>
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-2">
          <Arrow color="var(--diag-blue)" label="all four converge here" />
          <Card
            kind="store"
            pill
            title="Assemble structured tender requirement profile"
            detail="Each extraction path needs somewhat different handling — financial figures parse differently than deadline dates — but all four feed one profile that every downstream step reads from."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Ready for Flow 2: eligibility scoring" />
        </div>
      </section>

      {/* FLOW 2 — Eligibility & Risk Scoring */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 2" title="ELIGIBILITY & RISK SCORING" color="var(--diag-green)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Structured tender requirement profile" caption="Flow 1" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Embed extracted requirements" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Query Pinecone for matching business capability records" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Retrieve top-matching capabilities" caption="OpenAI-based retrieval" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Compare tender requirements against retrieved capabilities" />
          <Arrow color="var(--diag-green)" />
          <Card
            kind="success"
            center
            title="Generate eligibility score + risk insights"
            detail="Treats 'does our business qualify' as a retrieval problem against a vector representation of the business's own capabilities, rather than a hardcoded checklist — this is what lets it generalize across differently-worded tenders."
          />
          <Arrow color="var(--diag-green)" />
          <Card kind="outcome" pill center title="Ready for Flow 3: go/no-go decision" />
        </div>
      </section>

      {/* FLOW 3 — Go/No-Go Decision (human checkpoint) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 3" title="GO/NO-GO DECISION" color="var(--diag-blue)" />
        <Note text="🧑 human-in-the-loop checkpoint — the eligibility score informs, a business stakeholder decides" color="var(--diag-blue)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="Eligibility score + risk insights" caption="Flow 2" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Present score + risk breakdown to business stakeholder" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="decision"
            center
            title="Stakeholder decision?"
            detail="The score doesn't auto-decide whether to bid — it's decision-support for a human who makes the actual call."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-2">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="no-go — low score / high risk" color="var(--diag-amber)" />
            <Card
              kind="async"
              compact
              center
              title="Archive tender, log decision + reasoning"
              detail="Even no-go decisions get logged with reasoning — building a historical record useful for refining what 'high risk' or 'low score' should mean over time."
            />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="go — proceed to bid" color="var(--diag-blue)" />
            <Card kind="outcome" pill compact center title="Proceed to Flow 4: draft generation" />
          </div>
        </div>
      </section>

      {/* FLOW 4 — Automated Form Filling & Draft Proposal Generation */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 4" title="AUTOMATED FORM FILLING & DRAFT PROPOSAL GENERATION" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Go decision" caption="Flow 3" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Pull relevant business data" caption="past projects, certifications, pricing" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Auto-fill required tender forms" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="success"
            center
            title="Generate draft proposal narrative"
            caption="addressing extracted requirements · 📄 Flow 1"
            detail="Ties back to Flow 1's extracted clauses and criteria rather than a generic template — this is what makes it meaningfully different from a standard proposal template library."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Draft ready for Flow 5: human review" />
        </div>
      </section>

      {/* FLOW 5 — Human Review & Submission (loop) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 5" title="HUMAN REVIEW & SUBMISSION" color="var(--diag-green)" />
        <Note text="🔁 a loop, not a linear sequence — review and edit repeat until the draft is ready" color="var(--diag-green)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="Draft proposal + filled forms" caption="Flow 4" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Business team reviews draft for accuracy and completeness" />
          <Arrow color="var(--diag-green)" />
          <Card kind="decision" center title="Changes needed?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="yes →" color="var(--diag-green)" />
            <Card kind="success" compact title="Edit draft" />
          </div>
          <Note text="↺ back to review" color="var(--diag-green)" />
          <Arrow color="var(--diag-blue)" label="no" />
          <Card
            kind="process"
            center
            title="Final compliance check against tender requirements"
            detail="The last gate before submission — a non-compliant tender can mean automatic disqualification regardless of how strong the proposal content is."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Submit proposal" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Track submission status" />
        </div>
      </section>

      {/* FLOW 6 — Pipeline Visibility & Reporting (cross-cutting) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 6" title="PIPELINE VISIBILITY & REPORTING — POWER BI" color="var(--diag-amber)" />
        <Note text="⟳ cross-cutting — draws from every stage of Flows 1–5, not a downstream step after Flow 5 specifically" color="var(--diag-amber)" />
        <div
          className="rounded-xl border p-5 mt-3"
          style={{ borderColor: 'var(--diag-amber-border)', borderStyle: 'dashed', background: 'var(--diag-amber-bg)' }}
        >
          <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
            <Card kind="trigger" pill center title="Any tender at any stage" caption="Flows 1–5" />
            <Arrow color="var(--diag-amber)" dashed />
            <Card kind="platform" center title="Log current status + stage" />
            <Arrow color="var(--diag-amber)" dashed />
            <Card kind="platform" center title="Aggregate across all active tenders" />
            <Arrow color="var(--diag-amber)" dashed />
            <Card
              kind="store"
              pill
              title="Power BI dashboard"
              caption="pipeline status, win/loss trends, turnaround time"
              detail="Gives the business a pipeline-wide view — how many tenders are in review, average turnaround, win rate — rather than only seeing one tender's status at a time."
            />
            <Arrow color="var(--diag-amber)" dashed />
            <Card kind="outcome" pill center title="Business reviews tender pipeline health" />
          </div>
        </div>
      </section>

      {/* FLOW 7 — CI/CD Deployment */}
      <section>
        <SectionHeader kicker="FLOW 7" title="CI/CD DEPLOYMENT — DOCKER ON AZURE" color="var(--diag-neutral)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="platform" pill center title="Developer pushes code" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="platform" center title="CI/CD pipeline triggered → run automated tests" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="decision" center title="Pass?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact title="Build fails, developer notified" />
          </div>
          <Arrow color="var(--diag-neutral)" label="yes" />
          <Card kind="platform" center title="Build Docker image → push to registry" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="platform" center title="Deploy to Azure" caption="containerized" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="decision" center title="Health checks pass?" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-2">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact center title="Rollback" />
            <Arrow color="var(--diag-red)" />
            <Card kind="outcome-negative" pill center title="Ops team alerted" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="yes" color="var(--diag-neutral)" />
            <Card kind="outcome" pill center title="New version live" />
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-between gap-1 mt-8 pt-4 border-t text-[11px] font-mono"
           style={{ borderColor: 'var(--diag-surface-border)', color: 'var(--diag-text-faint)' }}>
        <span>AI-Based Tender & RFP Management System · retrieval-driven eligibility, human-approved bids</span>
        <span>4 parallel extractions · 1 human checkpoint · 1 reporting layer</span>
      </div>
    </div>
  );
}
