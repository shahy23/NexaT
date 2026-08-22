import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Code2, Smartphone, Palette, Cloud, Shield, Settings2,
  Menu, X, ArrowRight, ArrowUpRight, CheckCircle2, Mail, Phone,
  MapPin, Clock, Github, Linkedin, Twitter, Instagram, Send,
  Star, Layers, Server, Lock, Database, Globe, Rocket, Users,
  Target, Eye, Heart, Award, Cpu, GitBranch, ChevronRight
} from "lucide-react";

/* ---------------------------------------------------------------
   NexaTech — design tokens
   Ink:        #0B0F19  (deep navy-black, dark sections)
   Off-white:  #FAFAF8  (warm paper, light sections)
   Indigo:     #4F46E5  (primary accent)
   Violet:     #8B5CF6  (secondary accent)
   Cyan:       #22D3EE  (signature glow, used sparingly)
   Slate text: #5B6472
   Display font: Sora | Body: Inter | Mono/utility: JetBrains Mono
----------------------------------------------------------------*/

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
`;

const GLOBAL_CSS = `
${FONTS}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; }
.nxt-root {
  --ink: #0B0F19;
  --ink-soft: #131a2b;
  --paper: #FAFAF8;
  --paper-dim: #F1F0EC;
  --indigo: #4F46E5;
  --violet: #8B5CF6;
  --cyan: #22D3EE;
  --slate: #5B6472;
  --slate-light: #8891A0;
  --line: #E4E2DB;
  --line-dark: #232B3D;
  font-family: 'Inter', sans-serif;
  background: var(--paper);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
}
.nxt-root .f-display { font-family: 'Sora', sans-serif; }
.nxt-root .f-mono { font-family: 'JetBrains Mono', monospace; }

.nxt-grad-text {
  background: linear-gradient(100deg, #4F46E5 0%, #8B5CF6 55%, #22D3EE 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nxt-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  letter-spacing: 0.02em;
  color: var(--indigo);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}
.nxt-eyebrow::before { content: ''; width: 7px; height: 7px; border-radius: 2px; background: var(--indigo); display: inline-block; }
.nxt-eyebrow.on-dark { color: var(--cyan); }
.nxt-eyebrow.on-dark::before { background: var(--cyan); }

.nxt-btn {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 15px;
  border-radius: 12px;
  padding: 13px 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color .18s ease, color .18s ease;
  white-space: nowrap;
}
.nxt-btn:active { transform: scale(0.97); }
.nxt-btn-primary { background: var(--ink); color: #fff; box-shadow: 0 1px 0 rgba(0,0,0,0.05); }
.nxt-btn-primary:hover { background: #1c2438; transform: translateY(-2px); box-shadow: 0 10px 24px -8px rgba(79,70,229,0.35); }
.nxt-btn-gradient { background: linear-gradient(100deg, #4F46E5, #8B5CF6); color: #fff; }
.nxt-btn-gradient:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -8px rgba(139,92,246,0.55); }
.nxt-btn-outline { background: transparent; color: var(--ink); border-color: var(--line); }
.nxt-btn-outline:hover { border-color: var(--ink); transform: translateY(-2px); }
.nxt-btn-outline.on-dark { color: #fff; border-color: rgba(255,255,255,0.25); }
.nxt-btn-outline.on-dark:hover { border-color: #fff; background: rgba(255,255,255,0.06); }
.nxt-btn-ghost-dark { background: rgba(255,255,255,0.06); color: #fff; border-color: rgba(255,255,255,0.14); }
.nxt-btn-ghost-dark:hover { background: rgba(255,255,255,0.12); transform: translateY(-2px); }
.nxt-btn-sm { padding: 9px 16px; font-size: 13.5px; border-radius: 10px; }
.nxt-btn-block { width: 100%; justify-content: center; }

.nxt-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.nxt-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px -20px rgba(20,20,40,0.18);
  border-color: rgba(79,70,229,0.35);
}

.nxt-nav-link {
  font-size: 14.5px;
  font-weight: 500;
  color: var(--slate);
  text-decoration: none;
  cursor: pointer;
  position: relative;
  padding: 6px 2px;
  transition: color 0.2s ease;
}
.nxt-nav-link:hover { color: var(--ink); }
.nxt-nav-link.active { color: var(--ink); }
.nxt-nav-link.active::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -4px;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--indigo), var(--violet));
}

.nxt-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(.16,.84,.44,1), transform 0.7s cubic-bezier(.16,.84,.44,1); }
.nxt-reveal.in { opacity: 1; transform: translateY(0); }

.nxt-dot-bg {
  background-image: radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px);
  background-size: 22px 22px;
}
.nxt-grid-bg {
  background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 44px 44px;
}

.nxt-input {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 13px 15px;
  font-family: 'Inter', sans-serif;
  font-size: 14.5px;
  background: #fff;
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.nxt-input:focus { border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(79,70,229,0.14); }
.nxt-input.err { border-color: #DC2626; }
.nxt-label { font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 6px; display: block; }
.nxt-err-text { font-size: 12.5px; color: #DC2626; margin-top: 5px; }

.nxt-scrollbar-none::-webkit-scrollbar { display: none; }

@media (prefers-reduced-motion: reduce) {
  .nxt-reveal { transition: none !important; opacity: 1 !important; transform: none !important; }
  .nxt-card:hover { transform: none !important; }
}

.nxt-focus:focus-visible { outline: 2px solid var(--indigo); outline-offset: 3px; border-radius: 6px; }

.nxt-filter-chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  padding: 9px 18px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--slate);
  cursor: pointer;
  transition: all 0.2s ease;
}
.nxt-filter-chip:hover { border-color: var(--indigo); color: var(--ink); }
.nxt-filter-chip.active { background: var(--ink); color: #fff; border-color: var(--ink); }
`;

/* ---------------------------------------------------------------
   Data
----------------------------------------------------------------*/

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "20+", label: "Clients Worldwide" },
  { value: "5+", label: "Years Experience" },
];

const HOME_SERVICES = [
  { icon: Code2, title: "Web Development", desc: "Fast, scalable web applications built on modern frameworks and clean architecture." },
  { icon: Smartphone, title: "Mobile Development", desc: "Native-feel iOS and Android apps that people actually enjoy using daily." },
  { icon: Palette, title: "UI/UX Design", desc: "Interfaces shaped by research, tested with real users, refined until they feel obvious." },
  { icon: Cloud, title: "Cloud Solutions", desc: "Infrastructure that scales with demand, without the 3am pager duty." },
  { icon: Shield, title: "Cybersecurity", desc: "Audits, hardening, and monitoring that keep your product and your users safe." },
  { icon: Settings2, title: "Digital Transformation", desc: "Legacy systems modernized into workflows your team will actually want to use." },
];

const SERVICES_DETAIL = [
  {
    icon: Code2, id: "web-development", title: "Web Development",
    desc: "We design and build web applications that are fast on day one and easy to extend on day five hundred — from marketing sites to complex internal platforms.",
    features: ["Custom front-end and back-end builds", "API design and integration", "Performance and accessibility audits", "Ongoing maintenance and support"],
    tech: ["React.js", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    icon: Smartphone, id: "mobile-app-development", title: "Mobile App Development",
    desc: "Cross-platform and native mobile apps built for real-world networks, real battery constraints, and real users who expect things to just work.",
    features: ["iOS and Android delivery", "Offline-first architecture", "Push notifications and analytics", "App store submission support"],
    tech: ["React Native", "Swift", "Kotlin", "Firebase"],
  },
  {
    icon: Palette, id: "ui-ux-design", title: "UI/UX Design",
    desc: "Design that starts with the user's problem, not the pattern library — wireframes, prototypes, and design systems that hold up as your product grows.",
    features: ["User research and journey mapping", "Wireframes and interactive prototypes", "Design systems and component libraries", "Usability testing"],
    tech: ["Figma", "Framer", "Storybook", "Adobe CC"],
  },
  {
    icon: Cloud, id: "cloud-solutions", title: "Cloud Solutions",
    desc: "Infrastructure planning, migration, and automation so your team ships more and babysits servers less.",
    features: ["Cloud migration and architecture", "CI/CD pipeline setup", "Auto-scaling and cost optimization", "24/7 monitoring and alerting"],
    tech: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    icon: Shield, id: "cybersecurity", title: "Cybersecurity",
    desc: "Practical, prioritized security work — we find what actually puts you at risk and fix it, instead of handing you a 200-page PDF.",
    features: ["Penetration testing", "Security audits and code review", "Compliance readiness (SOC 2, GDPR)", "Incident response planning"],
    tech: ["OWASP", "Burp Suite", "Snyk", "AWS GuardDuty"],
  },
  {
    icon: Settings2, id: "software-consulting", title: "Software Consulting",
    desc: "An outside team that's shipped this before — technical audits, architecture reviews, and roadmap planning for teams making big decisions.",
    features: ["Technical due diligence", "Architecture and stack reviews", "Team process and tooling audits", "Roadmap and scoping workshops"],
    tech: ["Notion", "Linear", "Git", "Python"],
  },
];

const WHY_US = [
  { icon: Users, title: "Experienced Team", desc: "Engineers and designers who've shipped products across fintech, health, and logistics." },
  { icon: Cpu, title: "Modern Technologies", desc: "We build with tools that are proven in production, not just trending this week." },
  { icon: Layers, title: "Scalable Solutions", desc: "Architecture decisions made for the version of your product that exists in two years." },
  { icon: Heart, title: "Client-Focused Approach", desc: "Weekly check-ins, clear scopes, and no surprise invoices at the end of a sprint." },
];

const PROJECTS = [
  { title: "FinFlow", category: "Web", desc: "A real-time financial dashboard consolidating multi-bank data for SME treasury teams.", tech: ["React", "Node.js", "PostgreSQL"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=60" },
  { title: "MediConnect", category: "Mobile", desc: "A telehealth app connecting patients with clinicians across three time zones.", tech: ["React Native", "Firebase"], img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=60" },
  { title: "Lumina Design System", category: "UI/UX", desc: "A component library and design language unifying five product teams under one brand.", tech: ["Figma", "Storybook"], img: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&q=60" },
  { title: "Nimbus Console", category: "Software", desc: "An internal cloud-ops console giving infra teams one view across staging and production.", tech: ["AWS", "Docker", "TypeScript"], img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=60" },
  { title: "ShopSphere", category: "Web", desc: "A headless storefront platform built for a fast-growing direct-to-consumer brand.", tech: ["React", "Node.js"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=60" },
  { title: "TrackFleet", category: "Mobile", desc: "Live fleet tracking and driver scheduling for a regional logistics operator.", tech: ["React Native", "MongoDB"], img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=60" },
  { title: "SecureVault", category: "Software", desc: "A credential and secrets-management platform hardened for regulated industries.", tech: ["Python", "AWS", "Docker"], img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=60" },
  { title: "Artisan Market", category: "UI/UX", desc: "A full brand and UX overhaul for a marketplace connecting independent makers to buyers.", tech: ["Figma", "React"], img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=60" },
];

const TEAM = [
  { name: "Daniel Osei", role: "CEO", bio: "Sets the direction and makes sure every project ships something clients are proud of.", img: "https://i.pravatar.cc/300?img=13" },
  { name: "Maya Chen", role: "Lead Frontend Developer", bio: "Turns design files into interfaces that feel fast on every device.", img: "https://i.pravatar.cc/300?img=47" },
  { name: "Jordan Blake", role: "Backend Developer", bio: "Builds the APIs and data layers that keep everything running under load.", img: "https://i.pravatar.cc/300?img=33" },
  { name: "Priya Nair", role: "UI/UX Designer", bio: "Leads research and prototyping so every screen earns its place.", img: "https://i.pravatar.cc/300?img=45" },
  { name: "Marcus Webb", role: "Cybersecurity Engineer", bio: "Finds the gaps before anyone else does, and closes them fast.", img: "https://i.pravatar.cc/300?img=52" },
  { name: "Elena Rossi", role: "Project Manager", bio: "Keeps scope, timeline, and communication tight from kickoff to launch.", img: "https://i.pravatar.cc/300?img=49" },
];

const TESTIMONIALS = [
  { name: "Sarah Whitfield", title: "COO, Northbridge Capital", quote: "NexaTech rebuilt our client portal in ten weeks and it hasn't gone down once since launch.", img: "https://i.pravatar.cc/150?img=5" },
  { name: "Tomas Alvarez", title: "Founder, Ridgeline Health", quote: "They caught security issues our previous vendor missed entirely, then fixed them fast.", img: "https://i.pravatar.cc/150?img=12" },
  { name: "Aisha Patel", title: "Head of Product, Cartway", quote: "The design system they built let our team ship features twice as fast, with far fewer bugs.", img: "https://i.pravatar.cc/150?img=25" },
];

const TECHNOLOGIES = ["React.js", "Node.js", "JavaScript", "TypeScript", "Python", "MongoDB", "PostgreSQL", "AWS", "Docker", "Git"];

const TIMELINE = [
  { year: "2019", title: "NexaTech founded", desc: "Started as a two-person freelance team building websites for local businesses." },
  { year: "2020", title: "First enterprise client", desc: "Delivered a fintech dashboard that led to our first long-term retainer contract." },
  { year: "2022", title: "Cloud & security practice launched", desc: "Grew the team to cover cloud infrastructure and dedicated cybersecurity work." },
  { year: "2024", title: "50-project milestone", desc: "Crossed 50 shipped projects across fintech, health, logistics, and retail." },
  { year: "2026", title: "Going global", desc: "Opened remote-first collaboration with clients across three continents." },
];

const VALUES = [
  { icon: Target, title: "Integrity", desc: "We tell clients what they need to hear, not just what's easy to say." },
  { icon: Rocket, title: "Innovation", desc: "We stay close to new tools, but only ship what's actually proven." },
  { icon: Users, title: "Collaboration", desc: "The best product decisions happen in the room with the client, not after." },
  { icon: Award, title: "Excellence", desc: "We'd rather ship two weeks later than ship something we're not proud of." },
];

const SERVICE_TYPES = ["Web Development", "Mobile Development", "UI/UX Design", "Cloud Solutions", "Cybersecurity", "Software Consulting", "Not sure yet"];

/* ---------------------------------------------------------------
   Hooks
----------------------------------------------------------------*/

function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useReveal();
  return (
    <div
      ref={ref}
      className={`nxt-reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   Signature hero element: animated node network on canvas
----------------------------------------------------------------*/

function NetworkCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];
    let w, h;

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width * 2;
      h = canvas.height = rect.height * 2;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      const count = Math.max(18, Math.floor((rect.width * rect.height) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (reduce ? 0 : 0.35),
        vy: (Math.random() - 0.5) * (reduce ? 0 : 0.35),
        r: Math.random() * 1.6 + 1.2,
      }));
    }

    const colors = ["79,70,229", "139,92,246", "34,211,238"];

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = w * 0.14;
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(139,92,246,${(1 - dist / maxDist) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors[i % colors.length]},0.9)`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

/* ---------------------------------------------------------------
   Shared components
----------------------------------------------------------------*/

function Button({ children, variant = "primary", onClick, className = "", type = "button", size = "md" }) {
  const map = {
    primary: "nxt-btn-primary",
    gradient: "nxt-btn-gradient",
    outline: "nxt-btn-outline",
    "outline-dark": "nxt-btn-outline on-dark",
    "ghost-dark": "nxt-btn-ghost-dark",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`nxt-btn nxt-focus ${map[variant] || map.primary} ${size === "sm" ? "nxt-btn-sm" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

function SectionTitle({ eyebrow, title, subtitle, onDark = false, align = "center" }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === "center" ? 620 : "none", margin: align === "center" ? "0 auto" : 0 }}>
      {eyebrow && <div className={`nxt-eyebrow ${onDark ? "on-dark" : ""}`} style={{ marginBottom: 14, justifyContent: align === "center" ? "center" : "flex-start" }}>{eyebrow}</div>}
      <h2 className="f-display" style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, lineHeight: 1.15, color: onDark ? "#fff" : "var(--ink)", margin: 0 }}>{title}</h2>
      {subtitle && <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.65, color: onDark ? "#A6ADBB" : "var(--slate)" }}>{subtitle}</p>}
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc, index }) {
  return (
    <Reveal delay={index * 60}>
      <div className="nxt-card" style={{ padding: 30, height: "100%" }}>
        <div style={{ width: 48, height: 48, borderRadius: 13, background: "linear-gradient(135deg,#EEF2FF,#F3E8FF)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <Icon size={22} color="#4F46E5" strokeWidth={1.8} />
        </div>
        <h3 className="f-display" style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px" }}>{title}</h3>
        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--slate)", margin: 0 }}>{desc}</p>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project, index, onOpen }) {
  return (
    <Reveal delay={(index % 4) * 60}>
      <div className="nxt-card" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => onOpen && onOpen(project)}>
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
          <img
            src={project.img}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <div className="f-mono" style={{ position: "absolute", top: 12, left: 12, background: "rgba(11,15,25,0.75)", color: "#fff", fontSize: 11.5, padding: "5px 10px", borderRadius: 8 }}>
            {project.category}
          </div>
        </div>
        <div style={{ padding: 22 }}>
          <h3 className="f-display" style={{ fontSize: 17, fontWeight: 600, margin: "0 0 6px" }}>{project.title}</h3>
          <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6, margin: "0 0 14px" }}>{project.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {project.tech.map((t) => (
              <span key={t} className="f-mono" style={{ fontSize: 11, color: "var(--indigo)", background: "#EEF2FF", padding: "4px 9px", borderRadius: 7 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>
            View Project <ArrowUpRight size={15} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------------
   Navbar & Footer
----------------------------------------------------------------*/

function Logo({ onDark = false, onClick }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg,#4F46E5,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span className="f-display" style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>N</span>
      </div>
      <span className="f-display" style={{ fontWeight: 700, fontSize: 18, color: onDark ? "#fff" : "var(--ink)" }}>NexaTech</span>
    </div>
  );
}

function Navbar({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navigate = (id) => { go(id); setOpen(false); };
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{
        background: scrolled ? "rgba(250,250,248,0.85)" : "rgba(250,250,248,0.0)",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "all 0.25s ease",
      }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo onClick={() => navigate("home")} />
          <nav style={{ display: "flex", alignItems: "center", gap: 30 }} className="nxt-nav-desktop">
            {NAV_ITEMS.map((n) => (
              <span key={n.id} className={`nxt-nav-link ${page === n.id ? "active" : ""}`} onClick={() => navigate(n.id)}>{n.label}</span>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="nxt-cta-desktop">
              <Button variant="gradient" size="sm" onClick={() => navigate("contact")}>Start a Project <ArrowRight size={14} /></Button>
            </div>
            <button className="nxt-focus nxt-hamburger" aria-label="Menu" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", display: "none", padding: 6 }}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <div className="nxt-mobile-panel" style={{
        maxHeight: open ? 420 : 0, overflow: "hidden", transition: "max-height 0.3s ease",
        background: "#fff", borderBottom: open ? "1px solid var(--line)" : "none",
      }}>
        <div style={{ padding: "8px 24px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_ITEMS.map((n) => (
            <div key={n.id} onClick={() => navigate(n.id)} style={{ padding: "12px 4px", fontSize: 15.5, fontWeight: 500, color: page === n.id ? "var(--indigo)" : "var(--ink)", borderBottom: "1px solid var(--line)", cursor: "pointer" }}>
              {n.label}
            </div>
          ))}
          <div style={{ marginTop: 14 }}>
            <Button variant="gradient" className="nxt-btn-block" onClick={() => navigate("contact")}>Start a Project <ArrowRight size={14} /></Button>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .nxt-nav-desktop { display: none !important; }
          .nxt-cta-desktop { display: none !important; }
          .nxt-hamburger { display: inline-flex !important; }
        }
      `}</style>
    </div>
  );
}

function Footer({ go }) {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  return (
    <footer style={{ background: "var(--ink)", color: "#C6CBD6", paddingTop: 64 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px" }}>
        <div className="nxt-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.3fr", gap: 40, paddingBottom: 48 }}>
          <div>
            <Logo onDark onClick={() => go("home")} />
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#8891A0", marginTop: 16, maxWidth: 280 }}>
              We design and build web, mobile, and cloud products for teams who need software that holds up under real use.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Icon size={16} color="#C6CBD6" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="f-mono" style={{ fontSize: 12.5, color: "#8891A0", letterSpacing: "0.04em", marginBottom: 16 }}>QUICK LINKS</h4>
            {NAV_ITEMS.map((n) => (
              <div key={n.id} onClick={() => go(n.id)} style={{ fontSize: 14, marginBottom: 12, cursor: "pointer", color: "#C6CBD6" }}>{n.label}</div>
            ))}
          </div>
          <div>
            <h4 className="f-mono" style={{ fontSize: 12.5, color: "#8891A0", letterSpacing: "0.04em", marginBottom: 16 }}>SERVICES</h4>
            {["Web Development", "Mobile Development", "UI/UX Design", "Cloud Solutions", "Cybersecurity"].map((s) => (
              <div key={s} onClick={() => go("services")} style={{ fontSize: 14, marginBottom: 12, cursor: "pointer", color: "#C6CBD6" }}>{s}</div>
            ))}
          </div>
          <div>
            <h4 className="f-mono" style={{ fontSize: 12.5, color: "#8891A0", letterSpacing: "0.04em", marginBottom: 16 }}>STAY UPDATED</h4>
            <p style={{ fontSize: 13.5, color: "#8891A0", marginBottom: 14 }}>Product notes and case studies, a few times a year.</p>
            {subbed ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#22D3EE" }}><CheckCircle2 size={16} /> Subscribed — thanks!</div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setSubbed(true); }} style={{ display: "flex", gap: 8 }}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" style={{ flex: 1, minWidth: 0, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, padding: "10px 12px", fontSize: 13.5, color: "#fff", outline: "none" }} />
                <button type="submit" aria-label="Subscribe" style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 10, border: "none", background: "linear-gradient(135deg,#4F46E5,#8B5CF6)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Send size={15} /></button>
              </form>
            )}
            <div style={{ marginTop: 22, fontSize: 13.5, color: "#8891A0", lineHeight: 1.8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Mail size={14} /> hello@nexatech.io</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}><Phone size={14} /> +1 (415) 555-0142</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "22px 0", fontSize: 13, color: "#6B7280", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span>© {new Date().getFullYear()} NexaTech. All rights reserved.</span>
          <span>Built with React.js</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .nxt-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .nxt-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

/* ---------------------------------------------------------------
   HOME PAGE
----------------------------------------------------------------*/

function Hero({ go }) {
  return (
    <section style={{ position: "relative", background: "var(--ink)", overflow: "hidden" }}>
      <div className="nxt-dot-bg" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
      <NetworkCanvas />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(79,70,229,0.25), transparent 70%)" }} />
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "132px 24px 100px", textAlign: "center" }}>
        <div className="nxt-eyebrow on-dark" style={{ justifyContent: "center", marginBottom: 22 }}>// full-stack digital product studio</div>
        <h1 className="f-display" style={{ fontSize: "clamp(34px,6vw,60px)", fontWeight: 700, lineHeight: 1.1, color: "#fff", margin: 0 }}>
          We Build Digital Products That <span className="nxt-grad-text">Move Businesses Forward</span>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "#A6ADBB", maxWidth: 620, margin: "24px auto 0" }}>
          NexaTech partners with ambitious teams on web, mobile, cloud, design, and security work — from first prototype to the system that runs your business.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}>
          <Button variant="gradient" onClick={() => go("contact")}>Start a Project <ArrowRight size={16} /></Button>
          <Button variant="outline-dark" onClick={() => go("projects")}>View Our Work</Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 44, marginTop: 68, flexWrap: "wrap" }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="f-display" style={{ fontSize: 30, fontWeight: 700, color: "#fff" }}>{s.value}</div>
              <div className="f-mono" style={{ fontSize: 12, color: "#8891A0", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreview({ go }) {
  return (
    <section style={{ padding: "100px 24px", background: "var(--paper)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="nxt-2col">
        <Reveal>
          <div className="nxt-eyebrow">// who we are</div>
          <h2 className="f-display" style={{ fontSize: "clamp(26px,3.6vw,36px)", fontWeight: 700, margin: "14px 0 18px", lineHeight: 1.2 }}>
            A small studio that builds like an in-house team.
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "var(--slate)", marginBottom: 26 }}>
            Since 2019, NexaTech has partnered with founders and product teams to design, build, and secure software that survives contact with real users. We keep teams small, scopes clear, and communication constant — no black box, no handoff surprises.
          </p>
          <Button variant="outline" onClick={() => go("about")}>Learn More <ArrowRight size={15} /></Button>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ borderRadius: 22, overflow: "hidden", border: "1px solid var(--line)" }}>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=60" alt="NexaTech team working" style={{ width: "100%", display: "block", aspectRatio: "5/4", objectFit: "cover" }} />
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width: 860px){ .nxt-2col{ grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function ServicesPreview({ go }) {
  return (
    <section style={{ padding: "100px 24px", background: "var(--paper-dim)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal><SectionTitle eyebrow="// what we do" title="Services built for the whole product lifecycle" subtitle="From first sketch to the infrastructure that keeps you online, every discipline your product needs is under one roof." /></Reveal>
        <div className="nxt-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 52 }}>
          {HOME_SERVICES.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Button variant="outline" onClick={() => go("services")}>See All Services <ArrowRight size={15} /></Button>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px){ .nxt-grid-3{ grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px){ .nxt-grid-3{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section style={{ padding: "100px 24px", background: "var(--ink)", position: "relative", overflow: "hidden" }}>
      <div className="nxt-grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto" }}>
        <Reveal><SectionTitle onDark eyebrow="// why nexatech" title="Built to be the team you don't have to manage" /></Reveal>
        <div className="nxt-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginTop: 52 }}>
          {WHY_US.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              <div style={{ padding: 28, borderRadius: 18, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", height: "100%" }}>
                <w.icon size={24} color="#22D3EE" strokeWidth={1.7} />
                <h3 className="f-display" style={{ fontSize: 16.5, fontWeight: 600, color: "#fff", margin: "18px 0 8px" }}>{w.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#8891A0", margin: 0 }}>{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px){ .nxt-grid-4{ grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px){ .nxt-grid-4{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function FeaturedProjects({ go }) {
  return (
    <section style={{ padding: "100px 24px", background: "var(--paper)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal><SectionTitle eyebrow="// selected work" title="Recent projects" subtitle="A handful of the products we've shipped for clients across fintech, health, and logistics." /></Reveal>
        <div className="nxt-grid-4b" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22, marginTop: 52 }}>
          {PROJECTS.slice(0, 4).map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Button variant="outline" onClick={() => go("projects")}>View All Projects <ArrowRight size={15} /></Button>
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px){ .nxt-grid-4b{ grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px){ .nxt-grid-4b{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function TechStrip() {
  return (
    <section style={{ padding: "64px 24px", background: "var(--paper-dim)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="nxt-eyebrow" style={{ justifyContent: "center", marginBottom: 28 }}>// our stack</div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
          {TECHNOLOGIES.map((t) => (
            <span key={t} className="f-mono" style={{ fontSize: 13.5, padding: "10px 18px", borderRadius: 10, border: "1px solid var(--line)", background: "#fff", color: "var(--ink)" }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section style={{ padding: "100px 24px", background: "var(--paper)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Reveal><SectionTitle eyebrow="// client feedback" title="What clients say after launch" /></Reveal>
        <div className="nxt-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 52 }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <div className="nxt-card" style={{ padding: 28, height: "100%" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={15} fill="#8B5CF6" color="#8B5CF6" />)}
                </div>
                <p className="f-display" style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink)", margin: "0 0 22px", fontWeight: 500 }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={t.img} alt={t.name} style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: 12.5, color: "var(--slate)" }}>{t.title}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px){ .nxt-grid-3{ grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px){ .nxt-grid-3{ grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function CtaBanner({ go }) {
  return (
    <section style={{ padding: "90px 24px", background: "linear-gradient(120deg,#0B0F19 0%, #171235 55%, #1c1440 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.35),transparent 70%)", top: -160, right: -100 }} />
      <Reveal>
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 className="f-display" style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 700, color: "#fff", margin: "0 0 16px", lineHeight: 1.2 }}>
            Have an idea? Let's build it together.
          </h2>
          <p style={{ fontSize: 15.5, color: "#A6ADBB", marginBottom: 30 }}>Tell us what you're working on — we'll reply within one business day with next steps.</p>
          <Button variant="gradient" onClick={() => go("contact")}>Contact Us <ArrowRight size={16} /></Button>
        </div>
      </Reveal>
    </section>
  );
}

function HomePage({ go }) {
  return (
    <>
      <Hero go={go} />
      <AboutPreview go={go} />
      <ServicesPreview go={go} />
      <WhyChooseUs />
      <FeaturedProjects go={go} />
      <TechStrip />
      <Testimonials />
      <CtaBanner go={go} />
    </>
  );
}

/* ---------------------------------------------------------------
   ABOUT PAGE
----------------------------------------------------------------*/

function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section style={{ background: "var(--ink)", padding: "84px 24px 70px", position: "relative", overflow: "hidden" }}>
      <div className="nxt-dot-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <div className="nxt-eyebrow on-dark" style={{ justifyContent: "center", marginBottom: 16 }}>{eyebrow}</div>
        <h1 className="f-display" style={{ fontSize: "clamp(30px,5vw,46px)", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.15 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 16, color: "#A6ADBB", marginTop: 18, lineHeight: 1.7 }}>{subtitle}</p>}
      </div>
    </section>
  );
}

function AboutPage({ go }) {
  return (
    <>
      <PageHeader eyebrow="// about nexatech" title="We treat every project like it's the only one we have." subtitle="A software studio built on small teams, clear scopes, and work that holds up long after launch day." />
      <section style={{ padding: "90px 24px", background: "var(--paper)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="nxt-2col">
          <Reveal>
            <h2 className="f-display" style={{ fontSize: 26, fontWeight: 700, margin: "0 0 14px" }}>Our story</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--slate)" }}>
              NexaTech started in 2019 as two developers building websites out of a shared apartment. What kept clients coming back wasn't just the code — it was showing up, explaining tradeoffs honestly, and shipping on the date we promised. That's still the whole operating model, just with a bigger team behind it.
            </p>
          </Reveal>
          <div style={{ display: "grid", gap: 20 }}>
            <Reveal delay={80}>
              <div className="nxt-card" style={{ padding: 24 }}>
                <Target size={22} color="#4F46E5" />
                <h3 className="f-display" style={{ fontSize: 16, fontWeight: 600, margin: "12px 0 6px" }}>Mission</h3>
                <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.65, margin: 0 }}>Build digital products that measurably move our clients' businesses forward — not just ship features.</p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="nxt-card" style={{ padding: 24 }}>
                <Eye size={22} color="#8B5CF6" />
                <h3 className="f-display" style={{ fontSize: 16, fontWeight: 600, margin: "12px 0 6px" }}>Vision</h3>
                <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.65, margin: 0 }}>To be the technical partner ambitious teams call first, long before they need to hire in-house.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ padding: "90px 24px", background: "var(--paper-dim)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="// what we value" title="The principles behind every project" /></Reveal>
          <div className="nxt-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22, marginTop: 48 }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="nxt-card" style={{ padding: 26, height: "100%" }}>
                  <v.icon size={22} color="#4F46E5" />
                  <h3 className="f-display" style={{ fontSize: 16, fontWeight: 600, margin: "14px 0 8px" }}>{v.title}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "90px 24px", background: "var(--ink)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal><SectionTitle onDark eyebrow="// nexatech in numbers" title="Five years, measured in outcomes" /></Reveal>
          <div className="nxt-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 48 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center", padding: 24, borderRadius: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="f-display" style={{ fontSize: 34, fontWeight: 700, color: "#fff" }}>{s.value}</div>
                <div className="f-mono" style={{ fontSize: 12, color: "#8891A0", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "90px 24px", background: "var(--paper)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal><SectionTitle eyebrow="// growth timeline" title="How we got here" /></Reveal>
          <div style={{ marginTop: 52, position: "relative" }}>
            <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: "var(--line)" }} />
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 70}>
                <div style={{ display: "flex", gap: 24, marginBottom: 36, position: "relative" }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "linear-gradient(135deg,#4F46E5,#8B5CF6)", flexShrink: 0, marginTop: 3, zIndex: 1 }} />
                  <div>
                    <div className="f-mono" style={{ fontSize: 13, color: "var(--indigo)", marginBottom: 4 }}>{t.year}</div>
                    <h4 className="f-display" style={{ fontSize: 17, fontWeight: 600, margin: "0 0 6px" }}>{t.title}</h4>
                    <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "90px 24px", background: "var(--paper-dim)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
          <Reveal><SectionTitle eyebrow="// the people" title="Meet the team behind the work" subtitle="Six people, one shared standard for what counts as done." /></Reveal>
          <div style={{ marginTop: 40 }}>
            <Button variant="outline" onClick={() => go("team")}>Meet The Full Team <ArrowRight size={15} /></Button>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 860px){ .nxt-2col{ grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

/* ---------------------------------------------------------------
   SERVICES PAGE
----------------------------------------------------------------*/

function ServiceDetailBlock({ s, index, go }) {
  const reversed = index % 2 === 1;
  return (
    <div style={{ padding: "60px 0", borderBottom: index < SERVICES_DETAIL.length - 1 ? "1px solid var(--line)" : "none" }}>
      <div className="nxt-2col" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: reversed ? "0.9fr 1.1fr" : "1.1fr 0.9fr", gap: 50, alignItems: "center", direction: reversed ? "rtl" : "ltr" }}>
        <div style={{ direction: "ltr" }}>
          <Reveal>
            <div style={{ width: 52, height: 52, borderRadius: 15, background: "linear-gradient(135deg,#EEF2FF,#F3E8FF)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <s.icon size={24} color="#4F46E5" strokeWidth={1.7} />
            </div>
            <div className="f-mono" style={{ fontSize: 12, color: "var(--indigo)", marginBottom: 8 }}>SERVICE 0{index + 1}</div>
            <h3 className="f-display" style={{ fontSize: 26, fontWeight: 700, margin: "0 0 14px" }}>{s.title}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--slate)", marginBottom: 22 }}>{s.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}>
              {s.tech.map((t) => <span key={t} className="f-mono" style={{ fontSize: 11.5, padding: "5px 11px", borderRadius: 7, background: "var(--paper-dim)", color: "var(--ink)" }}>{t}</span>)}
            </div>
            <Button variant="outline" onClick={() => go("contact")}>Get Started <ArrowRight size={15} /></Button>
          </Reveal>
        </div>
        <div style={{ direction: "ltr" }}>
          <Reveal delay={100}>
            <div className="nxt-card" style={{ padding: 30 }}>
              <h4 className="f-display" style={{ fontSize: 14.5, fontWeight: 600, margin: "0 0 18px", color: "var(--slate)" }}>Key features</h4>
              {s.features.map((f) => (
                <div key={f} style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                  <CheckCircle2 size={17} color="#4F46E5" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 14, lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function ServicesPage({ go }) {
  return (
    <>
      <PageHeader eyebrow="// services" title="Every discipline your product needs" subtitle="From first prototype to production infrastructure, here's exactly how we work." />
      <section style={{ background: "var(--paper)" }}>
        {SERVICES_DETAIL.map((s, i) => <ServiceDetailBlock key={s.id} s={s} index={i} go={go} />)}
      </section>
      <CtaBanner go={go} />
      <style>{`
        @media (max-width: 860px){
          .nxt-2col{ grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>
    </>
  );
}

/* ---------------------------------------------------------------
   PROJECTS PAGE
----------------------------------------------------------------*/

function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Web", "Mobile", "UI/UX", "Software"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  return (
    <>
      <PageHeader eyebrow="// portfolio" title="Work we're proud to show" subtitle="A selection of products we've designed, built, and shipped for clients across industries." />
      <section style={{ padding: "70px 24px 100px", background: "var(--paper)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
            {filters.map((f) => (
              <button key={f} className={`nxt-filter-chip ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="nxt-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {filtered.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
          </div>
          {filtered.length === 0 && <p style={{ textAlign: "center", color: "var(--slate)" }}>No projects in this category yet.</p>}
        </div>
      </section>
      <style>{`
        @media (max-width: 900px){ .nxt-grid-3{ grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px){ .nxt-grid-3{ grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}

/* ---------------------------------------------------------------
   TEAM PAGE
----------------------------------------------------------------*/

function TeamCard({ member, index }) {
  return (
    <Reveal delay={(index % 3) * 70}>
      <div className="nxt-card" style={{ overflow: "hidden", textAlign: "center", padding: "30px 22px" }}>
        <img src={member.img} alt={member.name} style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", margin: "0 auto 18px", border: "3px solid var(--paper-dim)" }} />
        <h3 className="f-display" style={{ fontSize: 17, fontWeight: 600, margin: "0 0 4px" }}>{member.name}</h3>
        <div className="f-mono" style={{ fontSize: 12, color: "var(--indigo)", marginBottom: 12 }}>{member.role}</div>
        <p style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.6, margin: "0 0 18px" }}>{member.bio}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {[Linkedin, Twitter, Github].map((Icon, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: 9, background: "var(--paper-dim)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon size={14} color="var(--slate)" />
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function TeamPage({ go }) {
  return (
    <>
      <PageHeader eyebrow="// our team" title="The people who ship your project" subtitle="Six specialists, one accountable team — no rotating cast of contractors." />
      <section style={{ padding: "80px 24px 100px", background: "var(--paper)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div className="nxt-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {TEAM.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
          </div>
        </div>
      </section>
      <CtaBanner go={go} />
      <style>{`
        @media (max-width: 900px){ .nxt-grid-3{ grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px){ .nxt-grid-3{ grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}

/* ---------------------------------------------------------------
   CONTACT PAGE
----------------------------------------------------------------*/

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", type: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Tell us a little about your project.";
    return e;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", phone: "", company: "", type: "", message: "" });
    }
  };

  return (
    <>
      <PageHeader eyebrow="// get in touch" title="Let's talk about your project" subtitle="Tell us what you're building — we typically reply within one business day." />
      <section style={{ padding: "80px 24px 110px", background: "var(--paper)" }}>
        <div className="nxt-contact-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 50 }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                { icon: Mail, label: "Email", value: "hello@nexatech.io" },
                { icon: Phone, label: "Phone", value: "+1 (415) 555-0142" },
                { icon: MapPin, label: "Office", value: "480 Market Street, San Francisco, CA" },
                { icon: Clock, label: "Working Hours", value: "Mon – Fri, 9:00 AM – 6:00 PM PT" },
              ].map((it) => (
                <div key={it.label} className="nxt-card" style={{ padding: 20, display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <it.icon size={18} color="#4F46E5" />
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, color: "var(--slate)", marginBottom: 3 }}>{it.label}</div>
                    <div style={{ fontSize: 14.5, fontWeight: 600 }}>{it.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid var(--line)", height: 180, position: "relative", background: "var(--paper-dim)" }}>
                <div className="nxt-grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5, filter: "invert(1)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, color: "var(--slate)" }}>
                  <MapPin size={22} color="#4F46E5" />
                  <span style={{ fontSize: 13 }}>Map preview — 480 Market Street, SF</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="nxt-card" style={{ padding: 34 }}>
              {sent && (
                <div style={{ display: "flex", gap: 10, alignItems: "center", background: "#ECFDF5", color: "#047857", padding: "13px 16px", borderRadius: 12, fontSize: 14, marginBottom: 22 }}>
                  <CheckCircle2 size={18} /> Thanks — your message is in. We'll be in touch shortly.
                </div>
              )}
              <form onSubmit={submit}>
                <div className="nxt-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                  <div>
                    <label className="nxt-label">Name *</label>
                    <input className={`nxt-input ${errors.name ? "err" : ""}`} value={form.name} onChange={update("name")} placeholder="Jane Cooper" />
                    {errors.name && <div className="nxt-err-text">{errors.name}</div>}
                  </div>
                  <div>
                    <label className="nxt-label">Email *</label>
                    <input className={`nxt-input ${errors.email ? "err" : ""}`} value={form.email} onChange={update("email")} placeholder="jane@company.com" />
                    {errors.email && <div className="nxt-err-text">{errors.email}</div>}
                  </div>
                </div>
                <div className="nxt-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                  <div>
                    <label className="nxt-label">Phone</label>
                    <input className="nxt-input" value={form.phone} onChange={update("phone")} placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="nxt-label">Company</label>
                    <input className="nxt-input" value={form.company} onChange={update("company")} placeholder="Company name" />
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label className="nxt-label">Project Type</label>
                  <select className="nxt-input" value={form.type} onChange={update("type")} style={{ appearance: "auto" }}>
                    <option value="">Select a service</option>
                    {SERVICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label className="nxt-label">Message *</label>
                  <textarea className={`nxt-input ${errors.message ? "err" : ""}`} rows={5} value={form.message} onChange={update("message")} placeholder="Tell us a bit about your project and timeline..." style={{ resize: "vertical" }} />
                  {errors.message && <div className="nxt-err-text">{errors.message}</div>}
                </div>
                <Button variant="gradient" type="submit" className="nxt-btn-block">Send Message <Send size={15} /></Button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
      <style>{`
        @media (max-width: 860px){ .nxt-contact-grid{ grid-template-columns: 1fr !important; } }
        @media (max-width: 480px){ .nxt-form-2col{ grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}

/* ---------------------------------------------------------------
   APP
----------------------------------------------------------------*/

export default function App() {
  const [page, setPage] = useState("home");

  const go = useCallback((id) => {
    setPage(id);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  let content;
  if (page === "about") content = <AboutPage go={go} />;
  else if (page === "services") content = <ServicesPage go={go} />;
  else if (page === "projects") content = <ProjectsPage go={go} />;
  else if (page === "team") content = <TeamPage go={go} />;
  else if (page === "contact") content = <ContactPage />;
  else content = <HomePage go={go} />;

  return (
    <div className="nxt-root">
      <style>{GLOBAL_CSS}</style>
      <Navbar page={page} go={go} />
      {content}
      <Footer go={go} />
    </div>
  );
}
