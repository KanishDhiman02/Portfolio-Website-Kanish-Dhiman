import "./styles/Landing.css";
import { smoother } from "./Navbar";

const Landing = () => {
  const handleSectionLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    event.preventDefault();

    if (smoother) {
      smoother.scrollTo(target, true, "top top");
      return;
    }

    const section = document.querySelector(target);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="landing-section" id="landingDiv">
      {/* MacBook Frame */}
      <div className="macbook">
        <div className="macbook-screen">
          {/* Notch / Camera */}
          <div className="macbook-notch"></div>

          {/* Screen content */}
          <div className="screen-content">
            {/* Inner navbar */}
            <nav className="screen-nav">
              <div className="screen-nav-left">
                <a
                  href="#landingDiv"
                  className="screen-nav-icon"
                  onClick={(event) => handleSectionLinkClick(event, "#landingDiv")}
                >
                  ✦
                </a>
                <a
                  href="#about"
                  className="screen-nav-link"
                  onClick={(event) => handleSectionLinkClick(event, "#about")}
                >
                  About Me
                </a>
                <a
                  href="#work"
                  className="screen-nav-link"
                  onClick={(event) => handleSectionLinkClick(event, "#work")}
                >
                  Portfolio
                </a>
                {/* <a
                  href="#work"
                  className="screen-nav-link"
                  onClick={(event) => handleSectionLinkClick(event, "#work")}
                >
                  Services
                </a> */}
                <a
                  href="#contact"
                  className="screen-nav-link"
                  onClick={(event) => handleSectionLinkClick(event, "#contact")}
                >
                  Blog
                </a>
              </div>
              <a
              href="https://drive.google.com/drive/u/0/folders/1-H-AcQQl5N7M7JSCDE3ZP4oinw7OZaKb"
              className="screen-nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume ↗
            </a>
            </nav>

                      {/* Main hero area */}
            <div className="screen-hero">
              {/* Vertical text left */}
              <div className="screen-vertical-text">PORTFOLIO</div>

              {/* Left content */}
              <div className="screen-left">
                <div className="screen-stats">
                  {/* First Stat Block */}
                  <div className="screen-stat">
                    <span className="screen-stat-num">SDE & ML</span>
                    <span className="screen-stat-label">SPECIALIZATION</span>
                  </div>
                  {/* Second Stat Block */}
                  <div className="screen-stat">
                    <span className="screen-stat-num">CS Dual Degree</span>
                    <span className="screen-stat-label">NIT HAMIRPUR</span>
                  </div>
                </div>

                <h1 className="screen-hello">I build high-performance systems.</h1>
                <p className="screen-subtitle">
                  — It's Kanish, a software engineer specializing in scalable system architecture, machine learning, and computational optimization.
                </p>
              </div>

              {/* Photo - right side */}
              <div className="screen-photo">
                <img src="/images/mee.png" alt="Kanish Dhiman" className="screen-photo-img" />
              </div>
            </div>
            {/* Bottom bar */}
            <div className="screen-bottom">
              <span className="screen-year">2026</span>
              <span className="screen-scroll">Scroll down ↓</span>
            </div>
          </div>
        </div>

        {/* MacBook body/hinge */}
        <div className="macbook-base">
          <div className="macbook-base-top"></div>
          <div className="macbook-base-bottom">
            <div className="macbook-base-indent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
