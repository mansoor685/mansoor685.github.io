export const personalInfo = {
  name: "Mansoor Ahmed",
  title: "Full Stack & AI Engineer",
  phone: "+92-305-4788181",
  phoneRaw: "+923054788181",
  email: "me.mansoor006@gmail.com",
  github: "https://github.com/mansoor685",
  linkedin: "https://www.linkedin.com/in/mansoor-ahmed-052292218/",
  tagline: "I build AI-powered products and production-grade web apps that save teams hours of manual work.",
  bio: "Full Stack & AI Engineer with 5+ years of experience shipping production software for clients and companies in the US, Canada and Pakistan. I design and build end-to-end products: RAG-based document chat, AI voice receptionists, AI document reading with ERP integration, marketplaces, and mobile apps. I work across Python (Django, FastAPI), TypeScript (React, Next.js), PostgreSQL and cloud infrastructure, and I care about clean architecture, security and fast delivery."
};

export const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "25+", label: "Projects Delivered" },
  { value: "20+", label: "Technologies" },
  { value: "US · CA · PK", label: "Client Regions" }
];

export const services = [
  {
    title: "AI Products & Automation",
    description: "RAG chat over your documents, AI document reading, LLM agents and voice AI that remove manual work."
  },
  {
    title: "Full-Stack Web Apps",
    description: "SaaS platforms, dashboards and marketplaces with Next.js, React, Django and FastAPI."
  },
  {
    title: "Integrations & APIs",
    description: "ERP, payments, calendars and third-party APIs connected reliably, with secure REST/GraphQL APIs."
  },
  {
    title: "Mobile & Business Websites",
    description: "Fast, SEO-friendly company websites and offline-first mobile apps that convert visitors into customers."
  }
];

export const experience = [
  {
    company: "Secure RX",
    role: "Full Stack Developer",
    duration: "June 2025 - Present",
    location: "Remote",
    achievements: [
      "Built RESTful APIs with FastAPI for patient, doctor, and appointment management.",
      "Managed schemas using Pydantic + SQLAlchemy to ensure data integrity.",
      "Implemented secure authentication and role-based access control.",
      "Optimized performance with async APIs and modular design for scalability."
    ]
  },
  {
    company: "Openng",
    role: "Associate Software Engineer",
    duration: "June 2023 - June 2025",
    location: "Remote",
    achievements: [
      "Designed and developed a full-scale Hospital Management System serving patients, doctors, pharmacists, and administrators.",
      "Built secure RESTful APIs using FastAPI for authentication, appointment scheduling, medical records, prescriptions, and notifications.",
      "Implemented JWT-based role access control to enforce data security across multiple healthcare roles.",
      "Developed responsive React dashboards for real-time hospital operations and analytics.",
      "Ensured data integrity and validation using Pydantic and SQLAlchemy with PostgreSQL."
    ]
  },
  {
    company: "Linked Matrix",
    role: "Associate Software Engineer",
    duration: "August 2021 - June 2023",
    location: "Onsite",
    achievements: [
      "Developed an automated educational workflow platform using Django and GraphQL, replacing manual CSV processes.",
      "Built financial management and hospital inventory systems with Django and Anvil for efficient operations.",
      "Implemented RESTful APIs with FastAPI and designed reusable Python packages to support internal tools and bot development.",
      "Created responsive frontend applications using React.js and cross-platform mobile apps with React Native.",
      "Integrated AI functionalities and bot clients leveraging LiteLLM for conversational AI and automation workflows.",
      "Developed CI/CD pipelines using GitHub Actions to automate deployment to Google Cloud Platform (GCP).",
      "Built trucking inventory management system with integrated PayPal payments and Twilio notifications to streamline logistics."
    ]
  }
];

export type Project = {
  title: string;
  category: string;
  tagline: string;
  description: string;
  techStack: string[];
  highlights: string[];
  link?: string;
  linkLabel?: string;
  github?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Production Automation Central (PAC)",
    category: "AI Automation · ERP Integration",
    tagline: "AI-powered production & shipping platform for a US apparel importer",
    description: "An internal platform that runs the production and shipping operations of a US apparel importer, used daily by its production coordinators. PAC reads factory invoices and packing lists with AI, validates them against purchase orders, and pushes approved shipments straight into the company's A2000 ERP.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Claude AI", "A2000 ERP API", "PDF & Excel parsing"],
    highlights: [
      "Replaced manual reading and re-keying of every commercial invoice and packing list into the ERP.",
      "AI reads uploaded PDF/Excel documents and checks them line by line against the PO: style, colour, size, quantity, unit price, invoice total, warehouse, bill of lading and bank details.",
      "Pushes approved shipments into the ERP via its API and reads the record back to confirm it landed.",
      "Covers purchase orders, time-and-action plans, ocean booking, QC inspections, production status reports and role-based work assignments: 40+ modules in total."
    ],
    featured: true
  },
  {
    title: "Ringie",
    category: "Voice AI · SaaS",
    tagline: "AI receptionist that answers, qualifies and books every inbound call",
    description: "A SaaS AI phone receptionist for businesses. Ringie greets callers in the business's name with a natural voice, answers common questions from a knowledge base, qualifies leads and books appointments, so no call goes to voicemail.",
    techStack: ["Voice AI", "LLMs", "Telephony", "Knowledge Base", "Google Calendar", "Calendly"],
    highlights: [
      "Answers inbound calls 24/7, including after-hours and weekends, with a custom greeting and voice.",
      "Answers FAQs (hours, services, service area, policies) accurately from the business's knowledge base.",
      "Qualifies leads with custom question flows and books appointments with calendar sync and email confirmations.",
      "Call transcripts, summaries and analytics in a dashboard, plus live transfer to a human."
    ],
    link: "https://ringie.io",
    linkLabel: "Visit ringie.io",
    featured: true
  },
  {
    title: "Org Search AI",
    category: "Generative AI · RAG · Multi-tenant SaaS",
    tagline: "Enterprise AI platform to chat with your organisation's documents",
    description: "An enterprise-grade AI platform for lawyers, researchers and knowledge workers. It combines document management with RAG-powered chat so teams can get answers and insights from their organisation's knowledge base.",
    techStack: ["Python", "RAG / LLMs", "Qdrant", "Celery", "JWT Auth", "Google Cloud Storage", "i18n (EN/AR)"],
    highlights: [
      "AI chat over organisational documents using Retrieval-Augmented Generation with semantic vector search on Qdrant.",
      "Document upload and processing pipeline with automatic chunking and embedding, run asynchronously with Celery.",
      "Multi-tenant architecture with organisation-level data isolation and JWT authentication with role management.",
      "Full English and Arabic (RTL) support, dark/light themes, flexible local or Google Cloud storage, and a usage analytics dashboard."
    ],
    github: "https://github.com/talhamasood0000/org-search-ai",
    featured: true
  },
  {
    title: "Musaid",
    category: "Marketplace · Real Estate",
    tagline: "Full-stack real estate marketplace for buyers and sellers",
    description: "A real estate marketplace that connects property buyers and sellers. Buyers browse, filter and book properties; sellers manage their listings and portfolio from a dedicated dashboard.",
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Django REST Framework", "JWT Auth"],
    highlights: [
      "Search and filter listings by city, type, price, bedrooms and area, with detailed property pages and image galleries.",
      "Property booking flow with payment tracking.",
      "Seller dashboard with portfolio stats, listing management (add/edit/delete with photo uploads and facilities) and profile settings.",
      "Django REST API with JWT authentication and role-based access for buyers and sellers."
    ],
    featured: true
  },
  {
    title: "Khurma Sports",
    category: "Business Website · B2B Lead Generation",
    tagline: "Website for a custom sportswear manufacturer serving clubs worldwide",
    description: "A fast, SEO-friendly website for a Sialkot-based custom sportswear manufacturer (since 1987) that supplies clubs, teams and brands in the UK, USA, Canada and beyond.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Swiper"],
    highlights: [
      "Product catalogue across 14 sports categories plus accessories, gym wear and fashion apparel.",
      "Clear manufacturing story: design, fabric, cutting, printing, stitching, QC and worldwide shipping.",
      "Lead capture through a quote request form and WhatsApp contact.",
      "Statically exported for fast loads and low hosting cost."
    ],
    link: "https://khurmasports.com/",
    linkLabel: "Visit website",
    featured: true
  },
  {
    title: "Tasbeeh: Dhikr Counter",
    category: "Mobile App · Android",
    tagline: "A calm, private misbaha for daily dhikr",
    description: "A free mobile dhikr counter app on Google Play. Tap anywhere to count with haptic and sound feedback, follow guided adhkar, and keep custom counters, all offline with no account or ads.",
    techStack: ["Mobile App", "Android", "Offline-first", "On-device storage"],
    highlights: [
      "Tap-to-count bead ring with haptics, custom targets, completion chime and automatic next round.",
      "Library of 15 common adhkar with Arabic text, transliteration, English meaning and source.",
      "Saved custom tasbeehs with their own progress and all-time totals, plus undo and manual entry.",
      "Night 'lamp mode', multiple colour themes, and privacy by design: no account, ads or analytics."
    ],
    link: "https://tasbeehapp.codebugs.co/",
    linkLabel: "View app",
    featured: true
  },
  {
    title: "Secure RX: Hospital Management System",
    category: "HealthTech",
    tagline: "Role-based healthcare platform for patients, doctors and admins",
    description: "A role-based healthcare platform to manage appointments, medical records and real-time dashboards.",
    techStack: ["React", "FastAPI", "PostgreSQL", "SQLAlchemy", "JWT Auth"],
    highlights: [
      "Secure FastAPI services for authentication, appointment scheduling and automated notifications.",
      "Responsive React frontend for real-time interaction across roles.",
      "Data validation with Pydantic and SQLAlchemy on PostgreSQL."
    ]
  },
  {
    title: "AI-Powered Pharmacy Inventory & Compliance",
    category: "HealthTech · OCR",
    tagline: "OCR-driven inventory, sales and compliance for pharmacies",
    description: "Pharmacy management system with OCR-based automation for inventory tracking and sales analytics.",
    techStack: ["React", "Django REST Framework", "TensorFlow", "OCR"],
    highlights: [
      "OCR-based barcode and batch number recognition to digitise stock records.",
      "React dashboards for real-time sales and inventory analytics.",
      "Role-based alerts for low stock and expired medicines."
    ]
  },
  {
    title: "Multi-Tenant Property & Lease Management",
    category: "Cloud · Microservices",
    tagline: "Microservices platform on Google Cloud",
    description: "Multi-app microservices architecture for property and lease management deployed on GCP.",
    techStack: ["Django", "GCP App Engine", "Cloud Tasks", "PostgreSQL"],
    highlights: [
      "Scaled multiple microservices on App Engine with Cloud Tasks for async processing.",
      "Lease tracking and maintenance requests with automated updates.",
      "Query and index optimisation for better performance."
    ]
  },
  {
    title: "Multi-Provider AI Chatbot Platform",
    category: "AI · Mobile · Serverless",
    tagline: "Chat clients, mobile apps and a Python SDK for AI providers",
    description: "Chat wrapper clients for AI providers with React Native mobile and web apps on a serverless backend.",
    techStack: ["Python", "React Native", "AWS Lambda", "OpenAI"],
    highlights: [
      "Standardised chat completion clients for multiple AI providers with robust error handling.",
      "React Native mobile and web chat apps with multimedia support.",
      "Serverless backend on AWS Lambda and a Python SDK for building custom bots."
    ]
  }
];

export const skills: { category: string; items: string[] }[] = [
  { category: "Languages", items: ["Python", "TypeScript", "JavaScript (ES6+)", "SQL", "GraphQL", "HTML5", "CSS3", "C#"] },
  { category: "Frontend", items: ["React", "Next.js", "React Native", "Tailwind CSS"] },
  { category: "Backend", items: ["FastAPI", "Django (DRF)", "Flask", "Celery", "Strawberry GraphQL", "Anvil", ".NET Core"] },
  { category: "AI & LLMs", items: ["RAG pipelines", "Qdrant vector search", "Claude / OpenAI APIs", "LiteLLM", "AI document extraction", "Voice AI agents"] },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { category: "Cloud & DevOps", items: ["Google Cloud (GCP)", "AWS", "DigitalOcean", "Docker", "Docker Compose", "GitHub Actions", "CI/CD"] },
  { category: "Integrations & Practices", items: ["ERP APIs (A2000)", "Stripe", "PayPal", "Twilio", "OAuth2 / JWT", "REST API design", "TDD"] }
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  institution: "Punjab University College of Information Technology (PUCIT), University of the Punjab",
  institutionUrl: "https://pucit.edu.pk"
};

export const languages = [
  { name: "English", proficiency: "Fluent" },
  { name: "Urdu", proficiency: "Native" },
  { name: "Punjabi", proficiency: "Intermediate" }
];
