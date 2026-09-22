'use client';

import {
  Card, Arrow, SectionHeader, Note, Legend, DiagramStyles, useDiagramVars,
} from './diagram-kit';

// Native HTML/CSS recreation of the 7 process flows from the Enterprise
// Enrollment Portal spec — no SVG, no images, same visual system and
// hover/flow-animation behavior as the CRM platform's diagram, built on
// the shared ./diagram-kit primitives.

const highRiskSwatch = { style: { background: 'var(--diag-amber-bg)', border: '1px solid var(--diag-amber-border)' }, label: 'compliance-critical' };

export default function EnrollmentFlowDiagrams({ isDarkMode }: { isDarkMode: boolean }) {
  const vars = useDiagramVars(isDarkMode);

  return (
    <div style={vars} className="font-sans">
      <DiagramStyles />
      {/* Intro */}
      <p className="text-[11px] font-mono font-semibold tracking-widest mb-2" style={{ color: 'var(--diag-text-faint)' }}>
        SEVEN PROCESS FLOWS, ONE PLATFORM
      </p>
      <p className="text-sm mb-6 max-w-3xl" style={{ color: 'var(--diag-text-body)' }}>
        Org onboarding establishes the tenant context every other flow depends on. Payroll and disaster recovery
        are the two compliance-critical flows — flagged below, since payroll and enrollment errors carry real
        financial and regulatory consequences.
      </p>
      <Legend extra={[highRiskSwatch]} />

      {/* FLOW 1 — Org Onboarding & Admin Auth */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 1" title="ORG ONBOARDING & ADMIN AUTHENTICATION" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Org admin logs in to the portal" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Valid credentials?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact title="Reject login, show error" />
          </div>
          <Arrow color="var(--diag-blue)" label="yes" />
          <Card
            kind="process"
            center
            title="Resolve organization context"
            caption="which company is this admin managing"
            detail="Every downstream action — enrolling an employee, running payroll, viewing reports — happens within this resolved org context."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Admin role permits requested action?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact title="Return 403 Forbidden" />
          </div>
          <Arrow color="var(--diag-blue)" label="yes" />
          <Card kind="process" center title="Attach org context to session / request" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Admin proceeds to enrollment or payroll dashboard" />
        </div>
        <Card
          kind="async"
          center
          title="Foundational flow"
          detail="An admin at Company A should never see or act on Company B's data — that separation is enforced here, not left to be checked later. Flows 2 and 3 both depend on this resolved org context."
        />
      </section>

      {/* FLOW 2 — Employee Group Insurance Enrollment */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 2" title="EMPLOYEE GROUP INSURANCE ENROLLMENT" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Employee starts enrollment" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Employee eligible?" caption="active, within enrollment window" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact title="Enrollment blocked, show reason" />
          </div>
          <Arrow color="var(--diag-blue)" label="yes" />
          <Card kind="process" center title="Employee browses & selects insurance plan(s)" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Adding dependents?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 w-full">
            <div className="flex flex-col items-center gap-1.5">
              <Note text="yes" color="var(--diag-blue)" />
              <Card kind="process" compact title="Collect dependent information" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Note text="no" color="var(--diag-text-faint)" />
              <Card kind="process" compact title="skip" />
            </div>
          </div>
          <Arrow color="var(--diag-blue)" label="both branches land here" />
          <Card kind="process" center title="Calculate coverage & premium cost" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Employee reviews selections & cost" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Employee confirms?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="↺ no, edit → back to plan selection" color="var(--diag-amber)" />
          </div>
          <Arrow color="var(--diag-blue)" label="yes" />
          <Card kind="store" pill title="Save enrollment record → PostgreSQL" />
          <Arrow color="var(--diag-amber)" dashed />
          <Card
            kind="async"
            center
            title="Flag payroll system: new deduction to apply"
            detail="Insurance and payroll are two connected needs that share data by design — confirming enrollment doesn't just save a record, it explicitly notifies the payroll flow (Flow 3) that a new deduction needs to be applied."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Send confirmation to employee" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Enrollment complete" />
        </div>
      </section>

      {/* FLOW 3 — Payroll Cycle Run (compliance-critical) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 3" title="PAYROLL CYCLE RUN" color="var(--diag-amber)" />
        <Note text="⚠ compliance-critical — payroll errors carry real financial and regulatory consequences" color="var(--diag-amber)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="Admin triggers payroll run" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="process"
            center
            title="Lock payroll period"
            caption="prevent concurrent edits"
            detail="Payroll is exactly the kind of compliance-sensitive workload where a race condition could mean real financial errors — the period is locked for the duration of the run."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Gather employee data" caption="base pay, hours, insurance deductions, taxes" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Calculate net pay per employee" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Validation checks pass?" caption="no negative pay, no missing tax info, etc." />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact title="Flag errors, halt run for review" />
          </div>
          <Note text="↺ admin reviews and corrects errors → back to gather employee data" color="var(--diag-red)" />
          <Arrow color="var(--diag-blue)" label="yes" />
          <Card kind="process" center title="Generate payslips" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="store" pill title="Write payroll records → PostgreSQL" />
          <Arrow color="var(--diag-amber)" dashed />
          <Card
            kind="async"
            center
            title="Trigger backup checkpoint"
            caption="disaster recovery"
            detail="A backup checkpoint is explicitly triggered right after writing payroll records, given how costly it would be to lose this specific data. See Flow 5 for the full backup/restore cycle."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Initiate payment disbursement" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Notify employees: payslip available" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Unlock payroll period" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Payroll run complete" />
        </div>
      </section>

      {/* FLOW 4 — Multi-Region Request Routing & Autoscaling */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 4" title="MULTI-REGION REQUEST ROUTING & AUTOSCALING" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="User request arrives" caption="any region" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Routed to nearest Azure region" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Current container load in that region?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 w-full items-start">
            <div className="flex flex-col items-center gap-1.5">
              <Note text="under threshold" color="var(--diag-blue)" />
              <Card kind="store" compact center title="Served by existing running containers" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Note text="over threshold" color="var(--diag-amber)" />
              <Card kind="decision" compact center title="Below 400-container ceiling?" />
              <div className="flex flex-col items-center gap-1.5 mt-1">
                <Note text="yes" color="var(--diag-blue)" />
                <Card kind="process" compact title="Azure Container Apps spins up new containers" />
                <Arrow color="var(--diag-blue)" />
                <Card kind="store" compact title="Served by newly scaled containers" />
              </div>
              <div className="flex flex-col items-center gap-1.5 mt-2">
                <Note text="at ceiling" color="var(--diag-red)" />
                <Card kind="fail" compact center title="Request queued / graceful degradation" />
              </div>
            </div>
          </div>
          <Arrow color="var(--diag-blue)" label="all paths return a response" />
          <Card kind="outcome" pill center title="Response returned" caption="queued path: with added latency" />
        </div>
        <Card
          kind="async"
          center
          title="400-container ceiling"
          detail="An architected ceiling, not a number expected to be hit under normal, steady-state load — headroom for spikes like the start of an open enrollment period, when a large share of an org's employees might log in within the same hour."
        />
      </section>

      {/* FLOW 5 — Disaster Recovery (compliance-critical) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 5" title="DISASTER RECOVERY — BACKUP & RESTORE" color="var(--diag-amber)" />
        <Note text="⚠ compliance-critical — geo-redundant backups protect payroll & enrollment data" color="var(--diag-amber)" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3">
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] font-mono font-semibold tracking-widest mb-1" style={{ color: 'var(--diag-text-faint)' }}>
              ROUTINE CYCLE · RUNS CONTINUOUSLY
            </p>
            <Card kind="async" pill center title="Scheduled backup trigger" caption="automated" />
            <Arrow color="var(--diag-amber)" dashed />
            <Card kind="process" center title="Take PostgreSQL snapshot" />
            <Arrow color="var(--diag-blue)" />
            <Card kind="decision" center title="Snapshot integrity check" />
            <div className="flex flex-wrap justify-center items-center gap-3 my-2">
              <Note text="fails →" color="var(--diag-red)" />
              <Card kind="fail" compact title="Retry snapshot, alert ops if repeated failure" />
            </div>
            <Arrow color="var(--diag-blue)" label="passes" />
            <Card
              kind="store"
              pill
              title="Store snapshot in geo-redundant storage"
              detail="Backups being geo-redundant matters specifically because the platform is already multi-region — a backup in only one region would undermine that reliability."
            />
            <Arrow color="var(--diag-blue)" />
            <Card kind="process" center title="Prune expired backups" caption="per retention policy" />
            <Arrow color="var(--diag-blue)" />
            <Card kind="outcome" pill center title="Backup available for restore if needed" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] font-mono font-semibold tracking-widest mb-1" style={{ color: 'var(--diag-red)' }}>
              INCIDENT RESPONSE · ONLY WHEN SOMETHING GOES WRONG
            </p>
            <Card kind="fail" pill center title="Data loss / corruption incident detected" />
            <Arrow color="var(--diag-red)" />
            <Card kind="process" center title="Select most recent valid snapshot" />
            <Arrow color="var(--diag-blue)" />
            <Card kind="process" center title="Restore to new PostgreSQL instance" />
            <Arrow color="var(--diag-blue)" />
            <Card kind="decision" center title="Restored data validated?" />
            <div className="flex flex-wrap justify-center items-center gap-3 my-2">
              <Note text="↺ no → select earlier snapshot, retry restore" color="var(--diag-amber)" />
            </div>
            <Arrow color="var(--diag-blue)" label="yes" />
            <Card kind="process" center title="Cut traffic over to restored instance" />
            <Arrow color="var(--diag-blue)" />
            <Card kind="outcome" pill center title="Service restored" />
          </div>
        </div>
      </section>

      {/* FLOW 6 — Mobile App Data Sync */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 6" title="MOBILE APP DATA SYNC (REACT NATIVE)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="User opens mobile app" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Network available?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-amber)" />
            <Card kind="async" compact title="Show cached data, offline mode" />
          </div>
          <Note text="↺ retry sync when connection returns" color="var(--diag-amber)" />
          <Arrow color="var(--diag-blue)" label="yes" />
          <Card kind="process" center title="Authenticate" caption="see Flow 1 pattern" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Sync latest enrollment & payroll data" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Local changes conflict with server state?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="yes →" color="var(--diag-amber)" />
            <Card kind="process" compact title="Resolve conflict" caption="server wins, or prompt user" />
          </div>
          <Arrow color="var(--diag-blue)" label="both branches land here" />
          <Card kind="process" center title="Update local cache" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Current data displayed to user" />
        </div>
      </section>

      {/* FLOW 7 — CI/CD Deployment */}
      <section>
        <SectionHeader kicker="FLOW 7" title="CI/CD DEPLOYMENT TO AZURE CONTAINER APPS" color="var(--diag-neutral)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="platform" pill center title="Developer pushes code" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="platform" center title="CI pipeline triggered → run automated tests" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="decision" center title="Pass?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact title="Build fails, developer notified" />
          </div>
          <Arrow color="var(--diag-neutral)" label="yes" />
          <Card kind="platform" center title="Build Docker image → push to container registry" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="platform" center title="Deploy to Region 1" caption="canary" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="decision" center title="Healthy?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact title="Rollback Region 1" />
          </div>
          <Arrow color="var(--diag-neutral)" label="yes" />
          <Card kind="platform" center title="Roll out to remaining regions" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="decision" center title="All regions healthy?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-red)" />
            <Card kind="fail" compact title="Rollback affected regions" />
          </div>
          <Arrow color="var(--diag-neutral)" label="yes" />
          <Card kind="outcome" pill center title="New version live across all regions" />
        </div>
        <Card
          kind="outcome-negative"
          center
          title="Ops team alerted"
          detail="Given the platform runs across multiple geographic regions, deployment follows a canary pattern — verify one region before proceeding — so a bad deploy's blast radius is a single region, not the whole platform. Both rollback paths above alert ops."
        />
      </section>

      <div className="flex flex-col sm:flex-row justify-between gap-1 mt-8 pt-4 border-t text-[11px] font-mono"
           style={{ borderColor: 'var(--diag-surface-border)', color: 'var(--diag-text-faint)' }}>
        <span>Enterprise Enrollment Portal · insurance &amp; payroll platform</span>
        <span>7 flows · 2 compliance-critical · multi-region deployment</span>
      </div>
    </div>
  );
}
