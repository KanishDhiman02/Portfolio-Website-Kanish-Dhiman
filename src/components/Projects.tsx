import { type CSSProperties, useEffect, useRef, useState } from 'react';
import './styles/Projects.css'; // We will put the CSS here

interface ProjectCardProps {
  title: string;
  techStack: string;
  bullets: string[];
  cardClass: string;
  link: string;
}

const ProjectCard = ({ title, techStack, bullets, cardClass, link }: ProjectCardProps) => {

  return (
    <div 
      className={`project-card-container ${cardClass}`}
    >
      <div className="project-card-inner">
        {/* FRONT */}
        <div className="project-card-front" />
        
        {/* BACK */}
        <div className="project-card-back">
          <h3 className="project-title">{title}</h3>
          <div className="project-tech">{techStack}</div>
          
          <div className="project-details">
            {bullets.map((bullet: string, i: number) => (
              <div key={i} className="project-bullet">{bullet}</div>
            ))}
          </div>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-github-link"
            >
              View Source <span className="arrow">↗</span>
            </a>
          )}

        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [openProgress, setOpenProgress] = useState(0);
  const navTriggered = useRef(false);
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const updateOpenProgress = () => {
      // While a navbar navigation is in progress, keep cards fully open
      if (navTriggered.current) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = Math.max(section.offsetHeight, 1);
      const viewportAnchor = window.scrollY + window.innerHeight * 0.7;
      const sectionProgress = clamp(
        (viewportAnchor - sectionTop) / sectionHeight,
        0,
        1
      );

      const nextOpenProgress = clamp((sectionProgress - 0.1) / 0.2, 0, 1);
      setOpenProgress((prev) =>
        Math.abs(prev - nextOpenProgress) < 0.01 ? prev : nextOpenProgress
      );
    };

    const handleNavigation = () => {
      navTriggered.current = true;
      setOpenProgress(1);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      // 2000ms covers the smoother's 1.7s animation; after that, normal scroll logic resumes
      navTimerRef.current = setTimeout(() => {
        navTriggered.current = false;
      }, 2000);
    };

    updateOpenProgress();
    window.addEventListener('scroll', updateOpenProgress, { passive: true });
    window.addEventListener('resize', updateOpenProgress);
    window.addEventListener('navigateToProjects', handleNavigation);

    return () => {
      window.removeEventListener('scroll', updateOpenProgress);
      window.removeEventListener('resize', updateOpenProgress);
      window.removeEventListener('navigateToProjects', handleNavigation);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <h2 className="section-heading">ENGINEERED SYSTEMS</h2>
      <div
        className="projects-grid"
        style={{ '--project-open-progress': openProgress } as CSSProperties}
      >
        <ProjectCard 
          cardClass="card-1"
          link="https://github.com/KanishDhiman02/Hummingbird_AHO_Optimizer_Engine.git"
          title="Hummingbird-AHO Engine / 2S-AHO Scalable Framework"
          techStack="Python • C++ • Machine Learning • Algorithm Design • PyPI • GitHub • Springer (ANTIC 2025)"
          bullets={[
            " Cut inference latency from 3.2s to 0.8s and reduced memory overhead by 40% by engineering a vectorized visit-table mechanism within Hummingbird-AHO, an open-source Python package for scalable machine learning data ingestion.",
            "Shrank feature space by 65% while preserving sub-second latency through a dimensionality-reduction pipeline that used SMOTE to correct class imbalance.",
            "Validated the optimization method and performance benchmarks through a Springer-indexed research paper published for ANTIC 2025."
          ]}
        />
        <ProjectCard 
          cardClass="card-2"
          link="https://github.com/KanishDhiman02/aegis-proxy.git"
          title="Aegis: High-Performance C++20 Edge Proxy"
          techStack="C++20 • Asio (Coroutines) • CMake • Systems Design • GitHub"
          bullets={[
            "Engineered a Layer-4 reverse proxy with consistent-hash routing (500 virtual nodes/backend), a 64-way sharded token-bucket rate limiter, and a 3-state circuit breaker with half-open trial gating; sustained 71.7K req/s at 3.6msp99 latency (wrk, 4 threads/100 connections), with lower per-request overhead than an equivalent single-worker nginx config in this reproducible benchmark (./bench.sh).",
            "Resolved a coroutine lifetime hazard with lldb and sanitizers, then validated crash-free load tests with safe backend failover.",
            "Fixed hash-ring bit diffusion to reduce load-distribution deviation from 61% to 4%."
          ]}
        />
        <ProjectCard 
          cardClass="card-3"
          link="https://github.com/KanishDhiman02/Portfolio-Website-Kanish-Dhiman.git"
          title="Frontend Architecture"
          techStack="React • TypeScript • CSS 3D"
          bullets={[
            "Engineered a responsive, component-driven web application using React and TypeScript to ensure strict type safety and maintainable code.",
            "Implemented hardware-accelerated 3D CSS matrix transforms coupled with the Intersection Observer API for performant, scroll-linked physics.",
            "Optimized DOM rendering and responsive typography to guarantee zero cumulative layout shifts (CLS) and enterprise-grade frontend performance."
          ]}
        />
      </div>
    </section>
  );
};

export default Projects;