export const personalInfo = {
  name: "Mansoor Ahmed",
  title: "Full Stack Developer",
  phone: "+92-3304795101",
  email: "mansoor1122000@gmail.com",
  github: "https://github.com/mansoorahmed786",
  linkedin: "https://www.linkedin.com/in/mansoor-ahmed-052292218/",
  bio: "Passionate Full Stack Developer with 2+ years of experience in full-stack development, specializing in building scalable web applications, RESTful APIs, and AI-powered solutions. Proficient in Python, JavaScript, React, Django, FastAPI, and modern cloud technologies. Strong focus on creating efficient, user-centric solutions with expertise in microservices architecture, CI/CD pipelines, and database optimization."
};

export const experience = [
  {
    company: "Openng",
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
    company: "Linked Matrix",
    role: "Associate Software Engineer",
    duration: "August 2023 - June 2025",
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

export const projects = [
  {
    title: "Secure RX – Comprehensive Hospital Management System",
    description: "Built a role-based healthcare management platform for patients, doctors, and administrators to manage appointments, medical records, and real-time dashboards.",
    techStack: ["React", "FastAPI", "PostgreSQL", "SQLAlchemy", "JWT Authentication"],
    highlights: [
      "Developed secure RESTful APIs with FastAPI for authentication, appointment scheduling, and automated notifications using JWT-based access control.",
      "Designed and integrated a responsive React frontend enabling seamless user experience and real-time interaction across roles.",
      "Implemented robust data validation and integrity using Pydantic models and SQLAlchemy ORM, backed by PostgreSQL for reliable data persistence."
    ],
    link: ""
  },
  {
    title: "AI-Enhanced Pharmacy Management System",
    description: "Pharmacy management system with OCR-based automation for inventory tracking and sales analytics.",
    techStack: ["React", "Django REST Framework", "TensorFlow", "OCR"],
    highlights: [
      "Implemented OCR-based barcode and batch number recognition to digitize stock records, reducing manual errors through automated data entry.",
      "Built interactive React dashboards for real-time sales and inventory analytics, powered by Django REST APIs.",
      "Integrated role-based authentication and an alert system for pharmacists and managers, providing real-time updates on low stock and expired medicines."
    ],
    link: ""
  },
  {
    title: "Property Management System",
    description: "Multi-app microservices architecture for comprehensive property management deployed on GCP.",
    techStack: ["Django", "Google Cloud Platform", "App Engine", "Cloud Tasks", "PostgreSQL"],
    highlights: [
      "Maintained and scaled multiple microservices deployed on Google Cloud Platform (GCP) using App Engine and Cloud Tasks for asynchronous processing and improved scalability.",
      "Implemented tenant management features including lease tracking and maintenance requests with automated updates.",
      "Optimized database queries and indexing to enhance system performance and user experience."
    ],
    link: ""
  },
  {
    title: "AI Bot Development",
    description: "Created chat wrapper clients for AI providers with React Native mobile and web applications.",
    techStack: ["Python", "React Native", "AWS Lambda", "OpenAI"],
    highlights: [
      "Created chat wrapper clients for multiple AI providers (OpenAI), standardizing chat completion endpoints with robust error handling.",
      "Developed React Native mobile and web applications providing interactive chat interfaces with multimedia support.",
      "Deployed backend serverless functions on AWS Lambda for scalable and cost-efficient processing of chat logic.",
      "Packaged a Python SDK to assist developers in building custom chat bots with minimal code and flexible configurations."
    ],
    link: ""
  },
  {
    title: "Strawberry GraphQL App",
    description: "Robust backend system using Strawberry GraphQL to ingest, validate, and process large volumes of school data.",
    techStack: ["Strawberry GraphQL", "Python", "CSV Processing"],
    highlights: [
      "Designed and developed a robust backend system using Strawberry GraphQL to ingest, validate, and process large volumes of school data from CSV uploads.",
      "Implemented complex mutation logic to handle nested data structures for student reviews, programs, feedback, and scheduling.",
      "Ensured data consistency and error reporting with custom validation rules and batch processing strategies."
    ],
    link: ""
  },
  {
    title: "Anvil Apps",
    description: "End-to-end web applications with AI integration built on Anvil's low-code platform.",
    techStack: ["Anvil", "AI Integration", "SQL"],
    highlights: [
      "Built end-to-end web applications using Anvil's low-code platform, integrating AI models for predictive analytics and natural language processing tasks.",
      "Optimized SQL database queries to improve responsiveness and reduce latency for data-heavy applications."
    ],
    link: ""
  }
];

export const skills = {
  "Languages/Technologies": [
    { name: "Python", level: 95 },
    { name: "JavaScript (ES6+)", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "GraphQL", level: 80 },
    { name: "HTML5", level: 90 },
    { name: "CSS3", level: 85 },
    { name: "C#", level: 70 },
    { name: "SQL", level: 85 }
  ],
  "Frameworks/Libraries": [
    { name: "React", level: 90 },
    { name: "React Native", level: 85 },
    { name: "Next.js", level: 85 },
    { name: "FastAPI", level: 95 },
    { name: "Django (DRF)", level: 90 },
    { name: "Flask", level: 80 },
    { name: "Celery", level: 75 },
    { name: "Strawberry GraphQL", level: 80 },
    { name: "Anvil", level: 70 },
    { name: ".NET Core", level: 65 }
  ],
  "Databases": [
    { name: "MySQL", level: 85 },
    { name: "PostgreSQL", level: 90 },
    { name: "MongoDB", level: 80 },
    { name: "Redis", level: 75 }
  ],
  "Cloud Platforms": [
    { name: "Google Cloud Platform (GCP)", level: 85 },
    { name: "Amazon Web Services (AWS)", level: 80 },
    { name: "DigitalOcean", level: 80 }
  ],
  "DevOps and Tools": [
    { name: "Git", level: 90 },
    { name: "GitHub Actions", level: 85 },
    { name: "Docker", level: 85 },
    { name: "Docker Compose", level: 85 },
    { name: "CI/CD pipelines", level: 85 }
  ],
  "AI and Bot Development": [
    { name: "Bot development frameworks", level: 85 },
    { name: "Chat Completion APIs (OpenAI, Cohere)", level: 90 },
    { name: "LiteLLM", level: 85 }
  ],
  "Other": [
    { name: "RESTful API design", level: 95 },
    { name: "OAuth2/JWT authentication", level: 90 },
    { name: "Test-driven development (TDD)", level: 80 },
    { name: "Stripe & PayPal integration", level: 85 }
  ]
};

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
