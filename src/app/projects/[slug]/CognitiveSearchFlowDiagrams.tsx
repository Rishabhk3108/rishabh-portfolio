'use client';

import {
  Card, Arrow, SectionHeader, Note, Legend, DiagramStyles, useDiagramVars,
} from './diagram-kit';

// Native HTML/CSS recreation of the 7 process flows from the Cognitive Search
// (RAG + GraphRAG + OmniRAG) spec — no SVG, no images, same visual system as
// the other project diagrams, built on the shared ./diagram-kit primitives.
//
// Flow 1 (ingestion) is a background/batch process and is deliberately styled
// with the neutral "platform" kind rather than the blue "process" kind used by
// Flows 2-5 (live, user-triggered query flows) — per the spec's request that
// the two categories read as visually distinct.

const batchSwatch = { style: { background: 'var(--diag-surface)', border: '1px solid var(--diag-surface-border)', borderLeft: '3px solid var(--diag-neutral)' }, label: 'background / batch' };
const fallbackSwatch = { style: { background: 'var(--diag-amber-bg)', border: '1px solid var(--diag-amber-border)' }, label: 'graceful fallback' };

export default function CognitiveSearchFlowDiagrams({ isDarkMode }: { isDarkMode: boolean }) {
  const vars = useDiagramVars(isDarkMode);

  return (
    <div style={vars} className="font-sans">
      <DiagramStyles />
      {/* Intro */}
      <p className="text-[11px] font-mono font-semibold tracking-widest mb-2" style={{ color: 'var(--diag-text-faint)' }}>
        SEVEN PROCESS FLOWS, ONE PLATFORM
      </p>
      <p className="text-sm mb-6 max-w-3xl" style={{ color: 'var(--diag-text-body)' }}>
        Ingestion runs as a background batch process feeding two parallel indexes; every live query is routed —
        by an LLM, not a hardcoded rule — to whichever of vector search, graph traversal, or both actually
        answers it. Retrieval paths degrade gracefully rather than dead-ending when one comes up empty.
      </p>
      <Legend extra={[batchSwatch, fallbackSwatch]} />

      {/* FLOW 1 — Document Ingestion & Knowledge Graph Construction */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 1" title="DOCUMENT INGESTION & KNOWLEDGE GRAPH CONSTRUCTION" color="var(--diag-neutral)" />
        <Note text="⟳ background / batch process — everything else depends on documents being indexed &amp; graphed first" color="var(--diag-neutral)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-3">
          <Card kind="trigger" pill center title="New document(s) enter the system" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="platform" center title="Extract text, tables, and metadata" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] font-mono font-semibold tracking-widest mb-1" style={{ color: 'var(--diag-text-faint)' }}>
              VECTOR PATH
            </p>
            <Arrow color="var(--diag-neutral)" />
            <Card kind="platform" center title="Generate embeddings for vector search" />
            <Arrow color="var(--diag-neutral)" />
            <Card kind="store" pill title="Index into Azure AI Search" />
            <Arrow color="var(--diag-neutral)" />
            <Card kind="outcome" pill center title="Document available for vector search" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] font-mono font-semibold tracking-widest mb-1" style={{ color: 'var(--diag-text-faint)' }}>
              GRAPH PATH
            </p>
            <Arrow color="var(--diag-neutral)" />
            <Card kind="platform" center title="Extract entities & relationships" caption="NLP / LLM" />
            <Arrow color="var(--diag-neutral)" />
            <Card
              kind="decision"
              center
              title="Entities already exist in graph?"
              detail="The critical step for graph quality — without merging, the same real-world entity referenced across documents would fragment into duplicate nodes, breaking the multi-hop queries GraphRAG depends on."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 w-full">
              <div className="flex flex-col items-center gap-1.5">
                <Note text="yes" color="var(--diag-blue)" />
                <Card kind="platform" compact title="Merge/update existing nodes & edges" />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Note text="no" color="var(--diag-text-faint)" />
                <Card kind="platform" compact title="Create new nodes & relationships" />
              </div>
            </div>
            <Arrow color="var(--diag-neutral)" label="both branches land here" />
            <Card kind="store" pill title="Write to Neo4j Knowledge Graph" />
            <Arrow color="var(--diag-neutral)" />
            <Card kind="outcome" pill center title="Entities available for graph traversal" />
          </div>
        </div>
      </section>

      {/* FLOW 2 — Query Intent Understanding & Retrieval Routing (decision hub) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 2" title="QUERY ROUTING — THE OMNIRAG DECISION" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="User submits a query" caption="natural-language or structured" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="LLM-driven query understanding" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="decision"
            center
            title="Query type?"
            detail={'This is the "Omni" in OmniRAG — the system doesn’t force every query through the same retrieval mechanism.'}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
          <div className="flex flex-col items-center gap-1.5">
            <Note text="simple factual / semantic similarity" color="var(--diag-blue)" />
            <Card kind="store" compact center title="Route to vector search only" />
            <Note text="→ Flow 3 · Vector Retrieval" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="relational / multi-hop" color="var(--diag-green)" />
            <Card kind="success" compact center title="Route to graph traversal only" />
            <Note text="→ Flow 4 · GraphRAG Retrieval" color="var(--diag-green)" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Note text="ambiguous / needs both" color="var(--diag-amber)" />
            <Card kind="async" compact center title="Route to hybrid (OmniRAG) path" />
            <Note text="→ both Flow 3 and Flow 4, fused in Flow 5" color="var(--diag-amber)" />
          </div>
        </div>
      </section>

      {/* FLOW 3 — Vector Search Retrieval Path */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 3" title="VECTOR SEARCH RETRIEVAL PATH" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Query routed to vector search" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Embed the query" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Search Azure AI Search index for nearest neighbors" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Rank results by similarity score" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="decision" center title="Results above relevance threshold?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-amber)" />
            <Card
              kind="async"
              compact
              title="Flag: insufficient vector results"
              detail="A graceful fallback, not a dead end — returning low-confidence matches would degrade answer quality, so the system flags this rather than silently passing weak matches downstream."
            />
          </div>
          <Arrow color="var(--diag-blue)" label="yes, or flagged and continuing anyway" />
          <Card kind="outcome" pill center title="Return top-k relevant chunks" />
        </div>
      </section>

      {/* FLOW 4 — GraphRAG Retrieval Path (Multi-Hop Traversal) */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 4" title="GRAPHRAG RETRIEVAL PATH — MULTI-HOP TRAVERSAL" color="var(--diag-green)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Query routed to graph traversal" />
          <Arrow color="var(--diag-green)" />
          <Card kind="process" center title="Identify starting entities in the query" />
          <Arrow color="var(--diag-green)" />
          <Card kind="decision" center title="Entities found in graph?" />
          <div className="flex flex-wrap justify-center items-center gap-3 my-2">
            <Note text="no →" color="var(--diag-amber)" />
            <Card kind="async" compact title="No graph match, fall back to vector path" />
          </div>
          <Arrow color="var(--diag-green)" label="yes" />
          <Card kind="success" center title="Traverse relationships" caption="1-hop, 2-hop, N-hop as needed" />
          <Arrow color="var(--diag-green)" />
          <Card
            kind="decision"
            center
            title="Sufficient depth, or traversal limit hit?"
            detail="The depth limit is deliberate — an unbounded traversal on a large graph can explode combinatorially, so there has to be a defined stopping condition."
          />
          <Note text="↺ need more depth → keep traversing" color="var(--diag-green)" />
          <Arrow color="var(--diag-green)" label="done" />
          <Card kind="store" pill title="Collect subgraph: nodes + relationships traversed" />
          <Arrow color="var(--diag-green)" />
          <Card kind="outcome" pill center title="Return structured relationship context" />
        </div>
      </section>

      {/* FLOW 5 — Hybrid Fusion & Response Generation */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 5" title="HYBRID FUSION & RESPONSE GENERATION" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          <Card kind="store" pill center title="Vector search results" caption="Flow 3" />
          <Card kind="store" pill center title="Graph traversal results" caption="Flow 4" />
        </div>
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1 mt-1">
          <Arrow color="var(--diag-blue)" label="both feed into fusion" />
          <Card kind="process" center title="Fuse vector chunks + graph relationship context" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Deduplicate / resolve overlaps" caption="overlapping info from both paths" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Assemble final LLM context" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="process" center title="Send query + context to LLM" />
          <Arrow color="var(--diag-blue)" />
          <Card kind="success" center title="LLM generates natural-language answer" />
          <Arrow color="var(--diag-blue)" />
          <Card
            kind="process"
            center
            title="Attach source citations"
            caption="which docs/entities were used"
            detail="An ungrounded or unverifiable answer is a liability, not just an inconvenience, for a system meant to answer questions about real business documents."
          />
          <Arrow color="var(--diag-blue)" />
          <Card kind="outcome" pill center title="Answer returned to user" />
        </div>
      </section>

      {/* FLOW 6 — Embedded Search via Salesforce / MuleSoft */}
      <section className="mb-10">
        <SectionHeader kicker="FLOW 6" title="EMBEDDED SEARCH — SALESFORCE / MULESOFT INTEGRATION" color="var(--diag-neutral)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="User searches from within Salesforce" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="platform" center title="MuleSoft routes request to search platform" />
          <Arrow color="var(--diag-neutral)" dashed />
          <Card kind="async" center title="Enters main query flow" caption="Flow 2 onward" />
          <Arrow color="var(--diag-neutral)" dashed />
          <Card kind="async" center title="Answer generated" caption="Flow 5" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="platform" center title="MuleSoft routes response back to Salesforce" />
          <Arrow color="var(--diag-neutral)" />
          <Card kind="outcome" pill center title="Answer displayed inline in Salesforce UI" />
        </div>
        <Card
          kind="async"
          center
          title="Front-end agnostic by design"
          detail="Flows 1-5 are the reusable core; this integration is just one possible entry point into that core, not a special case baked into the retrieval logic itself. Other front-ends could plug in the same way."
        />
      </section>

      {/* FLOW 7 — Monitoring & Experiment Tracking */}
      <section>
        <SectionHeader kicker="FLOW 7" title="MONITORING & EXPERIMENT TRACKING" color="var(--diag-neutral)" />
        <div className="max-w-xl mx-auto flex flex-col items-center gap-1">
          <Card kind="trigger" pill center title="Every query processed" caption="Flows 2–5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] font-mono font-semibold tracking-widest mb-1" style={{ color: 'var(--diag-text-faint)' }}>
              OPERATIONAL HEALTH
            </p>
            <Arrow color="var(--diag-neutral)" />
            <Card kind="platform" center title="Log latency, retrieval path, errors" caption="Azure App Insights" />
            <Arrow color="var(--diag-neutral)" />
            <Card kind="outcome" pill center title="Ops dashboard: health, latency, error rates" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] font-mono font-semibold tracking-widest mb-1" style={{ color: 'var(--diag-text-faint)' }}>
              RETRIEVAL QUALITY
            </p>
            <Arrow color="var(--diag-neutral)" />
            <Card kind="platform" center title="Log retrieval quality metrics" caption="Databricks MLflow" />
            <Arrow color="var(--diag-neutral)" />
            <Card kind="outcome" pill center title="Quality dashboard: accuracy trends, experiments" />
            <Arrow color="var(--diag-neutral)" />
            <Card kind="decision" center title="Retrieval quality degrading?" />
            <div className="flex flex-wrap justify-center items-center gap-3 my-2">
              <Note text="yes →" color="var(--diag-amber)" />
              <Card kind="async" compact title="Investigate: re-embedding, graph quality, routing" />
            </div>
            <Note text="no → continue normal operation" color="var(--diag-blue)" />
          </div>
        </div>
        <p className="text-[11px] font-mono text-center mt-4" style={{ color: 'var(--diag-text-faint)' }}>
          operational health and retrieval quality are different questions, tracked by different tools
        </p>
      </section>

      <div className="flex flex-col sm:flex-row justify-between gap-1 mt-8 pt-4 border-t text-[11px] font-mono"
           style={{ borderColor: 'var(--diag-surface-border)', color: 'var(--diag-text-faint)' }}>
        <span>AI-Powered Cognitive Search System · RAG + GraphRAG + OmniRAG</span>
        <span>7 flows · 1 ingestion pipeline · 3 retrieval paths · 1 integration surface</span>
      </div>
    </div>
  );
}
