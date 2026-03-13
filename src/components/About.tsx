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
              I specialize in turning complex problems into elegant solutions. My
              approach blends creativity with strategic thinking to deliver
              products that not only look great but work seamlessly. Ready to
              start your next project?
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
            <span className="about-stat-num">120%</span>
            <p className="about-stat-label">
              Average increase in client engagement in the first 6 months
            </p>
          </div>

          <div className="about-photo-card">
            <img src="/img.png" alt="Kanish" className="about-photo-img" />
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
              viewBox="0 0 120 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20,80 Q60,10 100,50" strokeLinecap="round" />
              <path d="M90,40 L100,50 L88,55" strokeLinecap="round" />
            </svg>
          </div>

          <div className="about-photo2-card">
            <img src="/img.png" alt="Kanish" className="about-photo2-img" />
          </div>

          <div className="about-points">
            <div className="about-point">
              <span className="about-point-dot">✦</span>
              <p>
                With 4+ years of experience, I specialize in creating intuitive,
                user-focused designs that solve real-world problems and deliver
                seamless digital experiences.
              </p>
            </div>
            <div className="about-point">
              <span className="about-point-dot">✦</span>
              <p>
                I thrive on working closely with clients, blending creativity
                with strategy to bring their vision to life through thoughtful,
                impactful design solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
