'use client';

import {
  Card, Arrow, SectionHeader, Note, Legend, DiagramStyles, useDiagramVars,
} from './diagram-kit';

// Native HTML/CSS recreation of the 7 process flows from the Face Recognition
// Attendance spec — no SVG, no images, same visual system as the other
// project diagrams, built on the shared ./diagram-kit primitives.
//
// This spec shipped with an explicit confidence gradient, since several flows
// were reasonable assumptions rather than confirmed detail. Product
// screenshots added to this project's gallery since then have resolved two
// of them:
//  - Flow 3's ambiguous-match handling is now confirmed — the screenshots
//    show the exact "two close matches, we'd rather ask again" UI.
//  - Flow 4's manual fallback is now confirmed — the screenshots show the
//    employee-ID entry path after repeated face-check failures.
//  - Flow 1 (enrollment) remains unconfirmed — no enrollment/registration
//    screen exists in the gallery — so it still renders faded inside a
//    dashed border.
//  - Flow 5 remains the most well-evidenced, and is now visually confirmed
//    too (the actual "Timesheets vs. check-ins" review screen).

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

const evidencedSwatch = { style: { background: 'var(--diag-green-bg)', border: '1px solid var(--diag-green-border)' }, label: 'well-evidenced' };
const assumptionSwatch = { style: { background: 'transparent', border: '1px dashed var(--diag-text-faint)' }, label: 'standard assumption / unconfirmed' };

export default function FaceAttendanceFlowDiagrams({ isDarkMode }: { isDarkMode: boolean }) {
  const vars = useDiagramVars(isDarkMode);

  return (
    <div style={vars} className="font-sans">
      <DiagramStyles />
      {/* Intro */}
      <p className="text-[11px] font-mono font-semibold tracking-widest mb-2" style={{ color: 'var(--diag-text-faint)' }}>
        SEVEN FLOWS, ONE CONFIDENCE GRADIENT
      </p>
      <p className="text-sm mb-6 max-w-3xl" style={{ color: 'var(--diag-text-body)' }}>
        No accuracy, adoption, or performance figures exist for this project — none are asserted below.
        Enrollment remains a standard, necessary assumption never explicitly described in the original brief.
        Ambiguous-match handling, manual fallback, and Time Master's cross-validation were all reasonable
        assumptions too — until product screenshots confirmed all three actually work this way.
      </p>
      <Legend extra={[evidencedSwatch, assumptionSwatch]} />

      {/* FLOW 1 — Employee Enrollment (speculative) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 1" title="EMPLOYEE ENROLLMENT — FACE REGISTRATION" />
        <FlagBadge text="⚠ STANDARD ASSUMPTION — NOT EXPLICITLY DESCRIBED, VERIFY BEFORE PUBLISHING" color="var(--diag-text-faint)" />
        <div
          className="rounded-xl border p-5 mt-3 opacity-70"
          style={{ borderColor: 'var(--diag-text-faint)', borderStyle: 'dashed' }}
        >
          <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
            <Card kind="trigger" pill center title="New employee onboarded" />
            <Arrow color="var(--diag-neutral)" dashed />
            <Card kind="platform" center title="Capture reference face images" caption="multiple angles" />
            <Arrow color="var(--diag-neutral)" dashed />
            <Card kind="decision" center title="Image quality sufficient?" />
            <div className="flex flex-wrap justify-center items-center gap-3 my-2">
              <Note text="no →" color="var(--diag-neutral)" />
              <Card kind="platform" compact title="Request recapture" caption="better lighting/angle" />
            </div>
            <Note text="↺ back to capture" color="var(--diag-neutral)" />
            <Arrow color="var(--diag-neutral)" dashed label="yes" />
            <Card kind="platform" center title="Extract facial feature encoding" />
            <Arrow color="var(--diag-neutral)" dashed />
            <Card kind="platform" center title="Store encoding linked to employee record" caption="SQL Server" />
            <Arrow color="var(--diag-neutral)" dashed />
            <Card kind="outcome" pill center title="Employee enrolled, ready for Flow 2: attendance capture" />
          </div>
        </div>
      </section>

      {/* FLOW 2 — Attendance Capture */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 2" title="ATTENDANCE CAPTURE — CHECK-IN / CHECK-OUT" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Employee approaches check-in/check-out point" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Capture live face image" />
          <Arrow color="var(--diag-blue)" label="→ Flow 3: Face Recognition Matching" />
          <Card
            kind="decision"
            center
            title="Match result?"
            detail="The same capture-and-match logic handles both check-in and check-out — no separate recognition pipelines, just a different event type logged depending on context."
          />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="not verified →" color="var(--diag-amber)" />
            <Card kind="async" compact title="→ Flow 4: Recognition Failure Handling" />
          </div>
          <Arrow color="var(--diag-blue)" label="verified" />
          <Card kind="store" pill title="Log attendance event" caption="check-in or check-out, timestamp · SQL Server" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Confirmation shown to employee" />
        </div>
      </section>

      {/* FLOW 3 — Face Recognition Matching & Verification (inferred logic) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 3" title="FACE RECOGNITION MATCHING & VERIFICATION" color="var(--diag-green)" />
        <Note text="✓ confirmed by product screenshots — 'two close matches, we'd rather ask again' is the real ambiguous-match UI" color="var(--diag-green)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="Live face image captured" caption="Flow 2" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Extract facial feature encoding" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Compare against enrolled employee encodings" />
          <Arrow color="var(--diag-green)" />
          <Card
            kind="decision"
            center
            title="Match confidence above threshold?"
            detail="An ambiguous result — multiple employees scoring similarly close — is treated as a non-match rather than guessing the closest one. Attributing a check-in to the wrong employee is worse than requiring a retry."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-3">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="yes, single clear match" color="var(--diag-blue)" />
            <Card kind="outcome" pill compact center title="Verified: return matched employee ID" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="no match above threshold" color="var(--diag-red)" />
            <Card kind="outcome-negative" pill compact center title="Not verified" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="multiple close matches" color="var(--diag-red)" />
            <Card kind="outcome-negative" pill compact center title="Ambiguous: treated as not verified" />
          </div>
        </div>
      </section>

      {/* FLOW 4 — Recognition Failure & Fallback Handling */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 4" title="RECOGNITION FAILURE & FALLBACK HANDLING" />
        <Note text="✓ confirmed by product screenshots — employee-ID check-in fires after repeated face-check failures, marked for HR to see" color="var(--diag-green)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="Recognition not verified" caption="Flow 3" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Retry attempts remaining?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="yes →" color="var(--diag-blue)" />
            <Card kind="process" compact title="Prompt employee to reposition, recapture" />
          </div>
          <Note text="↺ back to Flow 3" color="var(--diag-blue)" />
          <Arrow color="var(--diag-blue)" label="no, retries exhausted" />
          <Card
            kind="process"
            center
            title="Fall back to manual check-in"
            caption="e.g., employee ID entry"
            detail="A face-recognition-only system with no fallback would lock out anyone the camera can't currently recognize — poor lighting, a new haircut, a face mask."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="store" pill title="Log attendance event with 'manual check-in' flag" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Attendance recorded, flagged for HR review" />
        </div>
      </section>

      {/* FLOW 5 — Time Master (most well-evidenced) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 5" title="TIME MASTER — HOURS LOGGING & CROSS-VALIDATION" color="var(--diag-green)" />
        <FlagBadge text="✓ MOST WELL-EVIDENCED FLOW — described in the original brief and confirmed by product screenshots" color="var(--diag-green)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="Attendance events logged" caption="Flow 2" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Calculate working hours from check-in/check-out pairs" />
          <Arrow color="var(--diag-green)" />
          <Card kind="decision" center title="Self-reported hours also submitted?" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mt-2">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="no" color="var(--diag-text-faint)" />
            <Card kind="process" compact center title="Use attendance-derived hours directly" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="yes" color="var(--diag-green)" />
            <Card
              kind="success"
              compact
              center
              title="Cross-validate against attendance events"
              detail="The system's core differentiator: working hours aren't trusted at face value if self-reported — they're reconciled against the biometrically-verified attendance events."
            />
            <Card kind="decision" compact center title="Hours match within tolerance?" />
            <div className="flex flex-col sm:flex-row gap-2 mt-1">
              <div className="flex flex-col items-center gap-1">
                <Note text="yes" color="var(--diag-green)" />
                <Card kind="success" compact title="Approve hours" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Note text="no, discrepancy" color="var(--diag-amber)" />
                <Card kind="async" compact title="Flag for manager review" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-1">
          <Arrow color="var(--diag-green)" label="all three paths land here" />
          <Card kind="outcome" pill center title="Final hours recorded" />
        </div>
      </section>

      {/* FLOW 6 — Mobile / Web Data Access */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 6" title="MOBILE / WEB DATA ACCESS" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Employee or admin opens web portal or mobile app" caption="React · React Native" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Authenticate" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Request attendance/hours data from FastAPI backend" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="store"
            pill
            title="Backend queries SQL Server"
            detail="Both the web portal and mobile app go through the same backend and data layer — one source of truth regardless of which client is used."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Return data to client" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Attendance history / hours displayed" />
        </div>
      </section>

      {/* FLOW 7 — HR/Admin Reporting & Review */}
      <section>
        <SectionHeader kicker="FLOW 7" title="HR/ADMIN REPORTING & REVIEW" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="HR/admin opens reporting view" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Select scope" caption="individual, team, organization-wide" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Pull attendance + hours data for selected scope" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="decision"
            center
            title="Any flagged items?"
            caption="manual overrides, discrepancies"
            detail="Given the system runs organization-wide, HR needs to review the exceptions specifically — manual overrides from Flow 4 and hours discrepancies from Flow 5 — since those are the cases most likely to need a human decision."
          />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="yes →" color="var(--diag-amber)" />
            <Card kind="async" compact title="Highlight flagged items for review" />
          </div>
          <Arrow color="var(--diag-blue)" label="no, or flagged and continuing" />
          <Card kind="process" center title="Standard report view" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Report generated" />
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-between gap-1 mt-8 pt-4 border-t text-[11px] font-mono"
           style={{ borderColor: 'var(--diag-surface-border)', color: 'var(--diag-text-faint)' }}>
        <span>Face Recognition Attendance & Time Management System</span>
        <span>1 unconfirmed assumption · 3 confirmed by screenshots</span>
      </div>
    </div>
  );
}
