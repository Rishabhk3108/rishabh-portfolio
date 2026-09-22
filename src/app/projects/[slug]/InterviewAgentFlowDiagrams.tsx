'use client';

import {
  Card, Arrow, SectionHeader, Note, Legend, DiagramStyles, useDiagramVars,
} from './diagram-kit';

// Native HTML/CSS recreation of the 7 process flows from the AI Interview
// Agent spec — no SVG, no images, same visual system as the other project
// diagrams, built on the shared ./diagram-kit primitives.
//
// Three deliberate departures from the default vertical stepper, per the
// spec's own notes:
//  - Flow 2 (autonomous meeting join) is the most fragile step in the whole
//    system, so its retry/failure handling gets the most visual weight.
//  - Flow 3 (barge-in) renders as two concurrent tracks (TTS / STT) that can
//    interrupt each other, rather than a single sequential line — a purely
//    linear diagram would misrepresent the actual real-time behavior.
//  - Flows 5 and 7 are cross-cutting (engagement tracking runs continuously
//    alongside Flow 3; failure recovery is referenced from Flows 2, 3, and 6)
//    so both render as wide bands rather than more steppers.

const artifactSwatch = { style: { background: 'var(--diag-blue-bg)', border: '1px solid var(--diag-blue-border)', borderLeft: '3px solid var(--diag-blue)' }, label: 'persistent artifact' };
const fragileSwatch = { style: { background: 'var(--diag-amber-bg)', border: '1px solid var(--diag-amber-border)' }, label: 'fragile / needs fallback' };

export default function InterviewAgentFlowDiagrams({ isDarkMode }: { isDarkMode: boolean }) {
  const vars = useDiagramVars(isDarkMode);

  return (
    <div style={vars} className="font-sans">
      <DiagramStyles />
      {/* Intro */}
      <p className="text-[11px] font-mono font-semibold tracking-widest mb-2" style={{ color: 'var(--diag-text-faint)' }}>
        SEVEN FLOWS, ONE AUTONOMOUS INTERVIEWER
      </p>
      <p className="text-sm mb-6 max-w-3xl" style={{ color: 'var(--diag-text-body)' }}>
        One interview plan, built once from the job description, is the artifact that Flow 4's follow-up
        questions and Flow 6's evaluation both reference back to. Joining the live call (Flow 2) is the
        single most fragile step in the system; failure recovery (Flow 7) exists because a silent failure
        mid-interview is worse than the failure itself.
      </p>
      <Legend extra={[artifactSwatch, fragileSwatch]} />

      {/* FLOW 1 — Job Description Analysis & Interview Scheduling */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 1" title="JOB DESCRIPTION ANALYSIS & INTERVIEW SCHEDULING" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Job description submitted for a role" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Agent analyzes JD" caption="required skills, seniority, role-specific topics" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="store"
            pill
            title="📄 Build interview plan"
            caption="topics to probe, question themes"
            detail="A persistent artifact, not a one-off summary — Flow 4's adaptive questioning and Flow 6's evaluation both reference this same plan directly."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Schedule interview with candidate" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Candidate confirms slot?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-amber)" />
            <Card kind="async" compact title="Offer alternative time slots" />
          </div>
          <Note text="↺ back to scheduling" color="var(--diag-amber)" />
          <Arrow color="var(--diag-blue)" label="yes" />
          <Card kind="outcome" pill center title="Interview scheduled, plan ready" caption="Flow 2" />
        </div>
      </section>

      {/* FLOW 2 — Autonomous Meeting Join (most fragile step) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 2" title="AUTONOMOUS MEETING JOIN — BROWSER AUTOMATION" color="var(--diag-amber)" />
        <Note text="⚠ the most fragile step in the system — depends on a UI the agent doesn't control and that can change without notice" color="var(--diag-amber)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="Scheduled interview time arrives" />
          <Arrow color="var(--diag-amber)" />
          <Card kind="process" center title="Playwright launches browser session on Azure VM" />
          <Arrow color="var(--diag-amber)" />
          <Card kind="process" center title="Navigate to video call link" />
          <Arrow color="var(--diag-amber)" />
          <Card kind="decision" center title="Successfully joined call?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no / UI changed / join failed →" color="var(--diag-amber)" />
          </div>
          <Card kind="decision" compact center title="Retries remaining?" />
          <Note text="↺ yes → relaunch browser session" color="var(--diag-amber)" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact title="Alert HR team: manual intervention needed" />
          </div>
          <Note text="→ Flow 7 · Failure Recovery" color="var(--diag-red)" />
          <Arrow color="var(--diag-blue)" label="joined successfully" />
          <Card kind="process" center title="Enable audio/video, confirm candidate present" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Live in call, ready for Flow 3" />
        </div>
      </section>

      {/* FLOW 3 — Real-Time Conversational Interview (barge-in, concurrent tracks) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 3" title="REAL-TIME CONVERSATIONAL INTERVIEW — WITH BARGE-IN" color="var(--diag-green)" />
        <Note text="🎙 STT runs concurrently with TTS output, not after it — these two tracks run at the same time" color="var(--diag-green)" />
        <div className="max-w-xl mx-auto mt-3">
          <Card kind="trigger" pill center title="Agent asks a question" caption="TTS" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] font-mono font-semibold tracking-widest mb-1" style={{ color: 'var(--diag-text-faint)' }}>
              TTS TRACK · AGENT SPEAKING
            </p>
            <Arrow color="var(--diag-green)" />
            <Card kind="success" center title="Agent's speech plays out" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] font-mono font-semibold tracking-widest mb-1" style={{ color: 'var(--diag-text-faint)' }}>
              STT TRACK · LISTENING (CONCURRENT)
            </p>
            <Arrow color="var(--diag-green)" />
            <Card kind="success" center title="Listen for candidate response" />
          </div>
        </div>
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-2">
          <Arrow color="var(--diag-green)" label="both tracks feed this check" />
          <Card kind="decision" center title="Candidate speaks before agent finishes?" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-2">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="yes — barge-in" color="var(--diag-green)" />
            <Card kind="success" compact center title="Stop agent's speech immediately" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="no" color="var(--diag-text-faint)" />
            <Card kind="process" compact center title="Wait for candidate to finish speaking" />
          </div>
        </div>
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-1">
          <Arrow color="var(--diag-blue)" label="both paths converge" />
          <Card kind="process" center title="Process candidate's response" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Proceed to Flow 4: adaptive follow-up" />
        </div>
      </section>

      {/* FLOW 4 — Adaptive Follow-Up Question Generation */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 4" title="ADAPTIVE FOLLOW-UP QUESTION GENERATION" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Candidate response processed" caption="Flow 3" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="LLM evaluates response against interview plan" caption="📄 Flow 1" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="decision"
            center
            title="Response depth sufficient?"
            detail="The agent doesn't move down a fixed question list — it checks whether the answer actually demonstrated the depth the plan called for, and probes further if not."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-2">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="shallow / vague" color="var(--diag-amber)" />
            <Card kind="async" compact center title="Generate probing follow-up question" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="sufficient" color="var(--diag-blue)" />
            <Card kind="decision" compact center title="More topics in plan?" />
            <div className="flex flex-col sm:flex-row gap-2 mt-1">
              <div className="flex flex-col items-center gap-1">
                <Note text="yes" color="var(--diag-blue)" />
                <Card kind="process" compact title="Move to next planned topic" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Note text="no" color="var(--diag-green)" />
                <Card kind="success" compact title="Wrap up interview" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-1">
          <Arrow color="var(--diag-blue)" label="probe or next topic" />
          <Card kind="outcome" pill center title="Agent speaks next question" caption="TTS · ↺ back to Flow 3" />
        </div>
        <p className="text-[11px] font-mono text-center mt-3" style={{ color: 'var(--diag-text-faint)' }}>
          wrap-up routes instead to → Flow 6 · Evaluation &amp; Feedback
        </p>
      </section>

      {/* FLOW 5 — Engagement Tracking (cross-cutting, alongside Flow 3) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 5" title="ENGAGEMENT TRACKING — EYE MOVEMENT" color="var(--diag-neutral)" />
        <Note text="⟳ runs continuously alongside Flow 3 — not a discrete step" color="var(--diag-neutral)" />
        <div
          className="rounded-xl border p-5 mt-3"
          style={{ borderColor: 'var(--diag-surface-border)' }}
        >
          <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
            <Card kind="trigger" pill center title="Live video feed during interview" />
            <Arrow color="var(--diag-neutral)" />
            <Card kind="platform" center title="Track eye movement continuously" />
            <Arrow color="var(--diag-neutral)" />
            <Card kind="platform" center title="Aggregate engagement signal over interview duration" />
            <Arrow color="var(--diag-neutral)" />
            <Card kind="store" pill title="Store engagement data alongside conversation transcript" />
            <Arrow color="var(--diag-neutral)" />
            <Card
              kind="outcome"
              pill
              center
              title="Available as input to Flow 6"
              detail="One input alongside the actual answers, not a standalone pass/fail check on its own."
            />
          </div>
        </div>
      </section>

      {/* FLOW 6 — Post-Interview Evaluation & Feedback Generation */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 6" title="POST-INTERVIEW EVALUATION & FEEDBACK GENERATION" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Interview concludes" caption="Flow 4 wrap-up" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Gather full transcript + engagement data" caption="Flow 5" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="process"
            center
            title="LLM evaluates candidate performance"
            caption="📄 against the interview plan · Flow 1"
            detail="Scored against the same plan built in Flow 1 — keeping the loop closed from 'what were we trying to assess' to 'how did the candidate do against that', rather than a generic disconnected summary."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Generate structured scoring per topic area" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="success" center title="Generate feedback summary for hiring team" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Feedback delivered to hiring team" />
        </div>
      </section>

      {/* FLOW 7 — Failure Recovery & Escalation (cross-cutting) */}
      <section>
        <SectionHeader kicker="FLOW 7" title="FAILURE RECOVERY & ESCALATION" color="var(--diag-amber)" />
        <Note text="⚠ cross-cutting — captures the failure paths referenced from Flows 2, 3, and 6" color="var(--diag-amber)" />
        <div
          className="rounded-xl border p-5 mt-3"
          style={{ borderColor: 'var(--diag-amber-border)', borderStyle: 'dashed', background: 'var(--diag-amber-bg)' }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--diag-text-strong)' }}>
            An interview that silently fails is worse than the failure itself
          </p>
          <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--diag-text-body)' }}>
            A fully autonomous system interacting with real candidates needs defined failure behavior at every
            stage — a silent mid-conversation failure with no candidate-facing message and no team notification
            damages candidate experience with no one aware it happened.
          </p>
          <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
            <Card kind="fail" pill center title="Failure detected" caption="join failure, STT/TTS outage, LLM timeout" />
            <Arrow color="var(--diag-amber)" />
            <Card kind="decision" center title="Failure type?" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-3">
            <div className="flex flex-col items-center gap-1.5">
              <Note text="join failure · Flow 2" color="var(--diag-amber)" />
              <Card kind="fail" compact center title="Alert HR: reschedule needed" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Note text="mid-interview technical" color="var(--diag-amber)" />
              <Card kind="fail" compact center title="Graceful message to candidate, end interview" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Note text="evaluation / feedback gen" color="var(--diag-amber)" />
              <Card kind="fail" compact center title="Flag for manual review by hiring team" />
            </div>
          </div>
          <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-2">
            <Arrow color="var(--diag-amber)" label="all three paths land here" />
            <Card kind="outcome-negative" pill center title="Incident logged" />
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-between gap-1 mt-8 pt-4 border-t text-[11px] font-mono"
           style={{ borderColor: 'var(--diag-surface-border)', color: 'var(--diag-text-faint)' }}>
        <span>AI Interview Agent · autonomous candidate screening</span>
        <span>1 interview plan · 2 concurrent tracks · 1 fragile step · 1 escalation layer</span>
      </div>
    </div>
  );
}
