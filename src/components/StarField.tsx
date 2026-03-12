import { useEffect, useRef } from "react";

interface Star {
  theta: number;
  phi: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  trail: { x: number; y: number }[];
}

const STAR_COUNT = 1800;
const SPHERE_RADIUS = 1100;
const ROTATION_SPEED = 0.0010;

function createStar(): Star {
  return {
    theta: Math.acos(2 * Math.random() - 1),
    phi: Math.random() * Math.PI * 2,
    size: Math.random() * 2 + 0.4,
    baseOpacity: Math.random() * 0.6 + 0.3,
    twinkleSpeed: 0.01 + Math.random() * 0.03,
    twinkleOffset: Math.random() * Math.PI * 2,
  };
}

function createMeteor(w: number, h: number): Meteor {
  const side = Math.floor(Math.random() * 4);
  let x: number, y: number;
  if (side === 0) { x = Math.random() * w; y = -10; }
  else if (side === 1) { x = w + 10; y = Math.random() * h; }
  else if (side === 2) { x = Math.random() * w; y = h + 10; }
  else { x = -10; y = Math.random() * h; }

  const angle = Math.atan2(h / 2 - y, w / 2 - x) + (Math.random() - 0.5) * 1.5;
  const speed = 4 + Math.random() * 6;

  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    maxLife: 60 + Math.random() * 80,
    size: 1.2 + Math.random() * 1.5,
    trail: [],
  };
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let rotationAngle = 0;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      stars = Array.from({ length: STAR_COUNT }, () => createStar());
    };

    resize();
    init();
    window.addEventListener("resize", resize);

    const TRAIL_LEN = 18;

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      time++;
      rotationAngle += ROTATION_SPEED;

      const cx = w / 2;
      const cy = h / 2;

      for (const star of stars) {
        const rotatedPhi = star.phi + rotationAngle;

        const sx = SPHERE_RADIUS * Math.sin(star.theta) * Math.cos(rotatedPhi);
        const sy = SPHERE_RADIUS * Math.cos(star.theta);
        const sz = SPHERE_RADIUS * Math.sin(star.theta) * Math.sin(rotatedPhi);

        if (sz < -50) continue;

        const perspective = 1200;
        const scale = perspective / (perspective + sz);
        const px = cx + sx * scale;
        const py = cy + sy * scale * 0.6;

        const depthFactor = (sz + SPHERE_RADIUS) / (2 * SPHERE_RADIUS);
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.baseOpacity * depthFactor * (0.65 + 0.35 * twinkle);

        if (alpha < 0.03) continue;

        const size = star.size * scale;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        if (size > 1.1 && alpha > 0.2) {
          ctx.beginPath();
          ctx.arc(px, py, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 210, 255, ${alpha * 0.1})`;
          ctx.fill();
        }
      }

      // Spawn meteors occasionally
      if (Math.random() < 0.008) {
        meteors.push(createMeteor(w, h));
      }

      meteors = meteors.filter((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.life++;

        m.trail.push({ x: m.x, y: m.y });
        if (m.trail.length > TRAIL_LEN) m.trail.shift();

        const progress = m.life / m.maxLife;
        const meteorAlpha = progress < 0.15
          ? progress / 0.15
          : 1 - (progress - 0.15) / 0.85;

        for (let i = 0; i < m.trail.length - 1; i++) {
          const t = i / m.trail.length;
          const ta = meteorAlpha * t * 0.6;
          ctx.beginPath();
          ctx.moveTo(m.trail[i].x, m.trail[i].y);
          ctx.lineTo(m.trail[i + 1].x, m.trail[i + 1].y);
          ctx.strokeStyle = `rgba(220, 240, 255, ${ta})`;
          ctx.lineWidth = m.size * t;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${meteorAlpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 220, 255, ${meteorAlpha * 0.2})`;
        ctx.fill();

        return m.life < m.maxLife;
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default StarField;
