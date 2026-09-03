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

export interface ProjectDetailStat {
  value: string;
  label: string;
}

export interface ProjectDetailGridSection {
  title?: string;
  heading?: string;
  items: ProjectDetailArchItem[];
  closing?: string[];
}

export interface ProjectDetail {
  tagline?: string;
  period?: string;
  fullStack: string[];
  overviewIntro: string;
  overviewPoints?: ProjectDetailArchItem[];
  overviewClosing?: string[];
  capabilityGroups: ProjectDetailGroup[];
  functionsSection?: ProjectDetailGridSection;
  architectureTitle?: string;
  architectureHeading?: string;
  architecture: ProjectDetailArchItem[];
  architectureClosing?: string[];
  highlights?: ProjectDetailArchItem[];
  roleIntro?: string;
  role: ProjectDetailRole[];
  roleClosing?: string[];
  outcome: string;
  outcomeStats?: ProjectDetailStat[];
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
      roleClosing: ['My contribution spanned the stack rather than being confined to one layer, which gave me hands-on exposure to how a multi-tenant, AI-augmented enterprise system fits together end-to-end — from database schema and async API design, through event-driven infrastructure, to the frontend surfaces users actually interact with.'],
      outcome: 'The platform delivered a working, production-oriented CRM system covering the full lead-to-close workflow, augmented with AI features that reduced manual effort in summarization, lead prioritization, and data lookup. Working across the stack on this project gave me practical experience with the real engineering challenges of multi-tenant SaaS architecture: data isolation, async event-driven design, and safely scoping AI features to tenant-specific data.',
      note: 'This project was built by a cross-functional engineering team. The Project Overview above describes the platform as a whole; the "My Role & Contribution" section reflects specifically what I personally worked on.',
      diagrams: [
        {
          label: 'Request Flow',
          image: '/diagrams/crm-architecture.svg',
          caption: 'A request enters through the FastAPI layer, then fans out to a cached PostgreSQL read/write path, a RAG retrieval path through the vector DB to the LLM, and an async event path through Kafka to Celery workers.',
        },
      ],
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
    detail: {
      tagline: "A full-stack platform combining group insurance enrollment and payroll management into a single system, so an organization's HR/finance team never has to stitch together separate vendor tools.",
      fullStack: ['Python', 'Django', 'React.js', 'React Native', 'Docker', 'Azure Container Apps', 'PostgreSQL'],
      overviewIntro: 'The Enterprise Enrollment Portal is a full-stack platform built for a client operating in the group insurance and payroll space. The business model serves two connected needs for organizations:',
      overviewPoints: [
        { label: 'Group Insurance Enrollment', description: 'An organization looking to provide health/group insurance to its employees works through the platform to select plans, enroll employees, and manage coverage.' },
        { label: 'Payroll Management', description: 'The same platform offers a ready-made payroll management system that organizations can adopt to run their complete payroll cycle, rather than needing separate software for insurance enrollment and payroll processing.' },
      ],
      overviewClosing: ["By combining both into one platform, an organization's HR/finance team can manage employee benefits enrollment and payroll operations from a single system instead of stitching together multiple vendors."],
      capabilityGroups: [],
      architecture: [
        { label: 'Backend', description: 'Django, serving as the core application and business logic layer for enrollment workflows, payroll processing rules, and data management.' },
        { label: 'Web frontend', description: 'React.js, providing the primary web application used by organization administrators to manage enrollment and payroll.' },
        { label: 'Mobile application', description: 'React Native, extending access to employees and administrators on mobile devices.' },
        { label: 'Deployment', description: 'Azure Container Apps, with horizontal autoscaling architected to scale up to 400 concurrent containers based on real-time traffic, deployed across multiple geographic regions to serve users across different parts of the world with lower latency and regional redundancy.' },
        { label: 'Data layer', description: 'A large-scale PostgreSQL deployment, backed by automated disaster-recovery backups to protect payroll and enrollment data — data categories where accuracy and durability are business-critical (payroll errors and lost enrollment records both have direct financial and compliance consequences).' },
        { label: 'Traffic & reliability', description: 'The system was architected to handle peak traffic reaching approximately 16 million requests, with full request traceability and logging built in to support debugging, auditing, and compliance needs across the distributed, multi-region deployment.' },
      ],
      highlights: [
        { label: 'Dual-purpose platform design', description: 'Architecting a single system to cleanly serve two related but distinct workflows (insurance enrollment and payroll management) without the two becoming tangled in the data model or business logic.' },
        { label: 'Multi-region horizontal scaling', description: 'Designing the container autoscaling strategy so the platform could elastically respond to traffic spikes (e.g., open enrollment periods, payroll run dates) rather than running on fixed, over-provisioned capacity.' },
        { label: 'Data durability for compliance-sensitive workloads', description: 'Payroll and insurance data carries real compliance and financial stakes, which shaped decisions around backup automation and disaster recovery rather than treating it as an afterthought.' },
      ],
      roleIntro: 'I worked on this platform end-to-end across the stack:',
      role: [
        { title: 'Backend Development', description: 'Built the core enrollment and payroll logic in Django.' },
        { title: 'Frontend Development', description: 'Built the React.js web application used by organization administrators.' },
        { title: 'Mobile Development', description: 'Extended the platform to mobile users using React Native.' },
        { title: 'Infrastructure & Deployment', description: 'Set up the platform on Azure Container Apps with horizontal autoscaling and multi-region deployment to support geographically distributed traffic.' },
        { title: 'Data Reliability Engineering', description: 'Worked on the PostgreSQL data layer and its automated disaster-recovery backup strategy, given the business-critical nature of payroll and insurance data.' },
        { title: 'Observability', description: 'Built in request traceability and logging across the distributed system to support debugging and auditability at scale.' },
      ],
      outcome: 'The platform gave organizations a single system to manage employee group insurance enrollment and complete payroll cycles, reducing the need to operate separate vendor tools for each function. The infrastructure was built to elastically handle high-traffic periods (such as enrollment windows) across multiple regions while maintaining data durability guarantees appropriate for payroll and insurance records.',
      note: "Traffic and scaling figures (400 concurrent containers, ~16M requests) reflect the system's architected capacity, not necessarily sustained real-world usage at all times.",
    },
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
    detail: {
      tagline: 'A hybrid cognitive search platform processing and retrieving from 1.5M+ multimodal documents, combining vector-based RAG with GraphRAG to answer questions plain semantic search struggles with.',
      fullStack: ['Azure AI Search', 'Neo4j Knowledge Graphs', 'LangGraph', 'Databricks MLflow', 'Azure Application Insights', 'Salesforce', 'MuleSoft'],
      overviewIntro: 'I built a hybrid cognitive search platform for CSA Group, designed to process and retrieve information from over 1.5 million multimodal documents with high accuracy and low latency. The system combined traditional vector-based RAG with GraphRAG — retrieval augmented by a knowledge graph structure — to handle queries that plain vector search struggles with: questions requiring an understanding of relationships between entities, not just semantic similarity between text chunks.',
      overviewClosing: ['The platform enabled both natural-language and structured search over CSA Group’s document corpus, with LLM-driven query understanding translating user questions into the appropriate retrieval strategy — vector search, graph traversal, or a combination of both (the "OmniRAG" approach).'],
      capabilityGroups: [],
      architecture: [
        { label: 'Vector retrieval', description: 'Azure AI Search provided the core vector search layer, indexing embeddings across the 1.5M+ document corpus for semantic retrieval.' },
        { label: 'Graph retrieval', description: 'A Neo4j knowledge graph captured entity relationships within the document corpus, enabling GraphRAG queries — retrieval that traverses relationships (e.g., which contracts reference this clause, and which of those were amended after 2023) rather than relying purely on embedding similarity.' },
        { label: 'Query orchestration', description: 'LangGraph was used to orchestrate the query-understanding and retrieval flow, routing incoming queries to the appropriate retrieval path(s) based on query intent.' },
        { label: 'Integration', description: 'The platform integrated with Salesforce and MuleSoft, allowing search results and retrieval capability to surface within CSA Group’s existing business systems rather than requiring a separate standalone search tool.' },
        { label: 'Monitoring & tracking', description: 'Databricks MLflow was used for tracking model/pipeline experiments, and Azure App Insights provided operational monitoring of the deployed system.' },
      ],
      highlights: [
        { label: 'Why hybrid retrieval', description: 'Pure vector search is strong at semantic similarity but weak at multi-hop relational reasoning (e.g., documents connected to X, which is connected to Y). Combining vector search with a knowledge graph let the system answer both kinds of queries without forcing every question through a single retrieval strategy.' },
        { label: 'Cost and latency at scale', description: 'Retrieval infrastructure was optimized to cut infrastructure costs by 80% and accelerate retrieval speed by 60%, at the scale of 1.5M+ documents — meaningful given that naive RAG setups tend to get more expensive and slower, not less, as document volume grows.' },
        { label: 'Embedding search into existing workflows', description: 'Rather than building a standalone search UI CSA Group’s teams would need to adopt separately, integrating with Salesforce and MuleSoft meant the search capability showed up where people already worked.' },
      ],
      roleIntro: 'I was the primary builder of this system, individually responsible for the end-to-end design and implementation:',
      role: [
        { title: 'Hybrid Retrieval Architecture', description: 'Designed and built the hybrid retrieval architecture, combining Azure AI Search vector retrieval with Neo4j-based GraphRAG.' },
        { title: 'Knowledge Graph Construction Pipeline', description: 'Built the pipeline that transformed the document corpus into a queryable Neo4j graph of entities and relationships.' },
        { title: 'Query Orchestration with LangGraph', description: 'Implemented the logic for routing queries between vector search, graph traversal, and combined retrieval strategies.' },
        { title: 'Salesforce & MuleSoft Integration', description: 'Integrated the platform so retrieval capability was accessible from within CSA Group’s existing workflows rather than as an isolated tool.' },
        { title: 'Monitoring & Experiment Tracking', description: 'Set up monitoring and experiment tracking using Azure App Insights and Databricks MLflow, to maintain visibility into both system performance and retrieval quality over time.' },
      ],
      outcome: 'The system delivered a 1.5M+ document cognitive search platform for CSA Group with meaningfully lower infrastructure costs (80% reduction) and faster retrieval (60% acceleration) compared to the prior approach, while supporting both natural-language and structured queries through a single interface embedded in existing business tools.',
    },
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
    detail: {
      tagline: "A multi-agent orchestration system that automates assessor-to-audit matching for CSA Group's MDR-based audit process, reasoning over skills, availability, performance history, and interpersonal fit rather than simple keyword matching.",
      fullStack: ['LangGraph', 'LangChain', 'Azure AI Foundry', 'Anthropic', 'Django', 'Azure DevOps', 'Azure AI Search', 'Knowledge Graphs'],
      overviewIntro: 'CSA Group runs an MDR-based (Medical Device Regulation) audit system, where the core operational challenge is assigning the right auditor to the right audit — matching audit requirements against assessor skills, availability, performance history, and interpersonal compatibility with the auditee. Done manually, this kind of matching is slow, inconsistent, and hard to scale as audit volume grows.',
      overviewClosing: ['I led a team of 5 developers building a multi-agent orchestration system to automate and optimize this process. Rather than a single monolithic matching algorithm, the system used agent-based reasoning — coordinated through LangGraph and LangChain — combined with embeddings, NLP, and knowledge graphs to reason about audit requirements and assessor fit in a context-aware way, rather than reducing the problem to simple keyword or rule-based matching.'],
      capabilityGroups: [],
      architecture: [
        { label: 'Multi-agent orchestration', description: 'LangGraph and LangChain coordinated the reasoning pipeline, breaking the assessor-matching problem into stages an agent-based system could reason through — parsing audit requirements, retrieving relevant assessor profiles, and scoring fit across multiple dimensions (skills, availability, performance history, interpersonal compatibility).' },
        { label: 'LLM backbone', description: 'Anthropic models powered the reasoning and language-understanding components of the agent system.' },
        { label: 'Knowledge retrieval', description: "RAG and Graph RAG over a knowledge graph of audit history, assessor profiles, and past performance data enabled context-aware retrieval — the system could reason about why a given assessor was or wasn't a good fit, not just return a similarity score." },
        { label: 'Search infrastructure', description: 'Azure AI Search combined with Azure Blob Storage handled document and profile retrieval at scale.' },
        { label: 'Backend', description: 'Django served as the application layer coordinating the workflow between the audit intake process, the agent orchestration pipeline, and the resulting audit team formation.' },
        { label: 'CI/CD', description: 'Azure DevOps pipelines handled continuous integration and deployment for the system.' },
        { label: 'Monitoring', description: 'Azure App Insights provided operational monitoring across the pipeline.' },
      ],
      architectureClosing: ["The system was architected to scale from an initial base of 5,000 users up to 10M+ users in terms of infrastructure capacity — designed so the underlying architecture wouldn't need to be rebuilt as CSA Group's audit volume grew, even though day-to-day real usage sits well below that ceiling today."],
      highlights: [
        { label: 'Fair, explainable matching', description: 'Because the system reasoned over multiple dimensions (skills, availability, performance, interpersonal compatibility) rather than a single score, audit team formation decisions were more defensible and auditable than a black-box ranking would have been — important in a regulated (MDR) context where audit integrity itself matters.' },
        { label: 'Agent-based decomposition', description: 'Breaking the matching problem into discrete reasoning stages coordinated via LangGraph, rather than one large prompt or a single ML model, made the system easier to debug, extend, and reason about as requirements evolved.' },
        { label: 'Designing for headroom, not just current load', description: 'Architecting for a 5,000-to-10M+ user scaling range meant infrastructure decisions (data storage, retrieval indexing, agent orchestration throughput) were made with growth in mind from the start.' },
      ],
      roleIntro: 'I led a team of 5 developers on this project, with responsibilities spanning both technical leadership and hands-on architecture:',
      role: [
        { title: 'Technical Leadership', description: "Directed the overall system architecture and coordinated the team's work across the agent orchestration, backend, and infrastructure layers." },
        { title: 'Agent Orchestration Design', description: 'Architected the multi-agent reasoning pipeline using LangGraph and LangChain, defining how the system broke down and reasoned through the assessor-matching problem.' },
        { title: 'Knowledge Graph & Retrieval', description: 'Worked on the RAG/Graph RAG retrieval layer, structuring the knowledge graph of audit and assessor data that the agents reasoned over.' },
        { title: 'Backend Integration', description: 'Oversaw the Django-based backend that tied the audit intake workflow to the AI reasoning pipeline and surfaced results for audit team formation.' },
        { title: 'CI/CD & Scalability', description: "Guided the Azure DevOps CI/CD setup and the infrastructure decisions behind the system's scaling architecture." },
      ],
      outcome: "The system reduced audit turnaround time by 75%, replacing a manual, inconsistent assessor-matching process with a context-aware, multi-agent system capable of reasoning about audit requirements and assessor fit at scale — while being architected with infrastructure headroom to grow well beyond CSA Group's current audit volume.",
    },
  },
  {
    id: 5,
    slug: 'ai-interview-agent',
    name: 'AI Interview Agent – Autonomous Candidate Screening Bot',
    organization: 'InfoBeans (Offsite)',
    description: 'Autonomous AI agent that joins live candidate interviews, conducts real-time conversational screening with barge-in support and eye-tracking engagement analysis, then delivers structured feedback — saving $10,000/month vs. a third-party service.',
    badges: ['Python', 'Playwright', 'ElevenLabs', 'Azure OpenAI'],
    tags: ['Autonomous Agent', 'Voice AI', 'Computer Vision', 'Cost Savings'],
    previewBg: 'linear-gradient(160deg, #1a0d20 0%, #3a1a4a 50%, #100815 100%)',
    featured: false,
    detail: {
      tagline: "An autonomous AI agent that conducts developer candidate screening interviews without a human interviewer present — analyzing the job description, joining the live call, running a real-time conversational screening, and generating structured feedback.",
      period: 'Mar 2025 – May 2025 · Full-Time',
      fullStack: ['Python', 'FastAPI', 'Azure Virtual Machines', 'Playwright', 'Google STT', 'ElevenLabs', 'Azure OpenAI', 'Gemini AI'],
      overviewIntro: "I built an autonomous AI agent that conducts developer candidate screening interviews without a human interviewer present. The system analyzes the job description for the role being hired for, schedules the interview, and then autonomously joins the live video call to conduct a real-time, conversational screening — functioning as a full replacement for the first-round technical screening call that would otherwise require a human engineer's time.",
      capabilityGroups: [],
      architectureTitle: 'How It Works',
      architectureHeading: 'From job description to feedback report',
      architecture: [
        { label: 'Pre-interview', description: 'The agent analyzes the job description to determine what the interview should probe for, and handles scheduling the interview with the candidate.' },
        { label: 'Joining the call', description: 'Using Playwright automation running on Azure Virtual Machines, the agent autonomously joins the live meeting as a participant — no human needs to start or host the call.' },
        { label: 'Real-time conversation', description: "Google STT (speech-to-text) and ElevenLabs (text-to-speech) handle the voice interface, while Azure OpenAI and Gemini power the conversational reasoning — generating adaptive follow-up questions based on the candidate's responses rather than following a rigid script. The system supports barge-in, meaning candidates can interrupt and respond naturally mid-question, similar to a real conversational interview rather than a stilted Q&A." },
        { label: 'Engagement tracking', description: 'The system tracks candidate eye movement during the call as a signal for engagement and attentiveness during the interview.' },
        { label: 'Post-interview', description: "The agent automatically evaluates the candidate's performance and generates structured, detailed feedback for the hiring team — replacing the manual write-up a human interviewer would normally produce after a screening call." },
      ],
      highlights: [
        { label: 'Barge-in support', description: 'A deliberate design choice to make the interview feel conversational rather than robotic — candidates could interrupt and respond naturally, which matters for getting a realistic read on communication ability during a screening call.' },
        { label: 'Multi-provider voice/LLM stack', description: "Combining Google STT, ElevenLabs TTS, Azure OpenAI, and Gemini meant the system wasn't dependent on a single vendor for its core conversational capability." },
        { label: 'Fully autonomous call participation', description: "The hardest part of the system wasn't the conversation itself but getting the agent to reliably join and behave correctly as a participant in a live video call via browser automation — a much less standardized problem than API-based LLM interaction." },
      ],
      roleIntro: 'I built this system individually, covering the full pipeline:',
      role: [
        { title: 'Automation Layer', description: 'Built the Playwright-based automation that lets the agent autonomously join and participate in live video interviews, running on Azure Virtual Machines.' },
        { title: 'Conversational Pipeline', description: 'Integrated Google STT and ElevenLabs TTS for the voice interface, and built the conversational logic (with barge-in support) using Azure OpenAI and Gemini for adaptive, context-aware questioning.' },
        { title: 'Engagement Signal', description: 'Implemented eye-movement tracking during the call as an additional signal fed into the candidate evaluation.' },
        { title: 'Feedback Generation', description: 'Built the automated evaluation and feedback pipeline that summarizes candidate performance into a structured report for the hiring team.' },
        { title: 'Backend', description: 'Built the service layer with FastAPI to coordinate scheduling, the live-call automation, and feedback generation into one working pipeline.' },
      ],
      outcome: 'The system eliminated manual developer screening rounds entirely, replacing them with an autonomous first-round interview process.',
      outcomeStats: [
        { value: '~90%', label: 'Reduction in developer interview time for the hiring team' },
        { value: '$10K/mo', label: 'Savings vs. the previously used third-party screening service' },
      ],
    },
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
    detail: {
      tagline: 'A Python time-series pipeline that automatically forecasts per-kiosk earnings and traffic on a 15-day cycle, backed by a temporal knowledge graph in Neo4j built specifically to reason about change over time.',
      fullStack: ['Python', 'Neo4j', 'Temporal Knowledge Graph', 'Time-Series Forecasting'],
      overviewIntro: "A client operating a network of physical kiosks needed a way to forecast per-kiosk earnings and foot traffic to support business planning — deciding where to invest, which locations were underperforming, and how demand shifted over time. Previously, this analysis was done manually, with an analyst team reviewing kiosk performance data by hand on an ongoing basis — a process that didn't scale well as the number of kiosks and the volume of historical data grew.",
      overviewClosing: [
        'I built a Python-based time-series pipeline that automatically fetches client kiosk data on a recurring 15-day cycle and runs forecasting analysis to project per-kiosk earnings and traffic, removing the need for manual, recurring analysis of the same data.',
        'The more technically interesting part of this project was the data layer. A standard relational or static graph schema is good at representing what is connected to what, but not naturally suited to representing how those relationships and values change over time. Since the whole point of the system was forecasting — which is inherently about change over time — I converted the standard static graph schema into a temporal knowledge graph in Neo4j, where relationships and node states are indexed by time rather than treated as fixed facts.',
        'This meant the graph could represent questions like "how did this kiosk’s earnings trend over the last six months relative to nearby kiosks" as a native graph query, rather than requiring a separate time-series database bolted on alongside a disconnected graph of kiosk relationships (location, region, kiosk type, etc.).',
      ],
      capabilityGroups: [],
      architecture: [
        { label: 'Data ingestion', description: 'A Python pipeline scheduled to fetch client kiosk data automatically every 15 days.' },
        { label: 'Forecasting', description: 'Time-series analysis run on the ingested data to project per-kiosk earnings and traffic forward.' },
        { label: 'Storage', description: 'Results and historical data stored in a temporal knowledge graph in Neo4j, with the schema specifically redesigned from a static structure into a time-indexed one to natively support trend and change-over-time queries.' },
      ],
      highlights: [
        { label: 'Static-to-temporal schema migration', description: 'Redesigning an existing graph schema to be time-aware is a non-trivial data modeling problem — it affects how every relationship and node property is queried, not just how new data is written.' },
        { label: 'Recurring, unattended pipeline', description: 'Building the system to run automatically every 15 days meant designing for reliability and failure handling without a human checking in on every run, unlike the manual process it replaced.' },
        { label: 'Business-driven data modeling', description: "The choice of a temporal graph wasn't a technology-first decision — it followed directly from the business need (understanding trends, not just current-state snapshots), which is what made the schema redesign worth the added complexity." },
      ],
      roleIntro: 'I built this pipeline individually, end-to-end:',
      role: [
        { title: 'Automated Data-Fetching Pipeline', description: 'Designed and built the pipeline, scheduled on a 15-day cycle to pull client kiosk data without manual intervention.' },
        { title: 'Time-Series Forecasting Logic', description: 'Built the logic to project per-kiosk earnings and traffic.' },
        { title: 'Temporal Knowledge Graph Schema', description: 'Designed and implemented the schema in Neo4j, converting the existing static graph structure into a time-indexed one capable of representing how kiosk performance and relationships changed over time.' },
        { title: 'Validation', description: "Validated the pipeline's output against the manual analysis process it was replacing, to confirm forecasting quality before the manual process was scaled back." },
      ],
      outcome: 'The pipeline reduced manual analysis effort to just 5% of prior levels, freeing the analyst team from recurring manual kiosk performance reviews, with measurable business impact within the first year of deployment.',
    },
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
    detail: {
      tagline: "A conversational AI assistant embedded directly into an existing insurance portal's enrollment flow, helping users understand plans, calculate coverage, and get personalized recommendations without leaving the page.",
      fullStack: ['Conversational AI', 'LLM-Powered Chat'],
      overviewIntro: 'Choosing an insurance plan is a genuinely confusing task for most users — comparing coverage tiers, understanding deductibles, and figuring out which plan actually fits their situation usually means either reading dense plan documentation or calling support. This friction shows up directly in the numbers: users abandon enrollment, pick a plan that doesn’t fit their needs, or need human support to get through a process that should be self-serve.',
      overviewClosing: ['I built a chat assistant and plugged it directly into an existing insurance portal, so users could get plan guidance in the same flow where they were already enrolling — rather than being sent to a separate help center or FAQ page.'],
      capabilityGroups: [],
      architectureTitle: 'What the Assistant Does',
      architectureHeading: 'Built around the actual point of confusion',
      architecture: [
        { label: 'Plan selection guidance', description: 'Helps users understand the differences between available plans in plain language, based on their situation rather than generic marketing copy.' },
        { label: 'Coverage calculation', description: 'Calculates expected coverage for a user’s specific circumstances, rather than leaving them to interpret coverage tables themselves.' },
        { label: 'Personalized recommendations', description: 'Surfaces plan recommendations tailored to what the user actually needs.' },
        { label: 'Upsell suggestions', description: "Identifies relevant upgrade options (e.g., additional coverage) based on the user's profile, presented as a natural recommendation within the conversation rather than a separate sales prompt." },
      ],
      architectureClosing: ["Rather than building a standalone tool, the assistant was embedded directly into the existing insurance portal's enrollment flow — meeting users at the point where they were already making a decision, instead of requiring them to leave the portal to get help."],
      highlights: [
        { label: 'Reducing decision friction, not just answering questions', description: 'The assistant was designed around the actual point of user drop-off (confusion during plan selection and enrollment), not just as a general-purpose FAQ bot.' },
        { label: 'Upselling without feeling like a sales pitch', description: 'Framing upgrade suggestions as part of the natural advisory conversation, rather than a separate promotional interruption, was a deliberate part of the interaction design.' },
        { label: 'In-flow integration', description: "Embedding directly into the existing portal's enrollment process, rather than requiring users to switch context to a separate support tool, was central to why the assistant actually got used during the enrollment moment rather than being ignored." },
      ],
      roleIntro: 'I built this chat assistant and its integration into the existing portal:',
      role: [
        { title: 'Conversational Flow Design', description: 'Designed the flow for plan selection, coverage calculation, and recommendations, aimed at replacing what would otherwise require reading plan documentation or contacting support.' },
        { title: 'Coverage Calculation Logic', description: "Built the logic translating a user's inputs into concrete, understandable coverage figures rather than generic plan descriptions." },
        { title: 'Recommendation & Upsell Logic', description: 'Built the logic surfacing relevant plan and coverage suggestions based on user context.' },
        { title: 'Portal Integration', description: 'Embedded the assistant into the live enrollment flow of the existing insurance portal rather than shipping it as a disconnected tool.' },
      ],
      outcome: 'The assistant made plan selection easier and enrollment faster by addressing confusion directly within the flow — users were both happier with the process and able to get through enrollment faster.',
      outcomeStats: [
        { value: '+35%', label: 'Increase in customer satisfaction' },
        { value: '-47%', label: 'Reduction in enrollment completion time' },
      ],
    },
  },
  {
    id: 8,
    slug: 'ai-tender-rfp-management-system',
    name: 'AI-Based Tender & RFP Management System',
    organization: 'International SOS',
    description: 'Full-stack AI-powered Tender & RFP management system (Django, React) on Azure with automated document parsing, evaluation, and response generation using NLP and Pinecone vector search with OpenAI retrieval — cutting turnaround from days to hours.',
    badges: ['Django', 'React', 'Pinecone', 'OpenAI'],
    tags: ['NLP', 'Document Automation', 'Vector Search', 'Enterprise Scale'],
    previewBg: 'linear-gradient(160deg, #0f1a0f 0%, #1e3a1e 50%, #080f08 100%)',
    featured: false,
    detail: {
      tagline: 'A full-stack AI-powered Tender & RFP Management System for International SOS that automates the entire pipeline — from document parsing through eligibility scoring to draft proposal generation.',
      fullStack: ['Django', 'React', 'Azure', 'Pinecone Vector DB', 'OpenAI', 'Docker', 'Power BI'],
      overviewIntro: "Responding to tenders and RFPs (Request for Proposals) is a document-heavy, deadline-driven process: each opportunity comes with lengthy documents specifying criteria, clauses, financial requirements, and deadlines, and a business has to determine — quickly — whether it's even eligible to bid, and if so, assemble a compliant proposal before the deadline. Done manually, this process is slow and easy to get wrong, since it depends on someone reading through dense documents and catching every relevant detail.",
      overviewClosing: ['I built a full-stack, end-to-end AI-powered Tender & RFP Management System for International SOS to automate this pipeline — from document parsing through to draft proposal generation.'],
      capabilityGroups: [],
      functionsSection: {
        title: 'What the System Does',
        heading: 'From raw document to draft proposal',
        items: [
          { label: 'Document parsing & extraction', description: 'Automatically extracts key criteria, clauses, financial requirements, and deadlines from tender/RFP documents using NLP and document extraction.' },
          { label: 'Eligibility & risk scoring', description: 'Uses Pinecone vector search combined with OpenAI-based retrieval to match extracted tender requirements against the business’s own capabilities, generating real-time eligibility scores and risk insights — answering "should we even bid on this" quickly instead of after days of manual review.' },
          { label: 'Automated proposal drafting', description: 'Automatically fills forms and generates draft proposals based on the extracted requirements and matched capabilities, cutting the turnaround from days to hours.' },
          { label: 'Reporting', description: 'Power BI dashboards for visibility into tender pipeline status and outcomes.' },
        ],
      },
      architecture: [
        { label: 'Backend', description: 'Django, handling the core application logic, document processing pipeline, and API layer.' },
        { label: 'Frontend', description: 'React, providing the interface for reviewing extracted requirements, eligibility scores, and generated draft proposals.' },
        { label: 'Retrieval layer', description: 'Pinecone vector database paired with OpenAI-based retrieval for matching tender requirements against business capability data.' },
        { label: 'Document intelligence', description: 'Azure AI Services/Document Intelligence for structured extraction from tender and RFP documents.' },
        { label: 'Infrastructure', description: "Docker-containerized services deployed on Azure, supporting scalable, high-volume document processing. The system's CI/CD pipelines and infrastructure were designed around complete HLD/LLD (high-level and low-level design) documentation, and architected with capacity to scale to 20M+ users." },
      ],
      highlights: [
        { label: 'From unstructured documents to structured decisions', description: "The hardest part of this system wasn't any single component but the pipeline as a whole — going from a raw, unstructured tender document to a structured eligibility score and a usable draft proposal, with each stage (extraction → matching → scoring → drafting) depending on the quality of the stage before it." },
        { label: 'Retrieval-based capability matching', description: 'Rather than hardcoding rules for what makes a tender a good fit, using vector search over the business’s own capability data meant the matching logic could generalize across different tender formats and requirement phrasing.' },
        { label: 'Designed for scale from the start', description: "Complete HLD/LLD documentation and an architecture built for 20M+ user capacity meant the system wasn't a one-off script — it was built as durable infrastructure meant to keep working as tender volume grew." },
      ],
      roleIntro: 'I built this system end-to-end:',
      role: [
        { title: 'Full-Stack Architecture', description: 'Designed the architecture, including the HLD/LLD system design covering both backend (Django) and frontend (React) layers.' },
        { title: 'Document Parsing & Extraction', description: 'Built the pipeline using NLP and document extraction to pull structured data (criteria, clauses, financials, deadlines) out of unstructured tender/RFP documents.' },
        { title: 'Eligibility & Risk Scoring Engine', description: 'Built the engine combining Pinecone vector search with OpenAI-based retrieval to match tender requirements against business capability data.' },
        { title: 'Proposal Automation', description: 'Built the automated form-filling and draft proposal generation pipeline.' },
        { title: 'Containerized Deployment', description: 'Set up deployment with Docker on Azure and the CI/CD pipelines supporting the system.' },
        { title: 'Power BI Reporting', description: 'Built reporting for pipeline visibility.' },
      ],
      outcome: 'The system reduced proposal turnaround from days to hours, giving International SOS the ability to assess tender eligibility and produce draft responses far faster than the manual process it replaced, while Power BI reporting gave visibility into the tender pipeline as a whole.',
      note: 'The "20M+ users" figure describes the system’s architected scaling capacity, not current real-world usage volume.',
    },
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
    detail: {
      tagline: 'An end-to-end, organization-wide attendance system using face recognition for check-in/check-out, paired with a Time Master module that cross-validates logged working hours against real biometric attendance data.',
      fullStack: ['Python', 'FastAPI', 'SQL Server', 'React', 'React Native'],
      overviewIntro: 'Traditional attendance tracking — swipe cards, manual sign-in sheets, or biometric fingerprint scanners — tends to be either easy to game (buddy punching), inconvenient, or dependent on dedicated hardware at every entry point. I built an end-to-end attendance system that used face recognition for check-in/check-out instead, paired with an integrated time-tracking module, and rolled it out for use across the entire organization. The system had two connected parts:',
      overviewPoints: [
        { label: 'Attendance Capture', description: 'A portal and mobile app where employees check in and out using face recognition, removing the need for physical cards or manual sign-in.' },
        { label: 'Time Master Module', description: "A working-hours tracking system that logs employee hours and cross-validates them against the captured attendance data — so working-hour calculations weren't based on self-reported time, but reconciled against the actual, biometrically-verified check-in/check-out events." },
      ],
      capabilityGroups: [],
      architecture: [
        { label: 'Backend', description: "FastAPI (Python), handling face recognition processing, attendance event logging, and the business logic behind the Time Master module's hour calculations and cross-validation." },
        { label: 'Data layer', description: 'SQL Server, storing attendance records, employee data, and working-hour logs.' },
        { label: 'Web portal', description: 'React, providing the administrative and employee-facing web interface.' },
        { label: 'Mobile app', description: 'React Native, extending check-in/check-out and time-tracking access to mobile devices.' },
        { label: 'Deployment', description: 'Hosted on in-house servers rather than a public cloud provider, and deployed for use across the entire organization rather than a single team or pilot group.' },
      ],
      highlights: [
        { label: 'Cross-validation as a design principle', description: 'Rather than treating attendance capture and time tracking as two separate systems, the Time Master module was built specifically to reconcile logged hours against actual attendance events — closing a gap that exists in a lot of attendance systems where the "hours worked" figure is only loosely connected to verified check-in/check-out data.' },
        { label: 'In-house deployment', description: 'Hosting on in-house servers rather than a cloud provider meant handling infrastructure, uptime, and data security considerations directly, rather than relying on managed cloud services.' },
        { label: 'Organization-wide rollout', description: 'Building a system intended for use by the entire organization (not a pilot team) meant accounting for real-world variability in usage from day one — different lighting conditions for face recognition, varying device types for the mobile app, and consistent reliability expectations across every department.' },
      ],
      roleIntro: 'I built this system end-to-end:',
      role: [
        { title: 'Face Recognition Check-In/Check-Out', description: 'Built the flow, integrated into both the web portal and mobile app.' },
        { title: 'FastAPI Backend', description: 'Built the backend, handling attendance event processing and data management against SQL Server.' },
        { title: 'Time Master Module', description: 'Built the module, including the logic to log working hours and cross-validate them against captured attendance events — ensuring reported hours were reconciled against actual biometric attendance data rather than trusted at face value.' },
        { title: 'Web & Mobile Front-Ends', description: 'Built the React web portal and React Native mobile app front-ends.' },
        { title: 'Deployment & Rollout', description: 'Handled deployment on in-house servers and rollout across the organization.' },
      ],
      outcome: "The system replaced manual/card-based attendance tracking with a face-recognition-based flow used organization-wide, with the Time Master module providing working-hour tracking that's cross-validated against real attendance data rather than self-reported time.",
    },
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
