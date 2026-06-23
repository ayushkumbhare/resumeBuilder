import type { ResumeData, StyleOptions } from '../types';

const b = (text: string) => ({ id: `b-${Math.random().toString(36).slice(2)}`, text, visible: true });

export const initialData: ResumeData = {
  id: 'resume-1',
  internalName: 'My Resume',
  personalInfo: {
    name: 'AYUSH KUMBHARE',
    headline: 'Full-Stack Software Engineer',
    phone: '+91 9021616118',
    email: 'ayushkumbhare300@gmail.com',
    linkedin: 'linkedin.com/in/ayush-kumbhare',
    github: 'github.com/ayushkumbhare',
    website: '',
    location: 'Pune, India',
    summary: 'Results-driven Full-Stack Software Engineer with 2 years of production experience specializing in secure frontend architecture, Server-Driven UI (SDUI), and cross-platform developer tooling. Proven track record of replacing expensive third-party vendors with highly secure in-house SDKs, reducing development lifecycles by 60%, and driving engineering productivity. Alumnus of VNIT Nagpur.',
  },
  experience: [
    {
      id: 'e1', visible: true,
      company: 'Fibe (formerly EarlySalary)', location: 'Pune, India',
      title: 'Software Developer', period: 'Aug 2024 – Present',
      bullets: [
        { ...b('Project 1: Secure Video KYC & Liveness SDK (HyperVerge Alternative)'), isSubheading: true },
        b('Engineered a hardened WebRTC KYC SDK from scratch to replace a costly third-party vendor, saving the business an estimated ₹40+ Lakhs annually in API verification costs.'),
        b('Architected a 5-stage cryptographic camera attestation pipeline (relay-token chain, HMAC sealing, re-derivation) to block client-side API spoofing and handshake bypass attempts with 99.9% accuracy.'),
        b('Implemented multi-layer anti-tamper protections using DOM mutation integrity hashing and live video track identity enforcement to actively detect and prevent blob URL injections.'),
        b('Integrated real-time liveness validation using MediaPipe landmarks and AWS Face Liveness, processing 5,000+ daily checks with sub-second polling for occlusion, eye closure, and spatial gating.'),
        { ...b('Project 2: Server-Driven UI (SDUI) Checkout Engine'), isSubheading: true },
        b('Designed a backend-orchestrated, JSON-driven checkout application, slashing frontend development and deployment time for new loan journeys by over 60%.'),
        b('Built a dynamic rendering engine that ingests API page schemas and transforms them into interactive forms using a custom field registry and config-based payload assembly.'),
        b('Developed a strict guarded navigation architecture with route-level policy configs and beforeunload protection, preventing accidental exits and decreasing user drop-off rates by 25%.'),
        b('Authored and maintained comprehensive unit/integration test suites (195+ test files), achieving 90%+ automated test coverage across journey orchestration and navigation logic.'),
        { ...b('Project 3: Full-Stack Loan Portals & Dashboards'), isSubheading: true },
        b('Managed end-to-end development of the Merchant Onboarding portal (Spring Boot & React), reducing manual merchant verification time by 40% for a network of 1,000+ vendors.'),
        b('Spearheaded frontend development for LAMF (Loan Against Mutual Fund) and the PRIMS QR-based Quick Eligibility Check (QEC) portals, seamlessly handling 10,000+ daily concurrent user interactions.'),
        b('Optimized API integrations and Redux state management across the Leadtraking Dashboard, resulting in a 35% reduction in dashboard load times (under 2 seconds).'),
      ],
    },
    {
      id: 'e2', visible: true,
      company: 'Cleanomatics Tech Solutions', location: '',
      title: 'Web Developer Intern', period: 'May 2023 – July 2023',
      bullets: [
        b('Engineered and optimized web interfaces for 3 distinct e-commerce platforms and mobile applications, ensuring cross-browser compatibility and high performance.'),
        b('Consistently met project deadlines with high-quality deliverables, accelerating the sprint delivery cycle by 15%.'),
      ],
    },
  ],
  projects: [
    {
      id: 'p1', visible: true,
      title: 'DevSync CLI (Cross-Platform Developer Tooling)', subtitle: 'Go, OAuth 2.0, OS-Native Secret Vaults', link: '',
      bullets: [
        b('Designed a Go-based cross-platform CLI tool (macOS, Windows, Linux) that automates local environment provisioning, slashing new engineer onboarding time by 98% (from 4–8 hours to under 5 minutes).'),
        b('Implemented an OAuth 2.0 PKCE flow with a zero-plaintext security model, securely storing authentication tokens exclusively in OS-native credential managers (macOS Keychain, Windows Credential Manager) and encrypting configs with AES-256-GCM.'),
      ],
    },
    {
      id: 'p2', visible: true,
      title: 'Network Traffic Analyzer & Visualization Suite', subtitle: 'Next.js, Node.js, Chrome DevTools API', link: '',
      bullets: [
        b('Engineered a Manifest V3 Chrome Extension and Next.js web application to seamlessly capture, store, and visually map real-time HTTP Archive (HAR) network data workflows without user disruption.'),
        b('Built a robust Node.js backend integrating SSH2 tunneling for secure remote MongoDB database connections, accompanied by automated shell scripts that reduced local developer setup time by 50%.'),
      ],
    },
  ],
  education: [
    {
      id: 'edu1', visible: true,
      institution: 'Visvesvaraya National Institute of Technology (NIT), Nagpur',
      period: '2020 – 2024',
      degree: 'Bachelor of Technology',
      gpa: '',
    },
  ],
  skills: [
    { id: 's1', visible: true, category: 'Languages & Concepts', items: 'JavaScript, TypeScript, Go, Java, C++, SQL, Object-Oriented Design.' },
    { id: 's2', visible: true, category: 'Web Technologies', items: 'React.js, Next.js, React 19, Tailwind CSS 4, Node.js, Express.js, Redux, WebRTC.' },
    { id: 's3', visible: true, category: 'Architecture & Security', items: 'Server-Driven UI (SDUI), OAuth 2.0 (PKCE), Cryptography (AES-256-GCM, HMAC), DOM Integrity Hashing, MediaPipe, AWS Face Liveness.' },
    { id: 's4', visible: true, category: 'Databases & Tools', items: 'MongoDB, OS-Native Secret Management, Chrome Extension API (Manifest V3).' },
  ],
  responsibilities: [
    {
      id: 'r1', visible: true,
      text: "Event Manager, AXIS'24 (NIT Nagpur): Led a victorious ROBOCUP team, demonstrating strong leadership and cross-functional team management in high-pressure situations.",
    },
  ],
};

export const initialStyle: StyleOptions = {
  themeId: 'classic',
  primaryColor: '#0F2A4A',
  accentColor: '#1A6FC4',
  fontFamily: 'Inter, Arial, sans-serif',
  bodyFontSize: 9.5,
  headingSize: 12,
  nameSize: 22,
  globalFontScale: 0,
  lineHeight: 1.4,
  sectionSpacing: 10,
  documentMargin: 14,
};
