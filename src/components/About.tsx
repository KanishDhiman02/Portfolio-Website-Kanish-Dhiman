import "./styles/About.css";
import { MdArrowOutward } from "react-icons/md";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container section-container">
        {/* Top row */}
        <div className="about-top">
          <div className="about-intro">
            <h2 className="about-heading title">About Me</h2>
            <p className="about-desc para">
              I am a Computer Science Dual Degree student at NIT Hamirpur, specializing in scalable backend architecture, machine learning pipelines, and high-performance tooling.
               I don't just study algorithms—I engineer them into robust, modular libraries and deployable systems. Whether I am architecting complex object-oriented structures for computational engines, optimizing memory footprints for high-dimensional data, or managing the full software development
                lifecycle for ML applications, my focus is always on clean code, system scalability, and execution speed.
            </p>
          </div>

          <div className="about-stat-card">
            <div className="about-stat-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <span className="about-stat-num">500+</span>
            <p className="about-stat-label">
              Data Structures & Algorithms problems solved across LeetCode and GFG, heavily focusing on dynamic programming, Greedy approaches , Devide and Conquer and Branch & Bound
            </p>
          </div>

          <div className="about-photo-card">
            <img src="/images/framework.png" alt="Framework" className="about-photo-img" />
            <div className="about-photo-badge">
              <MdArrowOutward />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="about-bottom">
          <div className="about-arrow-card">
            <svg
              className="about-arrow-svg"
              viewBox="6 5 120 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20,80 Q60,35 100,50" strokeLinecap="round" />
              <path d="M95,40 L100,50 L88,55" strokeLinecap="round" />
            </svg>
          </div>

          <div className="about-photo2-card">
            <img src="/images/leet.png" alt="consistency" className="about-photo2-img" />
          </div>

          <div className="about-points">
            <div className="about-point">
              <span className="about-point-dot">✦</span>
              <p>
                <b>Software Engineering & Design Patterns:</b> Committed to writing clean, maintainable code using Object-Oriented Design (OOD) and proven design patterns (Singleton, Factory, Observer). I approach development with a focus on the full software lifecycle, building modular components that scale efficiently in production environments
              </p>
            </div>
            <div className="about-point">
              <span className="about-point-dot">✦</span>
              <p>
              <b>Backend Architecture & Database Systems:</b> Focused on building scalable backend services and robust APIs using C++ and Python. I have a strong foundation in database internals—from writing optimized SQL queries to ensuring ACID compliance and proper normalization—designed to handle secure, enterprise-level data reliably
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
