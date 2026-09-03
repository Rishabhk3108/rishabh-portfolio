'use client';

// Inline, theme-aware recreation of the "CRM Unified Flow" architecture diagram.
// Rendered as real SVG in the DOM (not an <img>) so it reads sharply at any
// zoom level and repaints instantly when the site's light/dark toggle flips —
// every color below is a CSS custom property, swapped per theme in one place.

const LIGHT_VARS: Record<string, string> = {
  '--diag-text-strong': '#17181a',
  '--diag-text-body': '#55575b',
  '--diag-text-muted': '#6b6d70',
  '--diag-text-faint': '#7a7c80',
  '--diag-text-footnote': '#8a8c90',
  '--diag-border': '#dcd9d2',
  '--diag-surface': '#ffffff',
  '--diag-soft-bg': '#fbfcfe',
  '--diag-blue': '#2d5aa8',
  '--diag-blue-bg': '#e7edf7',
  '--diag-blue-border': '#cfd6e4',
  '--diag-decision-fill': '#dfe6f2',
  '--diag-queue-fill': '#f7ecd9',
  '--diag-amber': '#a8641c',
  '--diag-amber-strong': '#8a5417',
  '--diag-amber-bg': '#fdf8f1',
  '--diag-amber-border': '#e5cba6',
  '--diag-red': '#b03636',
  '--diag-red-strong': '#8a2b2b',
  '--diag-red-bg': '#fbeeee',
  '--diag-red-border': '#e2bcbc',
  '--diag-green': '#1c7a5e',
  '--diag-green-bg': '#f6fbf9',
  '--diag-green-border': '#b6dbcd',
  '--diag-neutral': '#5c5f63',
  '--diag-neutral-faint': '#9a9da1',
  '--diag-platform-bg': '#f4f4f2',
  '--diag-platform-border': '#c9ccd1',
  '--diag-async-bg': '#fffdfa',
};

const DARK_VARS: Record<string, string> = {
  '--diag-text-strong': '#f2f0ec',
  '--diag-text-body': '#c9c7c2',
  '--diag-text-muted': '#a3a19c',
  '--diag-text-faint': '#8f8d89',
  '--diag-text-footnote': '#7d7b77',
  '--diag-border': '#3a3934',
  '--diag-surface': '#262522',
  '--diag-soft-bg': '#20262f',
  '--diag-blue': '#6fa0e8',
  '--diag-blue-bg': '#1c2c47',
  '--diag-blue-border': '#35507e',
  '--diag-decision-fill': '#24344f',
  '--diag-queue-fill': '#3d3116',
  '--diag-amber': '#e0a052',
  '--diag-amber-strong': '#f0b56a',
  '--diag-amber-bg': '#332916',
  '--diag-amber-border': '#5c4626',
  '--diag-red': '#e2726f',
  '--diag-red-strong': '#f0a29e',
  '--diag-red-bg': '#3a2222',
  '--diag-red-border': '#6b3535',
  '--diag-green': '#4bbf98',
  '--diag-green-bg': '#16302a',
  '--diag-green-border': '#2f5c4d',
  '--diag-neutral': '#a3a19c',
  '--diag-neutral-faint': '#6f6d68',
  '--diag-platform-bg': '#232220',
  '--diag-platform-border': '#3a3934',
  '--diag-async-bg': '#201d16',
};

const DIAGRAM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2040 3278" font-family="'IBM Plex Sans',system-ui,sans-serif" style="display:block;width:100%;height:auto;min-width:1360px">
<text x="64" y="86" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="12" font-weight="600" fill="var(--diag-text-faint)" letter-spacing="1.7">UNIFIED END-TO-END PROCESS FLOW</text>
<text x="64" y="132" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="42" font-weight="600" fill="var(--diag-text-strong)" letter-spacing="-0.8">AI-Powered Enterprise CRM Platform</text>
<text x="64" y="168" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="16" font-weight="400" fill="var(--diag-text-body)">Every journey — lead creation, natural-language query, account summary, search, inbound communication, deployment — drawn as one connected flow.</text>
<text x="64" y="192" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="16" font-weight="400" fill="var(--diag-text-body)">All entry points converge on a single auth gate; all asynchronous work converges on a single Kafka → Celery backbone.</text>
<rect x="1430" y="70" width="34" height="16" rx="8" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)"></rect>
<text x="1476" y="82" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-text-body)">start / end</text>
<rect x="1710" y="70" width="34" height="16" rx="3" fill="var(--diag-surface)" stroke="var(--diag-border)"></rect>
<rect x="1710" y="70" width="3" height="16" fill="var(--diag-blue)"></rect>
<text x="1756" y="82" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-text-body)">process step</text>
<polygon points="1447,101 1464,110 1447,119 1430,110" fill="var(--diag-decision-fill)"></polygon>
<text x="1476" y="114" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-text-body)">decision</text>
<polygon points="1715,102 1739,102 1744,110 1739,118 1715,118 1710,110" fill="var(--diag-queue-fill)"></polygon>
<text x="1756" y="114" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-text-body)">queue / topic</text>
<rect x="1430" y="134" width="34" height="16" rx="8" fill="var(--diag-soft-bg)" stroke="var(--diag-blue-border)"></rect>
<text x="1476" y="146" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-text-body)">data store</text>
<rect x="1710" y="134" width="34" height="16" rx="3" fill="var(--diag-red-bg)" stroke="var(--diag-red-border)"></rect>
<rect x="1710" y="134" width="3" height="16" fill="var(--diag-red)"></rect>
<text x="1756" y="146" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-text-body)">fail-safe path</text>
<line x1="1430" y1="174" x2="1464" y2="174" stroke="var(--diag-blue)" stroke-width="2"></line>
<text x="1476" y="178" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-text-body)">synchronous</text>
<line x1="1710" y1="174" x2="1744" y2="174" stroke="var(--diag-amber)" stroke-width="2" stroke-dasharray="6 4"></line>
<text x="1756" y="178" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-text-body)">asynchronous</text>
<line x1="64" y1="210" x2="1976" y2="210" stroke="var(--diag-text-strong)" stroke-width="2"></line>
<text x="64" y="250" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="600" fill="var(--diag-blue)" letter-spacing="1.6">STAGE 1 · TRIGGERS</text>
<line x1="240.79999999999998" y1="245" x2="1976" y2="245" stroke="var(--diag-border)" stroke-width="1"></line>
<rect x="64" y="272" width="364.8" height="68" rx="34" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)" stroke-width="1"></rect>
<text x="246.4" y="300.12" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Rep creates</text>
<text x="246.4" y="318.32" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">a lead</text>
<rect x="450.80000000000007" y="272" width="364.8" height="68" rx="34" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)" stroke-width="1"></rect>
<text x="633.2" y="300.12" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">User asks a question</text>
<text x="633.2" y="318.32" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">in plain language</text>
<rect x="837.6" y="272" width="364.8" height="68" rx="34" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)" stroke-width="1"></rect>
<text x="1020" y="300.12" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Rep opens an</text>
<text x="1020" y="318.32" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">account page</text>
<rect x="1224.4" y="272" width="364.8" height="68" rx="34" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)" stroke-width="1"></rect>
<text x="1406.8000000000002" y="300.12" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">User searches</text>
<text x="1406.8000000000002" y="318.32" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">CRM records</text>
<rect x="1611.2" y="272" width="364.8" height="68" rx="34" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)" stroke-width="1"></rect>
<text x="1793.6000000000001" y="300.12" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Customer email /</text>
<text x="1793.6000000000001" y="318.32" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">message arrives</text>
<line x1="246.4" y1="340" x2="246.4" y2="378" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="633.2" y1="340" x2="633.2" y2="378" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="1020" y1="340" x2="1020" y2="378" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="1406.8000000000002" y1="340" x2="1406.8000000000002" y2="378" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="1793.6000000000001" y1="340" x2="1793.6000000000001" y2="378" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="246.4" y1="378" x2="1793.6000000000001" y2="378" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="1020" y1="378" x2="1020" y2="415" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1014,415 1026,415 1020,424" fill="var(--diag-blue)"></polygon>
<text x="1046" y="404" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="400" fill="var(--diag-blue)">every entry point enters the same gate</text>
<text x="64" y="462" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="600" fill="var(--diag-blue)" letter-spacing="1.6">STAGE 2 · AUTH &amp; TENANT GATE</text>
<line x1="326.79999999999995" y1="457" x2="1976" y2="457" stroke="var(--diag-border)" stroke-width="1"></line>
<rect x="64" y="482" width="1912" height="286" rx="6" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="94" y="520" width="224" height="58" rx="4" fill="var(--diag-red-bg)" stroke="var(--diag-red-border)" stroke-width="1"></rect>
<rect x="94" y="520" width="3" height="58" fill="var(--diag-red)"></rect>
<text x="110" y="552.0799999999999" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-red-strong)">Return 401 Unauthorized</text>
<rect x="94" y="594" width="224" height="58" rx="4" fill="var(--diag-red-bg)" stroke="var(--diag-red-border)" stroke-width="1"></rect>
<rect x="94" y="594" width="3" height="58" fill="var(--diag-red)"></rect>
<text x="110" y="626.0799999999999" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-red-strong)">Return 403 Forbidden</text>
<text x="94" y="688" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" font-weight="400" fill="var(--diag-red)">fail-safe exits — request</text>
<text x="94" y="704" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" font-weight="400" fill="var(--diag-red)">never reaches business logic</text>
<polygon points="452,548 577,610 452,672 327,610" fill="var(--diag-decision-fill)"></polygon>
<text x="452" y="613.22" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Valid JWT?</text>
<text x="452" y="692" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" font-weight="400" fill="var(--diag-red)" text-anchor="middle">no → 401</text>
<line x1="585" y1="610" x2="628" y2="610" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="628,604 628,616 637,610" fill="var(--diag-blue)"></polygon>
<rect x="642" y="562" width="220" height="96" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="642" y="562" width="3" height="96" fill="var(--diag-blue)"></rect>
<text x="658" y="595.16" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">Resolve tenant</text>
<text x="658" y="613.0799999999999" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">context from</text>
<text x="658" y="630.9999999999999" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">token claims</text>
<text x="752" y="680" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" font-weight="400" fill="var(--diag-text-faint)" text-anchor="middle">tenant id · org scope</text>
<line x1="872" y1="610" x2="915" y2="610" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="915,604 915,616 924,610" fill="var(--diag-blue)"></polygon>
<polygon points="1052,544 1180,610 1052,676 924,610" fill="var(--diag-decision-fill)"></polygon>
<text x="1052" y="604.12" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">RBAC permits</text>
<text x="1052" y="622.32" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">this action?</text>
<text x="1052" y="696" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" font-weight="400" fill="var(--diag-red)" text-anchor="middle">no → 403</text>
<line x1="1188" y1="610" x2="1231" y2="610" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1231,604 1231,616 1240,610" fill="var(--diag-blue)"></polygon>
<rect x="1246" y="562" width="220" height="96" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="1246" y="562" width="3" height="96" fill="var(--diag-blue)"></rect>
<text x="1262" y="595.16" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">Attach tenant +</text>
<text x="1262" y="613.0799999999999" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">role context</text>
<text x="1262" y="630.9999999999999" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">to request</text>
<text x="1356" y="680" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" font-weight="400" fill="var(--diag-text-faint)" text-anchor="middle">travels downstream</text>
<rect x="1512" y="534" width="434" height="182" rx="4" fill="var(--diag-amber-bg)" stroke="var(--diag-amber)" stroke-width="1" stroke-dasharray="5 4"></rect>
<text x="1532" y="564" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" font-weight="600" fill="var(--diag-amber)" letter-spacing="1.4">TENANT CONTEXT</text>
<text x="1532" y="594" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="400" fill="var(--diag-text-body)">Propagated into every step that</text>
<text x="1532" y="615" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="400" fill="var(--diag-text-body)">follows — SQL queries, cache keys,</text>
<text x="1532" y="636" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="400" fill="var(--diag-text-body)">search indexes, event payloads and</text>
<text x="1532" y="657" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="400" fill="var(--diag-text-body)">RAG retrieval are all tenant-scoped.</text>
<line x1="1020" y1="768" x2="1020" y2="807" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1014,807 1026,807 1020,816" fill="var(--diag-blue)"></polygon>
<polygon points="1020,820 1200,888 1020,956 840,888" fill="var(--diag-decision-fill)"></polygon>
<text x="1020" y="891.22" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Which request type?</text>
<line x1="1020" y1="956" x2="1020" y2="994" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="246.4" y1="994" x2="1793.6000000000001" y2="994" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="246.4" y1="994" x2="246.4" y2="1031" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="240.4,1031 252.4,1031 246.4,1040" fill="var(--diag-blue)"></polygon>
<line x1="633.2" y1="994" x2="633.2" y2="1031" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="627.2,1031 639.2,1031 633.2,1040" fill="var(--diag-blue)"></polygon>
<line x1="1020" y1="994" x2="1020" y2="1031" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1014,1031 1026,1031 1020,1040" fill="var(--diag-blue)"></polygon>
<line x1="1406.8000000000002" y1="994" x2="1406.8000000000002" y2="1031" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1400.8000000000002,1031 1412.8000000000002,1031 1406.8000000000002,1040" fill="var(--diag-blue)"></polygon>
<line x1="1793.6000000000001" y1="994" x2="1793.6000000000001" y2="1031" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1787.6000000000001,1031 1799.6000000000001,1031 1793.6000000000001,1040" fill="var(--diag-blue)"></polygon>
<text x="64" y="1052" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="600" fill="var(--diag-blue)" letter-spacing="1.6">STAGE 3 · SYNCHRONOUS REQUEST PATHS</text>
<line x1="387" y1="1047" x2="1976" y2="1047" stroke="var(--diag-border)" stroke-width="1"></line>
<rect x="64" y="1078" width="364.8" height="536" rx="6" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<text x="84" y="1108" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10" font-weight="600" fill="var(--diag-text-faint)" letter-spacing="1.3">PATH A · LEAD WRITE</text>
<rect x="450.80000000000007" y="1078" width="364.8" height="536" rx="6" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<text x="470.80000000000007" y="1108" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10" font-weight="600" fill="var(--diag-text-faint)" letter-spacing="1.3">PATH B · NL QUERY</text>
<rect x="837.6" y="1078" width="364.8" height="536" rx="6" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<text x="857.6" y="1108" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10" font-weight="600" fill="var(--diag-text-faint)" letter-spacing="1.3">PATH C · ACCOUNT SUMMARY</text>
<rect x="1224.4" y="1078" width="364.8" height="536" rx="6" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<text x="1244.4" y="1108" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10" font-weight="600" fill="var(--diag-text-faint)" letter-spacing="1.3">PATH D · FULL-TEXT SEARCH</text>
<rect x="1611.2" y="1078" width="364.8" height="536" rx="6" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<text x="1631.2" y="1108" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10" font-weight="600" fill="var(--diag-text-faint)" letter-spacing="1.3">PATH E · INBOUND COMMS</text>
<rect x="84" y="1130" width="324.8" height="68" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="84" y="1130" width="3" height="68" fill="var(--diag-blue)"></rect>
<text x="100" y="1155.83" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">Validate payload</text>
<text x="100" y="1177.75" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="400" fill="var(--diag-text-muted)">Pydantic schema</text>
<line x1="246.4" y1="1198" x2="246.4" y2="1225" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="240.4,1225 252.4,1225 246.4,1234" fill="var(--diag-blue)"></polygon>
<rect x="84" y="1236" width="324.8" height="64" rx="14" fill="var(--diag-soft-bg)" stroke="var(--diag-blue-border)"></rect>
<text x="100" y="1261.91" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">Write lead →</text>
<text x="100" y="1280.47" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">PostgreSQL</text>
<line x1="246.4" y1="1300" x2="246.4" y2="1327" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="240.4,1327 252.4,1327 246.4,1336" fill="var(--diag-blue)"></polygon>
<rect x="84" y="1337" width="324.8" height="66" rx="33" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)" stroke-width="1"></rect>
<text x="246.4" y="1364.3300000000002" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Lead in UI immediately</text>
<text x="246.4" y="1381.88" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">— unscored</text>
<line x1="84" y1="1514" x2="408.8" y2="1514" stroke="var(--diag-amber-border)" stroke-width="1" stroke-dasharray="5 4"></line>
<text x="84" y="1540" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="600" fill="var(--diag-amber)">emits lead.created →</text>
<rect x="470.80000000000007" y="1130" width="324.8" height="48" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="470.80000000000007" y="1130" width="3" height="48" fill="var(--diag-blue)"></rect>
<text x="486.80000000000007" y="1157.08" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">Parse query intent</text>
<line x1="633.2" y1="1178" x2="633.2" y2="1201" stroke="var(--diag-green)" stroke-width="2"></line>
<polygon points="627.2,1201 639.2,1201 633.2,1210" fill="var(--diag-green)"></polygon>
<polygon points="633.2,1212 795.6,1268 633.2,1324 470.80000000000007,1268" fill="var(--diag-decision-fill)"></polygon>
<text x="633.2" y="1262.54" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Retrieval scoped</text>
<text x="633.2" y="1279.44" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">to this tenant?</text>
<line x1="548" y1="1324" x2="718.4000000000001" y2="1324" stroke="var(--diag-green)" stroke-width="2"></line>
<line x1="633.2" y1="1324" x2="633.2" y2="1324" stroke="var(--diag-green)" stroke-width="2"></line>
<line x1="548" y1="1324" x2="548" y2="1353" stroke="var(--diag-red)" stroke-width="2"></line>
<polygon points="542,1353 554,1353 548,1362" fill="var(--diag-red)"></polygon>
<text x="557" y="1346" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="9.5" font-weight="400" fill="var(--diag-red)">cross-tenant</text>
<line x1="718.4000000000001" y1="1324" x2="718.4000000000001" y2="1353" stroke="var(--diag-green)" stroke-width="2"></line>
<polygon points="712.4000000000001,1353 724.4000000000001,1353 718.4000000000001,1362" fill="var(--diag-green)"></polygon>
<text x="727.4000000000001" y="1346" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="9.5" font-weight="400" fill="var(--diag-green)">clean</text>
<rect x="468" y="1362" width="160" height="66" rx="4" fill="var(--diag-red-bg)" stroke="var(--diag-red-border)" stroke-width="1"></rect>
<rect x="468" y="1362" width="3" height="66" fill="var(--diag-red)"></rect>
<text x="484" y="1389.54" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="var(--diag-red-strong)">Block — fail</text>
<text x="484" y="1406.18" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="var(--diag-red-strong)">safe, no leak</text>
<rect x="638.4000000000001" y="1362" width="160" height="66" rx="14" fill="var(--diag-soft-bg)" stroke="var(--diag-blue-border)"></rect>
<text x="654.4000000000001" y="1388.91" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">Vector DB</text>
<text x="654.4000000000001" y="1407.47" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">retrieval</text>
<line x1="718.4000000000001" y1="1428" x2="718.4000000000001" y2="1451" stroke="var(--diag-green)" stroke-width="2"></line>
<polygon points="712.4000000000001,1451 724.4000000000001,1451 718.4000000000001,1460" fill="var(--diag-green)"></polygon>
<rect x="470.80000000000007" y="1460" width="324.8" height="58" rx="4" fill="var(--diag-green-bg)" stroke="var(--diag-green-border)" stroke-width="1"></rect>
<rect x="470.80000000000007" y="1460" width="3" height="58" fill="var(--diag-green)"></rect>
<text x="486.80000000000007" y="1483.33" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)">Assemble context</text>
<text x="486.80000000000007" y="1500.61" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)">→ LLM answer</text>
<line x1="633.2" y1="1518" x2="633.2" y2="1537" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="627.2,1537 639.2,1537 633.2,1546" fill="var(--diag-blue)"></polygon>
<rect x="470.80000000000007" y="1546" width="324.8" height="52" rx="26" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)" stroke-width="1"></rect>
<text x="633.2" y="1575.105" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Answer shown to user</text>
<polygon points="1020,1134 1182.4,1190 1020,1246 857.6,1190" fill="var(--diag-decision-fill)"></polygon>
<text x="1020" y="1184.54" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Cached summary</text>
<text x="1020" y="1201.44" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">fresh?</text>
<line x1="934.8" y1="1246" x2="1105.2" y2="1246" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="934.8" y1="1246" x2="934.8" y2="1275" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="928.8,1275 940.8,1275 934.8,1284" fill="var(--diag-blue)"></polygon>
<text x="943.8" y="1268" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="9.5" font-weight="400" fill="var(--diag-blue)">yes</text>
<line x1="1105.2" y1="1246" x2="1105.2" y2="1275" stroke="var(--diag-amber)" stroke-width="2"></line>
<polygon points="1099.2,1275 1111.2,1275 1105.2,1284" fill="var(--diag-amber)"></polygon>
<text x="1114.2" y="1268" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="9.5" font-weight="400" fill="var(--diag-amber)">no / stale</text>
<rect x="854.8" y="1284" width="160" height="56" rx="14" fill="var(--diag-soft-bg)" stroke="var(--diag-blue-border)"></rect>
<text x="870.8" y="1315.19" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">Serve from Redis</text>
<rect x="1025.2" y="1284" width="160" height="52" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="1025.2" y="1284" width="3" height="52" fill="var(--diag-blue)"></rect>
<text x="1041.2" y="1304.75" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="600" fill="var(--diag-text-strong)">Gather account</text>
<text x="1041.2" y="1320.75" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="600" fill="var(--diag-text-strong)">history</text>
<line x1="1105.2" y1="1336" x2="1105.2" y2="1355" stroke="var(--diag-green)" stroke-width="2"></line>
<polygon points="1099.2,1355 1111.2,1355 1105.2,1364" fill="var(--diag-green)"></polygon>
<rect x="1025.2" y="1364" width="160" height="48" rx="4" fill="var(--diag-green-bg)" stroke="var(--diag-green-border)" stroke-width="1"></rect>
<rect x="1025.2" y="1364" width="3" height="48" fill="var(--diag-green)"></rect>
<text x="1041.2" y="1390.75" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="600" fill="var(--diag-text-strong)">LLM summarises</text>
<line x1="1105.2" y1="1412" x2="1105.2" y2="1431" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1099.2,1431 1111.2,1431 1105.2,1440" fill="var(--diag-blue)"></polygon>
<rect x="1025.2" y="1440" width="160" height="52" rx="14" fill="var(--diag-soft-bg)" stroke="var(--diag-blue-border)"></rect>
<text x="1041.2" y="1469.19" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">Cache in Redis · TTL</text>
<line x1="934.8" y1="1340" x2="934.8" y2="1524" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="1105.2" y1="1492" x2="1105.2" y2="1524" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="934.8" y1="1524" x2="1105.2" y2="1524" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="1020" y1="1524" x2="1020" y2="1543" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1014,1543 1026,1543 1020,1552" fill="var(--diag-blue)"></polygon>
<rect x="857.6" y="1552" width="324.8" height="52" rx="26" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)" stroke-width="1"></rect>
<text x="1020" y="1581.105" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Summary on account page</text>
<rect x="1244.4" y="1128" width="324.8" height="76" rx="14" fill="var(--diag-soft-bg)" stroke="var(--diag-blue-border)"></rect>
<text x="1260.4" y="1149.16" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">Query Elasticsearch /</text>
<text x="1260.4" y="1167.72" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">OpenSearch</text>
<text x="1260.4" y="1190.28" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="400" fill="var(--diag-text-muted)">tenant-scoped index</text>
<line x1="1406.8000000000002" y1="1204" x2="1406.8000000000002" y2="1229" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1400.8000000000002,1229 1412.8000000000002,1229 1406.8000000000002,1238" fill="var(--diag-blue)"></polygon>
<rect x="1244.4" y="1238" width="324.8" height="50" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="1244.4" y="1238" width="3" height="50" fill="var(--diag-blue)"></rect>
<text x="1260.4" y="1265.9699999999998" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)">Rank &amp; filter by relevance</text>
<line x1="1406.8000000000002" y1="1288" x2="1406.8000000000002" y2="1313" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1400.8000000000002,1313 1412.8000000000002,1313 1406.8000000000002,1322" fill="var(--diag-blue)"></polygon>
<rect x="1244.4" y="1322" width="324.8" height="68" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="1244.4" y="1322" width="3" height="68" fill="var(--diag-blue)"></rect>
<text x="1260.4" y="1347.7199999999998" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)">Merge entity types</text>
<text x="1260.4" y="1368.9999999999998" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="400" fill="var(--diag-text-muted)">leads · contacts · activities</text>
<line x1="1406.8000000000002" y1="1390" x2="1406.8000000000002" y2="1415" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1400.8000000000002,1415 1412.8000000000002,1415 1406.8000000000002,1424" fill="var(--diag-blue)"></polygon>
<rect x="1244.4" y="1424" width="324.8" height="52" rx="26" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)" stroke-width="1"></rect>
<text x="1406.8000000000002" y="1453.105" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Unified results returned</text>
<line x1="1244.4" y1="1514" x2="1569.2" y2="1514" stroke="var(--diag-amber-border)" stroke-width="1" stroke-dasharray="5 4"></line>
<text x="1244.4" y="1540" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-amber)">index kept current by</text>
<text x="1244.4" y="1556" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-amber)">async re-index →</text>
<rect x="1631.2" y="1130" width="324.8" height="52" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="1631.2" y="1130" width="3" height="52" fill="var(--diag-blue)"></rect>
<text x="1647.2" y="1150.12" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">Ingest &amp; normalise</text>
<text x="1647.2" y="1168.04" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">message</text>
<line x1="1793.6000000000001" y1="1182" x2="1793.6000000000001" y2="1209" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1787.6000000000001,1209 1799.6000000000001,1209 1793.6000000000001,1218" fill="var(--diag-blue)"></polygon>
<rect x="1631.2" y="1220" width="324.8" height="56" rx="14" fill="var(--diag-soft-bg)" stroke="var(--diag-blue-border)"></rect>
<text x="1647.2" y="1251.19" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">Save to PostgreSQL</text>
<line x1="1793.6000000000001" y1="1276" x2="1793.6000000000001" y2="1303" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1787.6000000000001,1303 1799.6000000000001,1303 1793.6000000000001,1312" fill="var(--diag-blue)"></polygon>
<rect x="1631.2" y="1314" width="324.8" height="60" rx="30" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)" stroke-width="1"></rect>
<text x="1793.6000000000001" y="1338.3300000000002" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Message visible</text>
<text x="1793.6000000000001" y="1355.88" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">in the timeline</text>
<line x1="1631.2" y1="1514" x2="1956" y2="1514" stroke="var(--diag-amber-border)" stroke-width="1" stroke-dasharray="5 4"></line>
<text x="1631.2" y="1540" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="600" fill="var(--diag-amber)">emits</text>
<text x="1631.2" y="1556" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="600" fill="var(--diag-amber)">communication.received →</text>
<line x1="470.80000000000007" y1="1514" x2="795.6000000000001" y2="1514" stroke="var(--diag-amber-border)" stroke-width="1" stroke-dasharray="5 4"></line>
<line x1="857.6" y1="1514" x2="1182.4" y2="1514" stroke="var(--diag-amber-border)" stroke-width="1" stroke-dasharray="5 4"></line>
<text x="470.80000000000007" y="1540" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-amber)">emits query.logged</text>
<text x="470.80000000000007" y="1556" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-amber)">(audit) →</text>
<text x="857.6" y="1540" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-amber)">new activity invalidates</text>
<text x="857.6" y="1556" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11" font-weight="400" fill="var(--diag-amber)">the cache →</text>
<line x1="246.4" y1="1614" x2="246.4" y2="1656" stroke="var(--diag-amber)" stroke-width="2" stroke-dasharray="7 5"></line>
<line x1="633.2" y1="1614" x2="633.2" y2="1656" stroke="var(--diag-amber)" stroke-width="2" stroke-dasharray="7 5"></line>
<line x1="1020" y1="1614" x2="1020" y2="1656" stroke="var(--diag-amber)" stroke-width="2" stroke-dasharray="7 5"></line>
<line x1="1406.8000000000002" y1="1614" x2="1406.8000000000002" y2="1656" stroke="var(--diag-amber)" stroke-width="2" stroke-dasharray="7 5"></line>
<line x1="1793.6000000000001" y1="1614" x2="1793.6000000000001" y2="1656" stroke="var(--diag-amber)" stroke-width="2" stroke-dasharray="7 5"></line>
<line x1="246.4" y1="1656" x2="1793.6000000000001" y2="1656" stroke="var(--diag-amber)" stroke-width="2" stroke-dasharray="7 5"></line>
<line x1="1020" y1="1656" x2="1020" y2="1697" stroke="var(--diag-amber)" stroke-width="2" stroke-dasharray="7 5"></line>
<polygon points="1014,1697 1026,1697 1020,1706" fill="var(--diag-amber)"></polygon>
<text x="1046" y="1686" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="400" fill="var(--diag-amber)">all write paths publish onto one event bus · fire &amp; forget</text>
<text x="64" y="1754" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="600" fill="var(--diag-amber)" letter-spacing="1.6">STAGE 4 · SHARED ASYNC BACKBONE</text>
<line x1="352.59999999999997" y1="1749" x2="1976" y2="1749" stroke="var(--diag-border)" stroke-width="1"></line>
<rect x="64" y="1776" width="1912" height="924" rx="6" fill="var(--diag-async-bg)" stroke="var(--diag-amber-border)"></rect>
<polygon points="773.6,1790 1266.4,1790 1300,1834 1266.4,1878 773.6,1878 740,1834" fill="var(--diag-queue-fill)"></polygon>
<text x="1020" y="1830" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="18" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Apache Kafka — event bus</text>
<text x="1020" y="1852" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="400" fill="var(--diag-amber-strong)" text-anchor="middle">lead.created · query.logged · communication.received · report.requested</text>
<line x1="1020" y1="1878" x2="1020" y2="1913" stroke="var(--diag-amber)" stroke-width="2" stroke-dasharray="7 5"></line>
<polygon points="1014,1913 1026,1913 1020,1922" fill="var(--diag-amber)"></polygon>
<rect x="760" y="1922" width="520" height="58" rx="4" fill="var(--diag-amber-bg)" stroke="var(--diag-amber-border)" stroke-width="1"></rect>
<rect x="760" y="1922" width="3" height="58" fill="var(--diag-amber)"></rect>
<text x="776" y="1954.3000000000002" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="15" font-weight="600" fill="var(--diag-text-strong)">Celery worker pool — consumes topics</text>
<line x1="1020" y1="1980" x2="1020" y2="2018" stroke="var(--diag-amber)" stroke-width="2"></line>
<line x1="324" y1="2018" x2="1716" y2="2018" stroke="var(--diag-amber)" stroke-width="2"></line>
<line x1="324" y1="2018" x2="324" y2="2053" stroke="var(--diag-amber)" stroke-width="2"></line>
<polygon points="318,2053 330,2053 324,2062" fill="var(--diag-amber)"></polygon>
<line x1="788" y1="2018" x2="788" y2="2053" stroke="var(--diag-amber)" stroke-width="2"></line>
<polygon points="782,2053 794,2053 788,2062" fill="var(--diag-amber)"></polygon>
<line x1="1252" y1="2018" x2="1252" y2="2053" stroke="var(--diag-amber)" stroke-width="2"></line>
<polygon points="1246,2053 1258,2053 1252,2062" fill="var(--diag-amber)"></polygon>
<line x1="1716" y1="2018" x2="1716" y2="2053" stroke="var(--diag-amber)" stroke-width="2"></line>
<polygon points="1710,2053 1722,2053 1716,2062" fill="var(--diag-amber)"></polygon>
<rect x="104" y="2062" width="440" height="112" rx="4" fill="var(--diag-green-bg)" stroke="var(--diag-green-border)" stroke-width="1"></rect>
<rect x="104" y="2062" width="3" height="112" fill="var(--diag-green)"></rect>
<text x="120" y="2101.58" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">AI lead scoring</text>
<text x="120" y="2123.5" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="400" fill="var(--diag-text-muted)">gather context → LLM</text>
<text x="120" y="2140" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="400" fill="var(--diag-text-muted)">score + reasoning</text>
<rect x="568" y="2062" width="440" height="112" rx="4" fill="var(--diag-green-bg)" stroke="var(--diag-green-border)" stroke-width="1"></rect>
<rect x="568" y="2062" width="3" height="112" fill="var(--diag-green)"></rect>
<text x="584" y="2101.58" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">Sentiment analysis</text>
<text x="584" y="2123.5" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="400" fill="var(--diag-text-muted)">LLM classifies</text>
<text x="584" y="2140" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="400" fill="var(--diag-text-muted)">inbound message</text>
<rect x="1032" y="2062" width="440" height="112" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="1032" y="2062" width="3" height="112" fill="var(--diag-amber)"></rect>
<text x="1048" y="2100.87" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">Email, notifications,</text>
<text x="1048" y="2118.79" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">reports</text>
<text x="1048" y="2140.71" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="400" fill="var(--diag-text-muted)">delivery &amp; generation tasks</text>
<rect x="1496" y="2062" width="440" height="112" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="1496" y="2062" width="3" height="112" fill="var(--diag-amber)"></rect>
<text x="1512" y="2101.58" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">Ingestion &amp; re-index</text>
<text x="1512" y="2123.5" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="400" fill="var(--diag-text-muted)">search index +</text>
<text x="1512" y="2140" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="12.5" font-weight="400" fill="var(--diag-text-muted)">embeddings refreshed</text>
<line x1="324" y1="2174" x2="324" y2="2212" stroke="var(--diag-amber)" stroke-width="2"></line>
<line x1="788" y1="2174" x2="788" y2="2212" stroke="var(--diag-amber)" stroke-width="2"></line>
<line x1="1252" y1="2174" x2="1252" y2="2212" stroke="var(--diag-amber)" stroke-width="2"></line>
<line x1="1716" y1="2174" x2="1716" y2="2212" stroke="var(--diag-amber)" stroke-width="2"></line>
<line x1="324" y1="2212" x2="1716" y2="2212" stroke="var(--diag-amber)" stroke-width="2"></line>
<line x1="1020" y1="2212" x2="1020" y2="2243" stroke="var(--diag-amber)" stroke-width="2"></line>
<polygon points="1014,2243 1026,2243 1020,2252" fill="var(--diag-amber)"></polygon>
<polygon points="1020,2254 1190,2324 1020,2394 850,2324" fill="var(--diag-decision-fill)"></polygon>
<text x="1020" y="2318.1200000000003" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Task processed</text>
<text x="1020" y="2336.32" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">successfully?</text>
<line x1="1020" y1="2394" x2="1020" y2="2432" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="398.6666666666667" y1="2432" x2="1641.3333333333335" y2="2432" stroke="var(--diag-blue)" stroke-width="2"></line>
<line x1="398.6666666666667" y1="2432" x2="398.6666666666667" y2="2467" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="392.6666666666667,2467 404.6666666666667,2467 398.6666666666667,2476" fill="var(--diag-blue)"></polygon>
<line x1="1020" y1="2432" x2="1020" y2="2467" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1014,2467 1026,2467 1020,2476" fill="var(--diag-blue)"></polygon>
<line x1="1641.3333333333335" y1="2432" x2="1641.3333333333335" y2="2467" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1635.3333333333335,2467 1647.3333333333335,2467 1641.3333333333335,2476" fill="var(--diag-blue)"></polygon>
<text x="398.6666666666667" y="2500" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" font-weight="400" fill="var(--diag-amber)" text-anchor="middle">no · retries remaining</text>
<rect x="104" y="2514" width="589.3333333333334" height="58" rx="4" fill="var(--diag-amber-bg)" stroke="var(--diag-amber-border)" stroke-width="1"></rect>
<rect x="104" y="2514" width="3" height="58" fill="var(--diag-amber)"></rect>
<text x="120" y="2546.08" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">Wait (backoff), retry the task</text>
<line x1="144" y1="2600" x2="673.3333333333334" y2="2600" stroke="var(--diag-amber)" stroke-width="2" stroke-dasharray="7 5"></line>
<polygon points="144,2594 144,2606 135,2600" fill="var(--diag-amber)"></polygon>
<text x="148" y="2624" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" font-weight="400" fill="var(--diag-amber)">back to the worker pool</text>
<text x="1020" y="2500" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" font-weight="400" fill="var(--diag-red)" text-anchor="middle">no · retries exhausted</text>
<rect x="725.3333333333333" y="2514" width="589.3333333333334" height="58" rx="4" fill="var(--diag-red-bg)" stroke="var(--diag-red-border)" stroke-width="1"></rect>
<rect x="725.3333333333333" y="2514" width="3" height="58" fill="var(--diag-red)"></rect>
<text x="741.3333333333333" y="2546.08" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-red-strong)">Dead-letter queue</text>
<line x1="1020" y1="2572" x2="1020" y2="2593" stroke="var(--diag-red)" stroke-width="2"></line>
<polygon points="1014,2593 1026,2593 1020,2602" fill="var(--diag-red)"></polygon>
<rect x="725.3333333333333" y="2605" width="589.3333333333334" height="54" rx="27" fill="var(--diag-red-bg)" stroke="var(--diag-red-border)" stroke-width="1"></rect>
<text x="1020" y="2635.105" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-red-strong)" text-anchor="middle">Ops team alerted — nothing silently lost</text>
<text x="1650.3333333333335" y="2500" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" font-weight="400" fill="var(--diag-blue)">yes</text>
<rect x="1346.6666666666667" y="2514" width="589.3333333333334" height="58" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="1346.6666666666667" y="2514" width="3" height="58" fill="var(--diag-blue)"></rect>
<text x="1362.6666666666667" y="2546.08" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)">Commit offset · persist result</text>
<line x1="1641.3333333333335" y1="2572" x2="1641.3333333333335" y2="2593" stroke="var(--diag-blue)" stroke-width="2"></line>
<polygon points="1635.3333333333335,2593 1647.3333333333335,2593 1641.3333333333335,2602" fill="var(--diag-blue)"></polygon>
<rect x="1346.6666666666667" y="2603" width="286.6666666666667" height="62" rx="14" fill="var(--diag-soft-bg)" stroke="var(--diag-blue-border)"></rect>
<text x="1362.6666666666667" y="2627.91" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">PostgreSQL — score,</text>
<text x="1362.6666666666667" y="2646.47" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">sentiment, results</text>
<rect x="1649.3333333333335" y="2603" width="286.6666666666667" height="62" rx="14" fill="var(--diag-soft-bg)" stroke="var(--diag-blue-border)"></rect>
<text x="1665.3333333333335" y="2627.91" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">Redis / search /</text>
<text x="1665.3333333333335" y="2646.47" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14.5" font-weight="600" fill="var(--diag-text-strong)">vector refresh</text>
<line x1="1020" y1="2700" x2="1020" y2="2741" stroke="var(--diag-amber)" stroke-width="2" stroke-dasharray="7 5"></line>
<polygon points="1014,2741 1026,2741 1020,2750" fill="var(--diag-amber)"></polygon>
<rect x="104" y="2762" width="589.3333333333334" height="68" rx="34" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)" stroke-width="1"></rect>
<text x="398.6666666666667" y="2790.1200000000003" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Lead score appears in the UI,</text>
<text x="398.6666666666667" y="2808.32" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">near real-time</text>
<rect x="725.3333333333333" y="2762" width="589.3333333333334" height="68" rx="34" fill="var(--diag-red-bg)" stroke="var(--diag-red-border)" stroke-width="1"></rect>
<text x="1020" y="2790.1200000000003" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-red-strong)" text-anchor="middle">Negative / urgent message flagged</text>
<text x="1020" y="2808.32" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-red-strong)" text-anchor="middle">→ rep notified immediately</text>
<rect x="1346.6666666666667" y="2762" width="589.3333333333334" height="68" rx="34" fill="var(--diag-blue-bg)" stroke="var(--diag-blue-border)" stroke-width="1"></rect>
<text x="1641.3333333333335" y="2790.1200000000003" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Neutral sentiment tagged,</text>
<text x="1641.3333333333335" y="2808.32" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="14" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">visible in history</text>
<text x="1020" y="2864" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="400" fill="var(--diag-amber)" text-anchor="middle">results are pushed back to the client that started the flow — closing the loop</text>
<text x="64" y="2922" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="600" fill="var(--diag-neutral)" letter-spacing="1.6">STAGE 5 · PLATFORM BENEATH THE WHOLE FLOW</text>
<line x1="438.59999999999997" y1="2917" x2="1976" y2="2917" stroke="var(--diag-border)" stroke-width="1"></line>
<rect x="64" y="2944" width="1912" height="218" rx="6" fill="var(--diag-platform-bg)" stroke="var(--diag-platform-border)"></rect>
<rect x="104" y="2983" width="352" height="58" rx="29" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<text x="280" y="3006.33" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">Developer</text>
<text x="280" y="3023.88" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">pushes code</text>
<rect x="474" y="2982" width="352" height="62" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="474" y="2982" width="3" height="62" fill="var(--diag-neutral)"></rect>
<text x="490" y="3007.54" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="var(--diag-text-strong)">Lint → Pytest →</text>
<text x="490" y="3024.18" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="var(--diag-text-strong)">Playwright → security scan</text>
<line x1="474" y1="3064" x2="488" y2="3064" stroke="var(--diag-red)" stroke-width="2"></line>
<polygon points="488,3058 488,3070 497,3064" fill="var(--diag-red)"></polygon>
<text x="506" y="3068" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10" font-weight="400" fill="var(--diag-red-strong)">any gate fails — build</text>
<text x="506" y="3082" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10" font-weight="400" fill="var(--diag-red-strong)">stops, dev notified</text>
<rect x="844" y="2982" width="352" height="62" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="844" y="2982" width="3" height="62" fill="var(--diag-neutral)"></rect>
<text x="860" y="3007.54" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="var(--diag-text-strong)">Build Docker image</text>
<text x="860" y="3024.18" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="var(--diag-text-strong)">→ push to registry</text>
<rect x="1214" y="2982" width="352" height="62" rx="4" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<rect x="1214" y="2982" width="3" height="62" fill="var(--diag-neutral)"></rect>
<text x="1230" y="3007.54" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="var(--diag-text-strong)">Kubernetes rolling</text>
<text x="1230" y="3024.18" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="var(--diag-text-strong)">deploy → health checks</text>
<line x1="1214" y1="3064" x2="1228" y2="3064" stroke="var(--diag-red)" stroke-width="2"></line>
<polygon points="1228,3058 1228,3070 1237,3064" fill="var(--diag-red)"></polygon>
<text x="1246" y="3068" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10" font-weight="400" fill="var(--diag-red-strong)">unhealthy → auto</text>
<text x="1246" y="3082" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10" font-weight="400" fill="var(--diag-red-strong)">rollback + alert</text>
<rect x="1584" y="2983" width="352" height="58" rx="29" fill="var(--diag-surface)" stroke="var(--diag-border)" stroke-width="1"></rect>
<text x="1760" y="3006.33" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">New version live,</text>
<text x="1760" y="3023.88" font-family="'IBM Plex Sans',system-ui,sans-serif" font-size="13.5" font-weight="600" fill="var(--diag-text-strong)" text-anchor="middle">old pods drained</text>
<line x1="458" y1="3012" x2="463" y2="3012" stroke="var(--diag-neutral)" stroke-width="2"></line>
<polygon points="463,3006 463,3018 472,3012" fill="var(--diag-neutral)"></polygon>
<line x1="828" y1="3012" x2="833" y2="3012" stroke="var(--diag-neutral)" stroke-width="2"></line>
<polygon points="833,3006 833,3018 842,3012" fill="var(--diag-neutral)"></polygon>
<line x1="1198" y1="3012" x2="1203" y2="3012" stroke="var(--diag-neutral)" stroke-width="2"></line>
<polygon points="1203,3006 1203,3018 1212,3012" fill="var(--diag-neutral)"></polygon>
<line x1="1568" y1="3012" x2="1573" y2="3012" stroke="var(--diag-neutral)" stroke-width="2"></line>
<polygon points="1573,3006 1573,3018 1582,3012" fill="var(--diag-neutral)"></polygon>
<line x1="104" y1="3100" x2="1936" y2="3100" stroke="var(--diag-neutral-faint)" stroke-width="1" stroke-dasharray="2 4"></line>
<text x="104" y="3134" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="600" fill="var(--diag-neutral)" letter-spacing="1.4">GRAFANA + OPENTELEMETRY</text>
<line x1="408" y1="3130" x2="508" y2="3130" stroke="var(--diag-neutral-faint)" stroke-width="2" stroke-dasharray="2 4"></line>
<text x="524" y="3134" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="400" fill="var(--diag-neutral)">observes every stage above — API latency, throughput, error rates, traces that follow one tenant request from the gate through Kafka into async work</text>
<line x1="64" y1="3206" x2="1976" y2="3206" stroke="var(--diag-border)" stroke-width="1"></line>
<text x="64" y="3232" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="400" fill="var(--diag-text-footnote)">AI-Powered Enterprise CRM Platform · unified process flow</text>
<text x="1976" y="3232" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="11.5" font-weight="400" fill="var(--diag-text-footnote)" text-anchor="end">one gate · five request paths · one async backbone · one platform</text>
</svg>`;

export default function CrmArchitectureDiagram({ isDarkMode }: { isDarkMode: boolean }) {
  const vars = isDarkMode ? DARK_VARS : LIGHT_VARS;

  return (
    <div
      className="rounded-3xl overflow-x-auto overflow-y-hidden border"
      style={{
        ...(vars as React.CSSProperties),
        backgroundColor: 'var(--diag-async-bg)',
        borderColor: 'var(--diag-border)',
      }}
    >
      <div
        className="p-4 sm:p-6"
        dangerouslySetInnerHTML={{ __html: DIAGRAM_SVG }}
      />
    </div>
  );
}
