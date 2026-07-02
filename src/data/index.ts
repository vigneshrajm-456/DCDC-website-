import { Milestone, LegacyStat, GalleryItem, DomainInfo } from '../types';

export const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    year: '2016',
    title: 'The Spark',
    description: 'PLACEHOLDER: A handful of students from media and computing backgrounds began informally meeting to explore design and technology projects together — the earliest seed of what would become DCDC.',
    image: '/images/workshop/IMG-20260121-WA0015.jpg',
    tag: 'EARLY SPARK'
  },
  {
    id: 'm2',
    year: '2017',
    title: 'Finding Our Footing',
    description: 'PLACEHOLDER: The informal group started organizing small peer-learning sessions and campus meetups, gradually building the foundations of a shared identity and purpose.',
    image: '/images/workshop/IMG-20260121-WA0017.jpg',
    tag: 'FOUNDATIONS'
  },
  {
    id: 'm3',
    year: '2018',
    title: 'The Genesis',
    description: 'Founded as a technical interest group within SRMIST to bridge the gap between media, design thinking, and technical engineering.',
    image: '/images/workshop/IMG-20260121-WA0018.jpg',
    tag: 'FOUNDATION'
  },
  {
    id: 'm4',
    year: '2019',
    title: 'Flagship Seminar Launch',
    description: 'Launched our first hands-on UI/UX & Web architecture workshop, inviting 150+ students into collaborative development paradigms.',
    image: '/images/workshop/IMG-20260121-WA0019.jpg',
    tag: 'FIRST WORKSHOP'
  },
  {
    id: 'm5',
    year: '2020',
    title: 'Going Digital',
    description: 'PLACEHOLDER: Adapted to remote collaboration, moving workshops and mentorship online and reaching a wider base of students beyond the physical campus.',
    image: '/images/workshop/IMG-20260121-WA0020.jpg',
    tag: 'REMOTE PIVOT'
  },
  {
    id: 'm6',
    year: '2021',
    title: 'Interactive Labs & Mentorship',
    description: 'Transformed into specialized creative labs. Initiated physical and digital peer-learning pathways and active team incubations.',
    image: '/images/workshop/IMG-20260121-WA0053.jpg',
    tag: 'COMMUNITY GROWTH'
  },
  {
    id: 'm7',
    year: '2022',
    title: 'Cross-Disciplinary Expansion',
    description: 'PLACEHOLDER: Broadened our scope beyond design and code, welcoming storytelling, media production, and event-craft into the club\'s core disciplines.',
    image: '/images/workshop/IMG-20260121-WA0055.jpg',
    tag: 'CROSS-DISCIPLINARY'
  },
  {
    id: 'm8',
    year: '2023',
    title: 'High-Tech Prototypes Shipped',
    description: 'Engineered hardware-software integrations including custom IoT devices, autonomous sensor rigs, and interactive web tools.',
    image: '/images/workshop/IMG-20260121-WA0057.jpg',
    tag: 'MAJOR PROJECTS'
  },
  {
    id: 'm9',
    year: '2024',
    title: 'Scaling Our Impact',
    description: 'PLACEHOLDER: Grew our membership and event reach significantly, partnering with other campus communities and running our largest workshop series to date.',
    image: '/images/workshop/IMG-20260121-WA0063.jpg',
    tag: 'SCALE & REACH'
  },
  {
    id: 'm10',
    year: '2025',
    title: 'SRMIST Flagship Prestige',
    description: 'DCDC elevated to SRMIST’s gold standard student group for multidisciplinary technical products and high-fidelity storytelling.',
    image: '/images/workshop/IMG-20260121-WA0064.jpg',
    tag: 'INNOVATION EXPANSION'
  },
  {
    id: 'm11',
    year: '2026 & Beyond',
    title: 'Incubator & Speculative Lab',
    description: 'Focusing on artificial intelligence, spatial user interfaces, and custom physical interaction systems to shape tomorrow.',
    image: '/images/workshop/IMG-20260121-WA0068.jpg',
    tag: 'FUTURE VISION'
  }
];

export const LEGACY_STATS: LegacyStat[] = [
  {
    id: 's1',
    value: '25+',
    label: 'Members',
    description: 'A close-knit family of brilliant designers, makers, and innovators.',
    category: 'COMMUNITY'
  },
  {
    id: 's3',
    value: '5+',
    label: 'Workshops',
    description: 'High-end skill sharing in Figma design systems, motion CSS, and system code.',
    category: 'EDUCATION'
  },
  {
    id: 's4',
    value: '15+',
    label: 'Events',
    description: 'High-tempo design showcases, student forums, hack days, and exhibitions.',
    category: 'LEGACY'
  },
  {
    id: 's5',
    value: '13',
    label: 'Domains',
    description: 'Perfectly aligned nodes blending art, communication, and technological craft.',
    category: 'STRUCTURE'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Design Critique Workshop',
    category: 'workshops',
    image: '/images/workshop/IMG-20260121-WA0070.jpg',
    description: 'DCDC designers gathering to dissect responsive UI paradigms and typography systems.',
    date: 'October 2024'
  },
  {
    id: 'g2',
    title: 'Collaborative Code Lab',
    category: 'collaborations',
    image: '/images/workshop/IMG-20260121-WA0072.jpg',
    description: 'Multi-disciplinary squads building creative frontend modules in a high-focus environment.',
    date: 'January 2025'
  },
  {
    id: 'g3',
    title: 'Flagship Showcase Celebration',
    category: 'events',
    image: '/images/workshop/IMG-20260121-WA0074.jpg',
    description: 'Commending the tireless project squads on the campus auditorium stage during the main symposium.',
    date: 'March 2025'
  },
  {
    id: 'g4',
    title: 'Testing IoT Prototypes',
    category: 'innovations',
    image: '/images/workshop/IMG-20260121-WA0076.jpg',
    description: 'Our physical makerspace lab validating gesture-enabled microcontrollers and wireless modules.',
    date: 'April 2025'
  },
  {
    id: 'g5',
    title: 'Aesthetic Interfaces Seminar',
    category: 'workshops',
    image: '/images/workshop/IMG-20260121-WA0078.jpg',
    description: 'Demystifying how high-end agencies pair typography, motion, and contrast for visual prestige.',
    date: 'August 2025'
  },
  {
    id: 'g6',
    title: 'DCDC Interactive Sandbox',
    category: 'innovations',
    image: '/images/workshop/IMG-20260121-WA0080.jpg',
    description: 'Freshmen exploring creative computing tools and live visual installations under mentor guidance.',
    date: 'September 2025'
  }
];

export const DOMAINS: DomainInfo[] = [
  {
    id: 'tech',
    title: 'Technology',
    description: 'The solid engineering backbone. We build robust React structures, custom hardware interfaces, and clean, high-performance systems.',
    skills: ['React & UI Engineering', 'Hardware IoT System design', 'API Integration & DevOps'],
    activities: ['Development Hack-Sprints', 'Hardware Lab Debugging', 'Code Architecture Auditing'],
    exampleProjects: [
      { name: 'SRMIST Event Coordinator', desc: 'Secure local campus event tracking application running on Edge structures.' },
      { name: 'Smart Pointer IoT module', desc: 'Real-time gestural micro-controller to automate slide interactions.' }
    ],
    color: 'text-[#2458FF]',
    glowColor: 'group-hover:shadow-[0_0_40px_-10px_rgba(36,88,255,0.4)] border-[#2458FF]/20 group-hover:border-[#2458FF]/50'
  },
  {
    id: 'design',
    title: 'Design',
    description: 'The aesthetic identity. We craft micro-interactions, responsive systems, corporate typography templates, and pure layout elegance.',
    skills: ['Figma Design Systems', 'Cinematic Rendering', 'Human-Centered Wireframes'],
    activities: ['Creative Critiques & Redesigns', 'Interface Prototyping Jams', 'Grid & Typography Drills'],
    exampleProjects: [
      { name: 'DCDC Visual Exhibition System', desc: 'A custom, modular premium layout language engineered for screen displays.' },
      { name: 'Carbon Design Tokens', desc: 'Dark-focused, high-contrast, eye-safe components for technical web clients.' }
    ],
    color: 'text-[#E5B93C]',
    glowColor: 'group-hover:shadow-[0_0_40px_-10px_rgba(229,185,60,0.4)] border-[#E5B93C]/20 group-hover:border-[#E5B93C]/50'
  },
  {
    id: 'communication',
    title: 'Communication',
    description: 'The narrative bridge. We connect thinkers, capture industry relations, build deep content documentation, and craft stories.',
    skills: ['Technical Storytelling', 'Strategic Copywriting', 'Institutional Relations'],
    activities: ['Editorial & Article Curation', 'Sponsorship Presentations', 'Live Event Moderation'],
    exampleProjects: [
      { name: 'The Innovator\'s Chronicles', desc: 'A quarterly physical newsletter exploring the convergence of computer science and sculpture.' },
      { name: 'DCDC Legacy Documentations', desc: 'Structured oral histories of the club transcribed into rich virtual interactive stories.' }
    ],
    color: 'text-[#FF5A7A]',
    glowColor: 'group-hover:shadow-[0_0_40px_-10px_rgba(255,90,122,0.4)] border-[#FF5A7A]/20 group-hover:border-[#FF5A7A]/50'
  },
  {
    id: 'media',
    title: 'Media',
    description: 'The visual archivists. We immortalize real-world events, photograph makerspaces, produce high-end motion teasers, and direct cinematic narratives.',
    skills: ['Cinematography & FX', 'Aesthetic Photography', 'Curated Synthesizer Soundscapes'],
    activities: ['Campus Documentaries', 'Promotional Teaser Editing', 'Atmospheric Event Shoots'],
    exampleProjects: [
      { name: 'DCDC Symphony Film', desc: 'An immersive video showcase tracking the design journey of major club creations.' },
      { name: 'Creative Frames Archive', desc: 'A stunning curated photo log celebrating student engineers in motion.' }
    ],
    color: 'text-emerald-400',
    glowColor: 'group-hover:shadow-[0_0_40px_-10px_rgba(52,211,153,0.4)] border-emerald-400/20 group-hover:border-emerald-400/50'
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'The speculative sandbox. We build interactive art scripts, write models, experiment with hardware control interfaces, and design modern spatial computing setups.',
    skills: ['Speculative Interactive Arts', 'AI Interface Exploration', 'New Hardware Rigs'],
    activities: ['Generative Web Code-Offs', 'Immersive Interface Brainstorms', 'Multi-player Screen Experiments'],
    exampleProjects: [
      { name: 'Acoustic Biosensor Synth', desc: 'Translating plant electro-signals into real-time ambient modular soundscapes.' },
      { name: 'Gestured Optical Presenter', desc: 'Browser script mapping user palm positions directly to slide translation states.' }
    ],
    color: 'text-purple-400',
    glowColor: 'group-hover:shadow-[0_0_40px_-10px_rgba(192,132,252,0.4)] border-purple-400/20 group-hover:border-purple-400/50'
  }
];