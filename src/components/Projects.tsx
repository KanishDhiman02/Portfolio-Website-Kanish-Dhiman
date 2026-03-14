import { useEffect, useRef, useState } from 'react';
import './styles/Projects.css'; // We will put the CSS here

const ProjectCard = ({ frontImage, title, techStack, bullets, isFlipped, cardClass }: any) => {

  return (
    <div 
      className={`project-card-container ${cardClass} ${isFlipped ? 'flipped' : ''}`}
    >
      <div className="project-card-inner">
        {/* FRONT */}
        <div 
          className="project-card-front" 
          style={{ backgroundImage: `url(${frontImage})` }}
        >
            <h2 className="project-front-title">{title}</h2>
        </div>
        
        {/* BACK */}
        <div className="project-card-back">
          <h3 className="project-title">{title}</h3>
          <div className="project-tech">{techStack}</div>
          
          <div className="project-details">
            {bullets.map((bullet: string, i: number) => (
              <div key={i} className="project-bullet">{bullet}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isStacked, setIsStacked] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      if (Math.abs(delta) < 6) return;

      const direction = delta > 0 ? 'down' : 'up';
      lastScrollY = currentScrollY;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inViewport =
        rect.top < window.innerHeight * 0.8 &&
        rect.bottom > window.innerHeight * 0.25;

      if (!inViewport) return;

      const nextStacked = direction === 'up';
      setIsStacked((prev) => (prev === nextStacked ? prev : nextStacked));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <h2 className="section-heading">Engineered Systems</h2>
      <div className={`projects-grid ${isStacked ? 'stacked' : 'unstacked'}`}>
        <ProjectCard 
          cardClass="card-1"
          isFlipped={!isStacked}
          frontImage="/images/card.png"
          title="Hummingbird-AHO"
          techStack="C++ • Python • Object-Oriented Design"
          bullets={[
            "Architected a high-performance optimization engine to minimize computational latency in high-dimensional spaces.",
            "Engineered modular class structures (Optimizer/DataLoader) for scalable data ingestion.",
            "Implemented a visit-table mechanism to avoid redundant computation cycles and lower memory overhead."
          ]}
        />
        <ProjectCard 
          cardClass="card-2"
          isFlipped={!isStacked}
          frontImage="/images/card.png"
          title="2S-AHO Framework"
          techStack="Python • Scikit-learn • Systems Performance"
          bullets={[
            "Developed a scalable optimization framework achieving a 65% reduction in data dimensionality.",
            "Maintained sub-second prediction latency across 12 datasets through efficient feature pruning.",
            "Published findings at ANTIC 2025, detailing the robust modular architecture of the framework."
          ]}
        />
      </div>
    </section>
  );
};

export default Projects;