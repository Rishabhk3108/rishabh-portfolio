export interface Project {
  id: number;
  name: string;
  organization?: string;
  description: string;
  badges: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  previewBg: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'AI-Powered Enterprise CRM Platform',
    description: 'Multi-tenant enterprise CRM with FastAPI + React/Next.js, featuring LLM/RAG-powered lead scoring, AI customer summaries, and natural-language CRM queries.',
    badges: ['FastAPI', 'Next.js', 'PostgreSQL', 'Kubernetes'],
    tags: ['AI/RAG', 'CRM', 'Full Stack', 'Multi-tenant'],
    previewBg: 'linear-gradient(160deg, #0d1b2a 0%, #1a2f44 50%, #0a1520 100%)',
    featured: true,
  },
  {
    id: 2,
    name: 'Enterprise Enrollment Portal – Insurance & Payroll Platform',
    description: 'Full-stack insurance enrollment & payroll platform (Django, React, React Native) deployed on Azure with autoscaling up to 400 containers, handling 16M+ requests across regions with automated disaster-recovery backups.',
    badges: ['Django', 'React.js', 'React Native', 'Azure'],
    tags: ['Insurance', 'Payroll', 'Cloud Scale', 'Enterprise'],
    previewBg: 'linear-gradient(160deg, #1c1c2e 0%, #2c2c3e 50%, #1a1a2e 100%)',
    featured: true,
  },
  {
    id: 3,
    name: 'AI-Powered Cognitive Search System (RAG + GraphRAG + OmniRAG)',
    organization: 'CSA Group',
    description: 'Hybrid GraphRAG cognitive search system over 1.5M+ multimodal documents using Azure AI Search and Neo4j knowledge graphs — cut infrastructure costs 80% and accelerated retrieval by 60%.',
    badges: ['Azure AI Search', 'Neo4j', 'GraphRAG', 'OmniRAG'],
    tags: ['Cognitive Search', 'Knowledge Graph', 'Enterprise AI', 'Cost Optimization'],
    previewBg: 'linear-gradient(160deg, #0a0f1a 0%, #0d1b2a 60%, #071020 100%)',
    featured: true,
  },
  {
    id: 4,
    name: 'AI-Driven Audit Management System',
    organization: 'CSA Group',
    description: 'Led a team of 5 building a multi-agent audit orchestration system (LangGraph, LangChain, Azure AI Foundry, Anthropic, Django), architected to scale from 5,000 to 10M+ users — cutting audit time by 75%.',
    badges: ['LangGraph', 'LangChain', 'Azure AI Foundry', 'Django'],
    tags: ['Multi-Agent AI', 'Audit Automation', 'Enterprise Scale', 'Team Lead'],
    previewBg: 'linear-gradient(160deg, #1a0d00 0%, #3a1f00 50%, #110800 100%)',
    featured: false,
  },
  {
    id: 5,
    name: 'AI Interview Agent – Autonomous Candidate Screening Bot',
    description: 'Autonomous AI agent that joins live candidate interviews, conducts real-time conversational screening with barge-in support and eye-tracking engagement analysis, then delivers structured feedback — saving $10,000/month vs. a third-party service.',
    badges: ['Python', 'Playwright', 'ElevenLabs', 'Azure OpenAI'],
    tags: ['Autonomous Agent', 'Voice AI', 'Computer Vision', 'Cost Savings'],
    previewBg: 'linear-gradient(160deg, #1a0d20 0%, #3a1a4a 50%, #100815 100%)',
    featured: false,
  },
  {
    id: 6,
    name: 'Temporal Graph-Based Kiosk Forecasting Pipeline',
    description: 'Python time-series pipeline that ingests kiosk data every 15 days to forecast per-kiosk earnings and traffic, storing results in a temporal knowledge graph in Neo4j — cutting manual analysis effort to 5% of prior levels.',
    badges: ['Python', 'Neo4j', 'Time-Series Forecasting', 'Knowledge Graph'],
    tags: ['Forecasting', 'Automation', 'Temporal Data', 'Business Impact'],
    previewBg: 'linear-gradient(160deg, #0a1a0a 0%, #1a3a1a 50%, #050f05 100%)',
    featured: false,
  },
  {
    id: 7,
    name: 'Insurance Plan Advisor Chat Assistant',
    description: 'Chat assistant embedded in an existing insurance portal that helps users choose plans, calculate coverage, and get personalized recommendations — increasing customer satisfaction by 35% and cutting enrollment completion time by 47%.',
    badges: [],
    tags: ['Conversational AI', 'Insurance', 'Personalization', 'Customer Experience'],
    previewBg: 'linear-gradient(160deg, #1a1200 0%, #3d2b00 50%, #110c00 100%)',
    featured: false,
  },
  {
    id: 8,
    name: 'AI-Based Tender & RFP Management System',
    description: 'Full-stack AI-powered Tender & RFP management system (Django, React) on Azure with automated document parsing, evaluation, and response generation using NLP and Pinecone vector search with OpenAI retrieval — cutting turnaround from days to hours.',
    badges: ['Django', 'React', 'Pinecone', 'OpenAI'],
    tags: ['NLP', 'Document Automation', 'Vector Search', 'Enterprise Scale'],
    previewBg: 'linear-gradient(160deg, #0f1a0f 0%, #1e3a1e 50%, #080f08 100%)',
    featured: false,
  },
  {
    id: 9,
    name: 'Face Recognition Attendance & Time Management System',
    description: 'End-to-end face-recognition attendance portal and mobile app (FastAPI, React, React Native, SQL Server) with an integrated Time Master module cross-validating logged hours against captured attendance — deployed org-wide on in-house servers.',
    badges: ['FastAPI', 'React', 'React Native', 'SQL Server'],
    tags: ['Computer Vision', 'Face Recognition', 'Attendance', 'Enterprise'],
    previewBg: 'linear-gradient(160deg, #1a2535 0%, #2a3d52 50%, #111c28 100%)',
    featured: false,
  },
];

export const featuredProjects = projects.filter(p => p.featured);

export const tagCounts: Record<string, number> = projects.reduce((acc, p) => {
  p.tags.forEach(t => { acc[t] = (acc[t] ?? 0) + 1; });
  return acc;
}, {} as Record<string, number>);

// Only tags shared by 2+ projects make useful filter chips; rarer tags are still searchable by text.
export const projectFilterTags = [
  'All',
  ...Object.keys(tagCounts).filter(t => tagCounts[t] >= 2).sort(),
];
