import type { CSSProperties } from "react";
import "./styles/WaveCta.css";

type Particle = {
  left: number;
  bottom: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
  rotation: number;
  shape: "square" | "diamond" | "cross";
};

const bottomParticles: Particle[] = Array.from({ length: 220 }, (_, i) => {
  const left = (i * 19.7) % 100;
  const baseBand = 3 + ((i * 11) % 44);
  const waveOffset = Math.sin((left / 100) * Math.PI * 2 + i * 0.13) * 10;

  return {
    left,
    bottom: Math.max(0, Math.min(62, baseBand + waveOffset)),
    size: 3 + (i % 5),
    delay: (i % 21) * 0.11,
    duration: 2.8 + (i % 7) * 0.45,
    drift: ((i % 6) - 2.5) * 6,
    opacity: 0.45 + (i % 4) * 0.12,
    rotation: (i * 23) % 180,
    shape: i % 6 === 0 ? "cross" : i % 2 === 0 ? "diamond" : "square",
  };
});

const topTrailParticles: Particle[] = Array.from({ length: 52 }, (_, i) => {
  const t = i / 51;
  const left = 14 + t * 72;
  const arc = Math.sin(t * Math.PI * 2.2) * 16;

  return {
    left,
    bottom: 62 + arc,
    size: 4 + (i % 4),
    delay: (i % 17) * 0.12,
    duration: 3.2 + (i % 5) * 0.5,
    drift: ((i % 5) - 2) * 4,
    opacity: 0.35 + (i % 4) * 0.15,
    rotation: (i * 17) % 180,
    shape: i % 5 === 0 ? "cross" : i % 2 === 0 ? "diamond" : "square",
  };
});

const particleStyle = (p: Particle): CSSProperties =>
  ({
    left: `${p.left}%`,
    bottom: `${p.bottom}%`,
    width: `${p.size}px`,
    height: `${p.size}px`,
    animationDelay: `${p.delay}s`,
    animationDuration: `${p.duration}s`,
    ["--alpha" as string]: `${p.opacity}`,
    ["--rot" as string]: `${p.rotation}deg`,
    ["--drift" as string]: `${p.drift}px`,
  } as CSSProperties);

const WaveCta = () => {
  return (
    <section className="wave-cta" id="collaboration">
      <div className="wave-cta-inner">
        <p className="wave-cta-kicker">Product strategy, engineering, and design in one loop</p>
        <h2 className="wave-cta-title">
          Let&apos;s build
          <br />
          something sharp.
        </h2>

        <a className="wave-cta-button" href="#contact">
          Continue to contact
        </a>

        <div className="wave-cta-top-trail" aria-hidden="true">
          {topTrailParticles.map((particle, index) => (
            <span
              key={`trail-${index}`}
              className={`wave-particle wave-particle-${particle.shape}`}
              style={particleStyle(particle)}
            />
          ))}
        </div>

        <div className="wave-cta-bottom-field" aria-hidden="true">
          {bottomParticles.map((particle, index) => (
            <span
              key={`bottom-${index}`}
              className={`wave-particle wave-particle-${particle.shape}`}
              style={particleStyle(particle)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaveCta;
