export interface ProjectDetailGroup {
  title: string;
  items: string[];
}

export interface ProjectDetailArchItem {
  label: string;
  description: string;
}

export interface ProjectDetailRole {
  title: string;
  description: string;
}

export interface ProjectDiagram {
  label: string;
  image: string;
  caption?: string;
}

export interface ProjectDetail {
  tagline?: string;
  fullStack: string[];
  overviewIntro: string;
  capabilityGroups: ProjectDetailGroup[];
  architecture: ProjectDetailArchItem[];
  roleIntro?: string;
  role: ProjectDetailRole[];
  roleClosing?: string;
  outcome: string;
  note?: string;
  diagrams?: ProjectDiagram[];
  gallery?: string[];
}

export interface Project {
  id: number;
  slug: string;
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
  detail?: ProjectDetail;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'ai-enterprise-crm-platform',
    name: 'AI-Powered Enterprise CRM Platform',
    description: 'Multi-tenant enterprise CRM with FastAPI + React/Next.js, featuring LLM/RAG-powered lead scoring, AI customer summaries, and natural-language CRM queries.',
    badges: ['FastAPI', 'Next.js', 'PostgreSQL', 'Kubernetes'],
    tags: ['AI/RAG', 'CRM', 'Full Stack', 'Multi-tenant'],
    previewBg: 'linear-gradient(160deg, #0d1b2a 0%, #1a2f44 50%, #0a1520 100%)',
    featured: true,
    detail: {
      tagline: 'An enterprise-grade, multi-tenant CRM combining traditional pipeline management with LLM-powered intelligence embedded directly into core workflows.',
      fullStack: [
        'Python', 'FastAPI', 'Django', 'React', 'Next.js', 'TypeScript', 'PostgreSQL', 'SQLAlchemy',
        'Redis', 'Apache Kafka', 'Celery', 'Elasticsearch/OpenSearch', 'Docker', 'Kubernetes', 'AWS',
        'Pytest', 'Playwright', 'GitHub Actions', 'Grafana', 'OpenTelemetry', 'LLM APIs', 'RAG', 'Vector Database',
      ],
      overviewIntro: 'The platform is an enterprise-grade, AI-powered CRM system designed to manage high-volume customer, lead, sales, communication, and business workflow data on a scalable, distributed architecture. It was built as a full-stack, multi-tenant system supporting concurrent enterprise users, combining traditional CRM capability with LLM-powered intelligence embedded directly into core workflows.',
      capabilityGroups: [
        {
          title: 'Core CRM Capabilities',
          items: [
            'Lead management, customer/account management, sales pipeline tracking',
            'Contacts, activities, tasks, and notes',
            'Notifications and real-time alerts',
            'Full-text and multi-field search across customers, leads, contacts, activities, and communication history (via Elasticsearch/OpenSearch)',
            'Dashboards and analytics for pipeline and account performance',
          ],
        },
        {
          title: 'AI & LLM-Powered Features',
          items: [
            'Automated customer summaries generated from account history and interaction logs',
            'Intelligent lead scoring and qualification',
            'AI-generated email drafts tailored to lead/customer context',
            'Sentiment analysis on customer communications',
            'Sales recommendations surfaced from historical patterns',
            'Natural-language CRM queries, letting users ask questions about their data conversationally',
            "A RAG (Retrieval-Augmented Generation) pipeline built over the platform's own CRM data and knowledge bases, grounding LLM responses in real, tenant-specific data while maintaining strict tenant-level authorization and data isolation",
          ],
        },
      ],
      architecture: [
        { label: 'API layer', description: 'REST APIs and backend services built with FastAPI, Pydantic, and SQLAlchemy using asynchronous Python, designed for high-throughput, low-latency workloads.' },
        { label: 'Event-driven processing', description: 'Apache Kafka powering asynchronous handling of high-volume CRM events, notifications, audit logs, analytics workloads, and AI processing pipelines.' },
        { label: 'Caching & performance', description: 'Redis for distributed caching, session management, rate limiting, and temporary data storage, reducing unnecessary database load.' },
        { label: 'Data layer', description: 'PostgreSQL with optimized schemas, indexes, joins, connection pooling, pagination, and bulk operations for large-scale CRM datasets.' },
        { label: 'Search', description: 'Elasticsearch/OpenSearch for fast, multi-field search across CRM entities.' },
        { label: 'Background processing', description: 'Celery and Kafka-based workers handling email processing, notifications, report generation, data ingestion, and AI workloads asynchronously.' },
        { label: 'Multi-tenancy', description: 'Logical data isolation, tenant-aware APIs, configurable business rules, and scalable per-tenant resource management.' },
        { label: 'Security & access control', description: 'RBAC, OAuth 2.0/OIDC, JWT authentication, tenant-level authorization, and audit logging.' },
        { label: 'Resilience', description: 'Rate limiting, retries, circuit breakers, idempotency guarantees, dead-letter queues, health checks, and graceful failure handling built into service-to-service communication.' },
        { label: 'Frontend', description: 'Responsive dashboards and CRM workflows built with React/Next.js, TypeScript, and a component-based UI architecture.' },
        { label: 'Infrastructure', description: 'Docker containerization for backend and frontend services, deployed on Kubernetes with horizontal scaling and rolling deployments.' },
        { label: 'Observability', description: 'Grafana dashboards, structured logging, and OpenTelemetry tracing for monitoring system health, API latency, throughput, errors, and distributed workflows.' },
        { label: 'Testing & CI/CD', description: 'Automated unit, integration, API, and end-to-end tests (Pytest, Playwright) integrated into GitHub Actions pipelines, including automated builds, security checks, and Kubernetes deployments.' },
        { label: 'Performance optimization', description: 'Async I/O, Redis caching, query optimization, connection pooling, batching, pagination, and Kafka-based asynchronous processing to sustain high-throughput workloads.' },
      ],
      roleIntro: 'This was a collaborative, cross-functional team effort. I contributed across all major layers of the platform rather than owning a single component in isolation:',
      role: [
        { title: 'Backend & APIs', description: 'I worked on REST API development and backend services using FastAPI, Pydantic, and SQLAlchemy, contributing to endpoints for lead, account, and sales pipeline management, with attention to async performance under concurrent load.' },
        { title: 'AI/LLM Features', description: "I contributed to the platform's AI capabilities, including work on the RAG pipeline that grounds LLM responses in tenant-specific CRM data, and on features like lead scoring, AI-generated customer summaries, and natural-language CRM queries — while ensuring tenant-level data isolation was respected in the AI layer." },
        { title: 'Frontend', description: "I contributed to building CRM dashboards and workflow views using React/Next.js and TypeScript, following the platform's component-based UI architecture." },
        { title: 'Infrastructure & DevOps', description: 'I worked on containerizing services with Docker, contributed to Kubernetes deployment configuration, and worked within the GitHub Actions CI/CD pipeline covering testing and deployment automation. I also contributed to observability work using Grafana and OpenTelemetry for monitoring API performance and system health.' },
        { title: 'Data & Messaging', description: 'I worked with PostgreSQL schema design and query optimization, and contributed to event-driven workflows built on Apache Kafka for asynchronous processing of CRM events and AI workloads.' },
      ],
      roleClosing: 'My contribution spanned the stack rather than being confined to one layer, which gave me hands-on exposure to how a multi-tenant, AI-augmented enterprise system fits together end-to-end — from database schema and async API design, through event-driven infrastructure, to the frontend surfaces users actually interact with.',
      outcome: 'The platform delivered a working, production-oriented CRM system covering the full lead-to-close workflow, augmented with AI features that reduced manual effort in summarization, lead prioritization, and data lookup. Working across the stack on this project gave me practical experience with the real engineering challenges of multi-tenant SaaS architecture: data isolation, async event-driven design, and safely scoping AI features to tenant-specific data.',
      note: 'This project was built by a cross-functional engineering team. The Project Overview above describes the platform as a whole; the "My Role & Contribution" section reflects specifically what I personally worked on.',
    },
  },
  {
    id: 2,
    slug: 'enterprise-enrollment-portal',
    name: 'Enterprise Enrollment Portal – Insurance & Payroll Platform',
    description: 'Full-stack insurance enrollment & payroll platform (Django, React, React Native) deployed on Azure with autoscaling up to 400 containers, handling 16M+ requests across regions with automated disaster-recovery backups.',
    badges: ['Django', 'React.js', 'React Native', 'Azure'],
    tags: ['Insurance', 'Payroll', 'Cloud Scale', 'Enterprise'],
    previewBg: 'linear-gradient(160deg, #1c1c2e 0%, #2c2c3e 50%, #1a1a2e 100%)',
    featured: true,
  },
  {
    id: 3,
    slug: 'ai-cognitive-search-system',
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
    slug: 'ai-audit-management-system',
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
    slug: 'ai-interview-agent',
    name: 'AI Interview Agent – Autonomous Candidate Screening Bot',
    description: 'Autonomous AI agent that joins live candidate interviews, conducts real-time conversational screening with barge-in support and eye-tracking engagement analysis, then delivers structured feedback — saving $10,000/month vs. a third-party service.',
    badges: ['Python', 'Playwright', 'ElevenLabs', 'Azure OpenAI'],
    tags: ['Autonomous Agent', 'Voice AI', 'Computer Vision', 'Cost Savings'],
    previewBg: 'linear-gradient(160deg, #1a0d20 0%, #3a1a4a 50%, #100815 100%)',
    featured: false,
  },
  {
    id: 6,
    slug: 'kiosk-forecasting-pipeline',
    name: 'Temporal Graph-Based Kiosk Forecasting Pipeline',
    description: 'Python time-series pipeline that ingests kiosk data every 15 days to forecast per-kiosk earnings and traffic, storing results in a temporal knowledge graph in Neo4j — cutting manual analysis effort to 5% of prior levels.',
    badges: ['Python', 'Neo4j', 'Time-Series Forecasting', 'Knowledge Graph'],
    tags: ['Forecasting', 'Automation', 'Temporal Data', 'Business Impact'],
    previewBg: 'linear-gradient(160deg, #0a1a0a 0%, #1a3a1a 50%, #050f05 100%)',
    featured: false,
  },
  {
    id: 7,
    slug: 'insurance-plan-advisor-chat-assistant',
    name: 'Insurance Plan Advisor Chat Assistant',
    description: 'Chat assistant embedded in an existing insurance portal that helps users choose plans, calculate coverage, and get personalized recommendations — increasing customer satisfaction by 35% and cutting enrollment completion time by 47%.',
    badges: [],
    tags: ['Conversational AI', 'Insurance', 'Personalization', 'Customer Experience'],
    previewBg: 'linear-gradient(160deg, #1a1200 0%, #3d2b00 50%, #110c00 100%)',
    featured: false,
  },
  {
    id: 8,
    slug: 'ai-tender-rfp-management-system',
    name: 'AI-Based Tender & RFP Management System',
    description: 'Full-stack AI-powered Tender & RFP management system (Django, React) on Azure with automated document parsing, evaluation, and response generation using NLP and Pinecone vector search with OpenAI retrieval — cutting turnaround from days to hours.',
    badges: ['Django', 'React', 'Pinecone', 'OpenAI'],
    tags: ['NLP', 'Document Automation', 'Vector Search', 'Enterprise Scale'],
    previewBg: 'linear-gradient(160deg, #0f1a0f 0%, #1e3a1e 50%, #080f08 100%)',
    featured: false,
  },
  {
    id: 9,
    slug: 'face-recognition-attendance-system',
    name: 'Face Recognition Attendance & Time Management System',
    description: 'End-to-end face-recognition attendance portal and mobile app (FastAPI, React, React Native, SQL Server) with an integrated Time Master module cross-validating logged hours against captured attendance — deployed org-wide on in-house servers.',
    badges: ['FastAPI', 'React', 'React Native', 'SQL Server'],
    tags: ['Computer Vision', 'Face Recognition', 'Attendance', 'Enterprise'],
    previewBg: 'linear-gradient(160deg, #1a2535 0%, #2a3d52 50%, #111c28 100%)',
    featured: false,
  },
];

export const featuredProjects = projects.filter(p => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export const tagCounts: Record<string, number> = projects.reduce((acc, p) => {
  p.tags.forEach(t => { acc[t] = (acc[t] ?? 0) + 1; });
  return acc;
}, {} as Record<string, number>);

// Only tags shared by 2+ projects make useful filter chips; rarer tags are still searchable by text.
export const projectFilterTags = [
  'All',
  ...Object.keys(tagCounts).filter(t => tagCounts[t] >= 2).sort(),
];
