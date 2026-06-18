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
        b('Engineered a hardened WebRTC KYC SDK from scratch to replace a costly third-party vendor, saving ₹40+ Lakhs annually in API verification costs.'),
        b('Architected a 5-stage cryptographic camera attestation pipeline (relay-token chain, HMAC sealing, re-derivation) to block client-side API spoofing with 99.9% accuracy.'),
        b('Implemented multi-layer anti-tamper protections using DOM mutation integrity hashing and live video track identity enforcement to detect blob URL injections.'),
        b('Integrated real-time liveness validation using MediaPipe and AWS Face Liveness, processing 5,000+ daily checks with sub-second polling.'),
        b('Designed a backend-orchestrated, JSON-driven checkout application, slashing frontend deployment time for new loan journeys by over 60%.'),
        b('Authored 195+ test files achieving 90%+ automated test coverage across journey orchestration and navigation logic.'),
        b('Managed end-to-end development of the Merchant Onboarding portal (Spring Boot & React), reducing manual merchant verification time by 40%.'),
        b('Optimized API integrations and Redux state management, achieving a 35% reduction in load times (under 2 seconds).'),
      ],
    },
    {
      id: 'e2', visible: true,
      company: 'Cleanomatics Tech Solutions', location: '',
      title: 'Web Developer Intern', period: 'May 2023 – July 2023',
      bullets: [
        b('Engineered and optimized web interfaces for 3 distinct e-commerce platforms and mobile applications, ensuring cross-browser compatibility.'),
        b('Consistently met project deadlines with high-quality deliverables, accelerating sprint delivery cycle by 15%.'),
      ],
    },
  ],
  projects: [
    {
      id: 'p1', visible: true,
      title: 'DevSync CLI', subtitle: 'Go, OAuth 2.0, OS-Native Secret Vaults', link: '',
      bullets: [
        b('Designed a Go-based cross-platform CLI (macOS, Windows, Linux) that automates local environment provisioning, slashing engineer onboarding time by 98%.'),
        b('Implemented OAuth 2.0 PKCE flow with a zero-plaintext security model, using OS-native credential managers and AES-256-GCM encryption.'),
      ],
    },
    {
      id: 'p2', visible: true,
      title: 'Network Traffic Analyzer & Visualization Suite', subtitle: 'Next.js, Node.js, Chrome DevTools API', link: '',
      bullets: [
        b('Engineered a Manifest V3 Chrome Extension and Next.js web app to capture, store, and visually map real-time HTTP Archive (HAR) network data.'),
        b('Built a robust Node.js backend integrating SSH2 tunneling for secure remote MongoDB connections.'),
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
    { id: 's1', visible: true, category: 'Languages', items: 'JavaScript, TypeScript, Go, Java, C++, SQL' },
    { id: 's2', visible: true, category: 'Web & Frameworks', items: 'React.js, Next.js, Node.js, Express.js, Redux, WebRTC' },
    { id: 's3', visible: true, category: 'Architecture & Security', items: 'Server-Driven UI, OAuth 2.0 (PKCE), AES-256-GCM, HMAC, MediaPipe, AWS Face Liveness' },
    { id: 's4', visible: true, category: 'Tools & Databases', items: 'MongoDB, Chrome Extension API (Manifest V3), OS-Native Secret Management' },
  ],
  responsibilities: [
    {
      id: 'r1', visible: true,
      text: "Event Manager, AXIS'24 (NIT Nagpur) — Led a victorious ROBOCUP team, demonstrating strong leadership and cross-functional team management in high-pressure situations.",
    },
  ],
};

export const initialStyle: StyleOptions = {
  themeId: 'classic',
  primaryColor: '#0F2A4A',
  accentColor: '#1A6FC4',
  fontFamily: 'Inter, Arial, sans-serif',
};
