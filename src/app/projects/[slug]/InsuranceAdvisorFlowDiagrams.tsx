'use client';

import {
  Card, Arrow, SectionHeader, Note, Legend, DiagramStyles, useDiagramVars,
} from './diagram-kit';

// Native HTML/CSS recreation of the 7 process flows from the Insurance Plan
// Advisor spec — no SVG, no images, same visual system as the other project
// diagrams, built on the shared ./diagram-kit primitives.
//
// This spec was originally the most speculative in the series. Flow 6 (human
// escalation) was flagged as an unconfirmed assumption — the product
// screenshots since added to this project's gallery show a real "Connect
// with a benefits specialist" handoff, so it's now rendered as confirmed.
// Flow 3 (coverage calculation) still carries a verification flag: the
// screenshots show concrete numbers presented to the user, but not which
// mechanism (rules engine vs. LLM-generated) actually produces them.

function FlagBadge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="inline-block text-[10px] font-mono font-semibold tracking-wide px-2 py-0.5 rounded-full border mb-3"
      style={{ color, borderColor: color, background: 'transparent' }}
    >
      {text}
    </span>
  );
}

const verifySwatch = { style: { background: 'var(--diag-red-bg)', border: '1px solid var(--diag-red-border)' }, label: 'needs verification' };

export default function InsuranceAdvisorFlowDiagrams({ isDarkMode }: { isDarkMode: boolean }) {
  const vars = useDiagramVars(isDarkMode);

  return (
    <div style={vars} className="font-sans">
      <DiagramStyles />
      {/* Intro */}
      <p className="text-[11px] font-mono font-semibold tracking-widest mb-2" style={{ color: 'var(--diag-text-faint)' }}>
        SEVEN FLOWS · ONE FLAGGED FOR VERIFICATION
      </p>
      <p className="text-sm mb-6 max-w-3xl" style={{ color: 'var(--diag-text-body)' }}>
        Plan discovery and upsell are genuine conversational loops, not straight lines. Coverage calculation
        carries real financial stakes and its exact mechanism is unconfirmed by the product screenshots alone
        — marked below rather than presented as settled fact.
      </p>
      <Legend extra={[verifySwatch]} />

      {/* FLOW 1 — Portal Integration & Conversation Start */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 1" title="PORTAL INTEGRATION & CONVERSATION START" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="User begins enrollment in insurance portal" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="process"
            center
            title="Chat assistant launches in-flow"
            caption="embedded, not a separate page"
            detail="The most emphasized detail in the original brief — meeting users at the point of confusion, instead of sending them to a separate help center."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Assistant greets user, asks about their situation" caption="family size, existing coverage, priorities" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="store" pill title="Build initial user context from responses" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Ready for Flow 2: guided plan discovery" />
        </div>
      </section>

      {/* FLOW 2 — Guided Plan Discovery (loop) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 2" title="GUIDED PLAN DISCOVERY" color="var(--diag-green)" />
        <Note text="🔁 a loop, not a linear sequence — each answer refines understanding and re-filters the plans shown" color="var(--diag-green)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="Initial user context" caption="Flow 1" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Filter available plans based on user's stated needs" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Explain differences between remaining options in plain language" />
          <Arrow color="var(--diag-green)" />
          <Card kind="decision" center title="User asks a follow-up question?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="yes →" color="var(--diag-green)" />
            <Card kind="success" compact title="Answer question, refine understanding of needs" />
          </div>
          <Note text="↺ back to filtering plans" color="var(--diag-green)" />
          <Arrow color="var(--diag-blue)" label="no, ready to proceed" />
          <Card kind="process" center title="User narrows to 1–2 candidate plans" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Ready for Flow 3: coverage calculation" />
        </div>
      </section>

      {/* FLOW 3 — Coverage Calculation (needs verification) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 3" title="COVERAGE CALCULATION" color="var(--diag-red)" />
        <FlagBadge text="⚠ HIGHEST PRIORITY TO VERIFY BEFORE PUBLISHING" color="var(--diag-red)" />
        <Note
          text="Real financial consequences for users if wrong — an LLM generating the numbers vs. a deterministic rules engine computing them is a meaningfully different, and riskier, design. Confirm the real mechanism."
          color="var(--diag-red)"
        />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="Candidate plan(s) selected" caption="Flow 2" />
          <Arrow color="var(--diag-red)" />
          <Card kind="process" center title="Collect user-specific inputs" caption="dependents, existing conditions, etc." />
          <Arrow color="var(--diag-red)" />
          <Card
            kind="fail"
            center
            title="Calculate coverage figures for the user's situation"
            caption="mechanism unconfirmed"
            detail="Whatever computes these numbers needs to be pinned down before this goes anywhere public — deterministic rules/formula engine, a lookup against plan documents, or an LLM are not interchangeable here."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="success" center title="Present concrete coverage numbers" caption="not generic plan tables" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Ready for Flow 4: recommendations" />
        </div>
      </section>

      {/* FLOW 4 — Personalized Recommendation & Upsell */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 4" title="PERSONALIZED RECOMMENDATION & UPSELL" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Coverage calculated" caption="Flow 3" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Analyze user profile against available add-ons/upgrades" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Relevant upgrade identified?" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-2">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="yes" color="var(--diag-blue)" />
            <Card
              kind="process"
              compact
              center
              title="Present as natural part of conversation"
              detail="Not shown by default, and framed as advisory conversation rather than a separate promotional interruption — 'not a sales pitch' was a deliberate design intent."
            />
            <Card kind="decision" compact center title="User interested?" />
            <div className="flex flex-col sm:flex-row gap-2 mt-1">
              <div className="flex flex-col items-center gap-1">
                <Note text="yes" color="var(--diag-blue)" />
                <Card kind="success" compact title="Add to selected plan configuration" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Note text="no" color="var(--diag-text-faint)" />
                <Card kind="process" compact title="Proceed without add-on" />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="no" color="var(--diag-text-faint)" />
            <Card kind="process" compact center title="No upsell shown" />
          </div>
        </div>
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-1">
          <Arrow color="var(--diag-blue)" label="all paths land here" />
          <Card kind="outcome" pill center title="Ready for Flow 5: enrollment handoff" />
        </div>
      </section>

      {/* FLOW 5 — Enrollment Completion Handoff */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 5" title="ENROLLMENT COMPLETION HANDOFF" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Plan + add-ons finalized" caption="Flow 4" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Assistant summarizes final selections" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="User confirms?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no, wants changes →" color="var(--diag-amber)" />
            <Card kind="async" compact title="Return to Flow 2 or Flow 4" />
          </div>
          <Arrow color="var(--diag-blue)" label="yes" />
          <Card
            kind="process"
            center
            title="Submit enrollment through the portal's existing enrollment flow"
            detail="Hands off to the portal's own submission process rather than replacing it — keeps the assistant scoped to advisory/decision-support, not the legal transaction step. A common, reasonable integration boundary."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Enrollment completed" />
        </div>
      </section>

      {/* FLOW 6 — Escalation to Human Support */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 6" title="ESCALATION TO HUMAN SUPPORT" />
        <Note
          text="✓ confirmed by product screenshots — the assistant offers a 'Connect with a benefits specialist' handoff with conversation context carried over"
          color="var(--diag-green)"
        />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="User question the assistant cannot confidently answer" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Assistant detects low-confidence or out-of-scope query" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Offer to connect with human support" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="User accepts?" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-2">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="yes" color="var(--diag-blue)" />
            <Card kind="process" compact center title="Hand off to human support with conversation context" />
            <Arrow color="var(--diag-blue)" />
            <Card kind="outcome" pill center title="Human takes over" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="no" color="var(--diag-text-faint)" />
            <Card kind="process" compact center title="Continue with assistant, best-effort" />
          </div>
        </div>
      </section>

      {/* FLOW 7 — Post-Interaction Feedback Capture */}
      <section>
        <SectionHeader kicker="FLOW 7" title="POST-INTERACTION FEEDBACK CAPTURE" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Enrollment completed or session ends" caption="Flow 5" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Prompt user for satisfaction feedback" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="User provides feedback?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-2">
            <div className="flex flex-col items-center gap-1.5">
              <Note text="yes" color="var(--diag-blue)" />
              <Card kind="store" compact center title="Store feedback score + optional comments" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Note text="no" color="var(--diag-text-faint)" />
              <Card kind="process" compact center title="No feedback recorded" />
            </div>
          </div>
          <Arrow color="var(--diag-blue)" label="both branches land here" />
          <Card kind="process" center title="Aggregate into satisfaction metrics" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="outcome"
            pill
            center
            title="Feeds the reported +35% satisfaction and −47% enrollment-time metrics"
            detail="The measurement mechanism behind the headline numbers — without some form of feedback/timing capture, those figures couldn't be measured at all."
          />
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-between gap-1 mt-8 pt-4 border-t text-[11px] font-mono"
           style={{ borderColor: 'var(--diag-surface-border)', color: 'var(--diag-text-faint)' }}>
        <span>Insurance Plan Advisor Chat Assistant · embedded conversational guidance</span>
        <span>2 conversational loops · 1 flagged for verification</span>
      </div>
    </div>
  );
}
