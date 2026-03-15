import { useEffect, useRef } from "react";
import "./styles/WaveCta.css";
import { createWaveText, type WaveTextController } from "./utils/waveText";

const ROLE_LABEL = "OPEN TO SDE & ML ROLES";
const PHRASE_LINES = ["Let's build", "scalable systems."];

const WaveCta = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const wt: WaveTextController = createWaveText(heading, PHRASE_LINES);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          wt.play();
        }
      },
      { threshold: 0.3 }
    );

    io.observe(section);
    return () => {
      io.disconnect();
      wt.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="work-section"
      id="collaboration"
      aria-label={PHRASE_LINES.join(" ")}
    >
      <p className="wave-cta-label">{ROLE_LABEL}</p>
      <h2 ref={headingRef} className="wave-cta-heading" />
    </section>
  );
};

export default WaveCta;
