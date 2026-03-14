import { type CSSProperties, useEffect, useRef, useState } from 'react';
import './styles/Projects.css'; // We will put the CSS here

const ProjectCard = ({ title, techStack, bullets, cardClass, link }: any) => {

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

  useEffect(() => {
    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const updateOpenProgress = () => {
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

    updateOpenProgress();
    window.addEventListener('scroll', updateOpenProgress, { passive: true });
    window.addEventListener('resize', updateOpenProgress);

    return () => {
      window.removeEventListener('scroll', updateOpenProgress);
      window.removeEventListener('resize', updateOpenProgress);
    };
  }, []);

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <h2 className="section-heading">Engineered Systems</h2>
      <div
        className="projects-grid"
        style={{ '--project-open-progress': openProgress } as CSSProperties}
      >
        <ProjectCard 
          cardClass="card-1"
          link="https://github.com/KanishDhiman02/Hummingbird_AHO_Optimizer_Engine.git"
          title="Hummingbird-AHO Engine"
          techStack="Python • NumPy • Object-Oriented Design"
          bullets={[
            "Engineered a production-ready, highly modular optimization library designed to aggressively minimize computational latency in high-dimensional systems.",
            "Architected decoupled, scalable object-oriented structures (Optimizer and DataLoader classes) to separate data ingestion from the core algorithmic logic.",
            "Optimized system-level resource utilization by implementing a vectorized visit-table mechanism, successfully mitigating redundant CPU cycles and memory overhead."
          ]}
        />
        <ProjectCard 
          cardClass="card-2"
          link="https://drive.google.com/file/d/1MrtO8eSkoLvxoBd6zdWrVhmWpUOrxpPF/view?usp=share_link"
          title="2S-AHO: Scalable Framework"
          techStack="Systems Performance • Machine Learning"
          bullets={[
            "Developed a robust dimensionality-reduction framework achieving a 65% reduction in feature space, significantly lowering downstream storage and processing costs.",
            "Engineered the data pipeline to maintain sub-second prediction latency and high throughput across 12 distinct, complex datasets.",
            "Subjected the system architecture to rigorous statistical benchmarking (Friedman/Wilcoxon); framework peer-reviewed and published at the ANTIC 2025 conference."
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