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
                <a
                  href="#work"
                  className="screen-nav-link"
                  onClick={(event) => handleSectionLinkClick(event, "#work")}
                >
                  Services
                </a>
                <a
                  href="#contact"
                  className="screen-nav-link"
                  onClick={(event) => handleSectionLinkClick(event, "#contact")}
                >
                  Blog
                </a>
              </div>
              <a
                href="#contact"
                className="screen-nav-cta"
                onClick={(event) => handleSectionLinkClick(event, "#contact")}
              >
                Book A Call ↗
              </a>
            </nav>

            {/* Main hero area */}
            <div className="screen-hero">
              {/* Vertical text left */}
              <div className="screen-vertical-text">PORTFOLIO</div>

              {/* Left content */}
              <div className="screen-left">
                <div className="screen-stats">
                  <div className="screen-stat">
                    <span className="screen-stat-num">skdjbnflksd</span>
                    <span className="screen-stat-label">abcd</span>
                  </div>
                  <div className="screen-stat">
                    <span className="screen-stat-num">xyz</span>
                    <span className="screen-stat-label">mnop</span>
                  </div>
                </div>

                <h1 className="screen-hello">Hello</h1>
                <p className="screen-subtitle">
                  — It's Kanish, a software engineer specializing in crafting seamless digital experience. 
                </p>
              </div>

              {/* Photo - right side */}
              <div className="screen-photo">
                <img src="/images/mee.png" alt="Kanish" className="screen-photo-img" />
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
