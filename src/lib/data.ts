export const personalInfo = {
  name: "Vishal Mache",
  fullName: "Vishal Balasaheb Mache",
  tagline: "Android & Full-Stack Developer",
  role: "Developer • AI Enthusiast",
  email: "vishalmacheofficial@gmail.com",
  phone: "+91 9022873952",
  location: "Pune, India",
  availability: "Available for Hire",
  github: "https://github.com/VishalMache",
  linkedin: "https://linkedin.com/in/vishal-mache",
  bio: `Passionate about turning complex ideas into simple and meaningful digital experiences, I enjoy building intelligent applications that combine modern technology, scalability, and user-focused design to solve real-world problems.`,
  aboutSummary: `I am an Android and Full-Stack Developer pursuing a B.Tech in Computer Science and Engineering with a focus on AI and Ml . I have hands-on experience in developing production ready mobile applications and web applications.My projects emphasize innovative solution in AI,cybersecurity and user engagement.I excel in collaborating on cutting edge technology projects development,with a passion for delivering seamless user experiences.`,
};

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Journey", href: "/#journey" },
  { label: "Projects", href: "/#projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/#contact" },
];

export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "Java"],
  frameworks: ["Flutter", "React", "Next.js", "Flask"],
  backend: ["PostgreSQL", "Firebase", "Supabase", "SQLite"],
  tools: ["Git", "GitHub", "VS Code", "Android Studio"],
};

export const education = [
  {
    degree: "B.Tech in Computer Science & Engineering (AI & ML)",
    university: "Pimpri Chinchwad University",
    period: "2024 — 2028",
    score: "CGPA: 7.5 / 10",
  },
  {
    degree: "Class XII (HSC)",
    university: "Balasaheb Bharde Jr. College",
    period: "2023 - 2024",
    score: "76.17 %",
  },
  {
    degree: "Class X (SSC)",
    university: "Jawahar Madhyamik Vidyalaya",
    period: "2021 - 2022",
    score: "91.00 %",
  }
];

export const passions = [
  {
    iconName: "BrainCircuit",
    title: "AI Agent Tech",
    description: "Fascinated by multi-agent pipelines and autonomous cognitive models solving complex tasks."
  },
  {
    iconName: "Smartphone",
    title: "Seamless UX",
    description: "Obsessing over crafting intuitive, responsive, and seamless cross-platform mobile experiences."
  },
  {
    iconName: "Server",
    title: "Robust Backends",
    description: "Architecting scalable data flows and secure API integrations."
  },
  {
    iconName: "Code",
    title: "Continuous Learning",
    description: "Constantly exploring cutting-edge technology and innovating on the bleeding edge."
  }
];

export const services = [
  {
    iconName: "Smartphone",
    title: "Android Apps",
    description: "Production-ready mobile applications built with Flutter and robust backend connectivity.",
  },
  {
    iconName: "Globe",
    title: "Full-Stack Web",
    description: "Modern, responsive web applications using React, Next.js & TypeScript.",
  },
  {
    iconName: "Bot",
    title: "AI Integration",
    description: "Architecting multi-agent AI systems for complex multi-step task automation.",
  },
  {
    iconName: "Server",
    title: "Cybersecurity & DBs",
    description: "Secure data pipelines, PostgreSQL/Supabase integration, and automated vulnerability analysis.",
  },
];

export const projects = [
  {
    id: "ctms",
    title: "CTMS",
    role: "Full-Stack Developer",
    description: "Central Training & Placement Management System. Comprehensive training and placement management platform for tracking student data, placement drives, and training programs. Features role-based access, real-time dashboards, and automated reporting.",
    tech: ["Python", "Flask", "Database", "REST API"],
    image: "/projects/ctms_interface.jpeg",
    color: "#3B82F6",
    tape: ["top-left", "top-right"],
    tapeColor: "#3B82F6",
    link: "#",
    github: "",
  },
  {
    id: "syncme",
    title: "SyncMe",
    role: "Android Developer",
    description: "SyncMe is a real-time location-sharing and group coordination app built with Flutter. It is designed for friends, families, and teams (like trekkers, travelers, or event organizers) to stay connected during trips or events. SyncMe allows users to create groups, initiate active \"rooms\" (events), and share their live location with room members.",
    tech: ["Flutter", "Supabase", "PostgreSQL"],
    image: "/projects/syncme1.jpeg",
    images: [
      "/projects/syncme1.jpeg",
      "/projects/syncme2.jpeg",
      "/projects/syncme3.jpeg",
      "/projects/syncme4.jpeg"
    ],
    color: "#FB923C", // Orange matching the UI
    tape: ["top-left", "top-right"],
    tapeColor: "#FB923C",
    link: "#",
    github: "https://github.com/VishalMache/SyncMe",
  },
  {
    id: "quantisense",
    title: "QuantiSense AI",
    role: "AI Engineer",
    description: "Architected a multi-agent AI architecture for solving complex multi-step tasks autonomously. Coordinated 7 specialized agents for research, fraud detection, stress testing, and document parsing workflows. Implemented agent orchestration to enable efficient task collaboration and execution.",
    tech: ["Python", "LangChain", "Gemini", "FastAPI"],
    image: "/projects/quantisense.jpg",
    color: "#F4A261",
    tape: ["top-left", "top-right"],
    tapeColor: "#F4A261",
    link: "#",
    github: "https://github.com/vedant91/Multi-agents",
  },
  {
    id: "screeni",
    title: "Screenique",
    role: "Mobile Developer",
    description: "Screenique is a premium, cinematic Flutter application designed for movie and series enthusiasts. It goes beyond simple tracking by offering a vintage, editorial aesthetic complete with film grain and burn effects. Discover new movies, curate your watchlist, forge custom iconic movie dialogues, and experience a unique, tactile movie-tracking journey.",
    tech: ["Flutter", "TMDB API", "Firestore"],
    image: "/projects/screenique1.jpeg",
    images: [
      "/projects/screenique1.jpeg",
      "/projects/screenique2.jpeg",
      "/projects/screenique3.jpeg"
    ],
    color: "#6366F1",
    tape: ["top-left", "top-right"],
    tapeColor: "#6366F1",
    link: "#",
    github: "https://github.com/VishalMache/Screenique",
  },
  {
    id: "cyphex",
    title: "Cyphex",
    role: "Security Researcher",
    description: "Developed a multi-agent cybersecurity platform with a modular 5-stage architecture for automated reconnaissance and vulnerability analysis. Coordinated 10 specialized agents using concurrent asyncio-based execution for efficient workflow management. Integrated security tools such as nmap, sqlmap, hydra, and curl for automated scanning and analysis.",
    tech: ["Python", "asyncio", "React", "Cybersecurity"],
    image: "/projects/cyphex.jpg",
    color: "#2A9D8F",
    tape: ["top-left", "top-right"],
    tapeColor: "#2A9D8F",
    link: "#",
    github: "https://github.com/Punya23/CYPHEX",
  },
  {
    id: "innovare",
    title: "Innovare Website",
    role: "Front-End Developer",
    description: "Official website for Innovare (IEEE Student Chapter).",
    tech: ["React", "Next.js", "CSS"],
    image: "/projects/innovare.png",
    color: "#8B5CF6",
    tape: ["top-left", "top-right"],
    tapeColor: "#8B5CF6",
    link: "#",
    github: "https://github.com/VishalMache/innovare-ieee",
  },
  {
    id: "period-tracker",
    title: "Cycle Flow",
    role: "Mobile Developer",
    description: "Cycle Flow is a premium, beautifully designed period and wellness tracking application built with Flutter. It prioritizes emotional safety, modern design aesthetics (glassmorphism, soft gradients), and intelligent AI-powered insights to help users effortlessly stay in sync with their bodies.",
    tech: ["Flutter", "Firebase", "AI Insights"],
    image: "/projects/cycleflow.jpg",
    color: "#EC4899",
    tape: ["top-left", "top-right"],
    tapeColor: "#EC4899",
    link: "#",
    github: "https://github.com/VishalMache/Period_tracker",
  },
];
