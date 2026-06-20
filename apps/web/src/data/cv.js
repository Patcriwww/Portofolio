export const cv = {
  identity: {
    name: 'Fachri Reyhan',
    handle: 'Fachri Reyhan',
    role: 'Software Developer | Machine Learning Enthusiast | Network & IT Infrastructure',
    tagline: 'Building software, machine learning solutions, and network infrastructure.',
    location: 'Depok, West Java, Indonesia',
    timezone: 'Asia/Jakarta',
    available: true,
    availabilityNote: 'Open to internship & entry-level opportunities',
    yearsExperience: 1,
    avatarInitials: 'FR',
  },

  about: [
    'Final-year Informatics student at Universitas Al-Azhar Indonesia with experience in full-stack web development, machine learning, and network engineering.',
    'Skilled in PHP Laravel, Python, MySQL, REST API development, and network infrastructure maintenance.',
    'Completed a 6-month internship as Network Engineer at PT Telekomunikasi Indonesia, working with routers, switches, and fiber optic testing tools.',
    'Passionate about software engineering, artificial intelligence, and continuous learning in technology.',
  ],

  currently: [
    'Completing Bachelor of Informatics at Universitas Al-Azhar Indonesia.',
    'Building web applications using Laravel and MySQL.',
    'Exploring Machine Learning and AI development with Python.',
  ],

  stats: [
    { label: 'internship', value: '6 months' },
    { label: 'projects', value: '5+' },
    { label: 'certifications', value: '5' },
    { label: 'gpa', value: '3.20' },
  ],
  experience: [
    {
      title: 'Network Engineer Intern',
      company: 'PT Telekomunikasi Indonesia',
      companyUrl: null,
      period: 'Jan 2025 — Jul 2025',
      location: 'Jakarta, Indonesia',
      type: 'Internship',
      stack: ['Networking', 'Fiber Optic', 'Router', 'Switch', 'OTDR', 'OPM'],
      highlights: [
        'Performed maintenance and configuration of routers and switches.',
        'Utilized LAN Tester, OTDR, and OPM for fiber optic diagnostics.',
        'Conducted proactive network monitoring and troubleshooting.',
        'Documented network topology and incident reports.',
      ],
    },
  ],

  education: [
    {
      degree: 'Bachelor of Informatics (S.Kom)',
      university: 'Universitas Al-Azhar Indonesia',
      year: 'Expected 2027',
      field: 'Informatics',
      thesis: '-',
      gpa: '3.20 / 4.00',
    },
  ],

  certifications: [
    {
      name: 'Intro to Machine Learning - Kaggle Learn',
      year: '2025',
    },
    {
      name: 'Python - Kaggle Learn',
      year: '2025',
    },
    {
      name: 'Intro to Deep Learning - Kaggle Learn',
      year: '2025',
    },
    {
      name: 'Red Hat System Administration I (RH124)',
      year: '2025',
    },
    {
      name: 'Red Hat System Administration II (RH134)',
      year: '2025',
    },
  ],

  skills: {
    languages: [
      'PHP',
      'Python',
      'JavaScript',
      'HTML',
      'CSS',
      'SQL',
    ],
    frontend: [
      'HTML',
      'CSS',
      'JavaScript',
    ],
    backend: [
      'Laravel',
      'REST API',
      'MySQL',
    ],
    infrastructure: [
      'Linux (Red Hat)',
      'Network Configuration',
      'Router',
      'Switch',
      'Fiber Optic',
    ],
    tooling: [
      'Git',
      'GitHub',
      'VS Code',
      'Figma',
      'OTDR',
      'OPM',
    ],
    soft: [
      'Problem Solving',
      'Teamwork',
      'Adaptability',
      'Project Management',
    ],
  },

  projects: [
    {
      name: 'AI for Academic Prediction',
      tagline: 'Student Graduation Prediction System',
      description:
        'Built a machine learning model using Python and scikit-learn to predict student graduation outcomes.',
      url: '',
      repo: '',
      stack: ['Python', 'scikit-learn'],
      year: 2025,
      status: 'completed',
    },
    {
      name: 'AI for Entrepreneurship',
      tagline: 'Business Idea Prediction System',
      description:
        'Developed a machine learning model to generate and rank business ideas using classification and clustering algorithms.',
      url: '',
      repo: '',
      stack: ['Python', 'Machine Learning'],
      year: 2025,
      status: 'completed',
    },
    {
      name: 'BisaLearning',
      tagline: 'E-Learning Web Application',
      description:
        'Full-stack web application built using Laravel and MySQL.',
      url: '',
      repo: '',
      stack: ['Laravel', 'PHP', 'MySQL'],
      year: 2025,
      status: 'completed',
    },
    {
      name: 'InCanteen',
      tagline: 'Mobile Food Delivery Application',
      description:
        'Mobile application for canteen food ordering services.',
      url: '',
      repo: '',
      stack: ['Mobile App'],
      year: 2025,
      status: 'completed',
    },
    {
      name: 'Agrowisata Jabar',
      tagline: 'Agrotourism Destination Platform',
      description:
        'Web platform promoting agrotourism destinations across West Java.',
      url: 'https://agrowisatajabar.com',
      repo: '',
      stack: ['PHP', 'Laravel', 'MySQL'],
      year: 2025,
      status: 'live',
    },
    {
      name: 'Desa Wisata Cipada',
      tagline: 'Village Tourism Website',
      description:
        'Tourism information platform showcasing local attractions and products.',
      url: 'https://desawisatacipada.com',
      repo: '',
      stack: ['PHP', 'Laravel', 'MySQL'],
      year: 2025,
      status: 'live',
    },
    {
      name: 'CapolagaGo',
      tagline: 'Tourism Information Platform',
      description:
        'Web-based tourism platform supporting destination information and visitor services.',
      url: 'https://capolagago.wuaze.com',
      repo: '',
      stack: ['PHP', 'Laravel', 'MySQL'],
      year: 2025,
      status: 'live',
    },
  ],

  contact: {
    email: 'fahryreyhanantoni@gmail.com',
    phone: '+62 821-1004-1389',
    calendar: '',
    location: 'Depok, West Java, Indonesia',
  },

  social: [
    {
      label: 'GitHub',
      handle: '@Patcriwww',
      url: 'https://github.com/Patcriwww',
    },
  ],
  meta: {
    lastUpdated: '2026-06-20',
    version: '1.0.0',
    license: 'Personal',
    repo: 'github.com/Patcriwww/portfolio',
  },
};

export const FILES = [
  { id: 'about', name: 'about.md', path: 'src/about.md', language: 'markdown', icon: 'md' },
  { id: 'experience', name: 'experience.json', path: 'src/experience.json', language: 'json', icon: 'json' },
  { id: 'education', name: 'education.yml', path: 'src/education.yml', language: 'yaml', icon: 'yml' },
  { id: 'skills', name: 'skills.ts', path: 'src/skills.ts', language: 'typescript', icon: 'ts' },
  { id: 'projects', name: 'projects.tsx', path: 'src/projects.tsx', language: 'tsx', icon: 'tsx' },
  { id: 'contact', name: 'contact.sh', path: 'src/contact.sh', language: 'shell', icon: 'sh' },
];