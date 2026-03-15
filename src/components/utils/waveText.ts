/**
 * waveText.ts
 * Character-level random slide animation:
 * letters move up out of view, jump below, then ease back in.
 */

export interface WaveTextController {
  /** Start the random character animation loop */
  play: () => void;
  /** Stop all scheduled animation work and free DOM references */
  destroy: () => void;
}

type AnimatedInner = HTMLSpanElement & {
  _animating?: boolean;
  _animTimeout?: number;
};

function easeInQuint(t: number): number {
  return t * t * t * t * t;
}

function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

function animChar(inner: AnimatedInner, delay: number): void {
  const timeoutId = window.setTimeout(() => {
    if (inner._animating) return;
    inner._animating = true;

    const upDur = 950;
    const downDur = 1100;
    let start: number | null = null;

    const up = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / upDur, 1);
      inner.style.transform = `translateY(${-100 * easeInQuint(t)}%)`;

      if (t < 1) {
        requestAnimationFrame(up);
        return;
      }

      inner.style.transform = "translateY(100%)";
      let s2: number | null = null;

      requestAnimationFrame(function down(ts2) {
        if (s2 === null) s2 = ts2;
        const t2 = Math.min((ts2 - s2) / downDur, 1);
        inner.style.transform = `translateY(${100 - 100 * easeOutQuint(t2)}%)`;

        if (t2 < 1) {
          requestAnimationFrame(down);
          return;
        }

        inner.style.transform = "translateY(0%)";
        inner._animating = false;
      });
    };

    requestAnimationFrame(up);
  }, delay);

  inner._animTimeout = timeoutId;
}

export function createWaveText(
  container: HTMLElement,
  lines: string[]
): WaveTextController {
  const fullText = lines.join(" ");
  container.setAttribute("aria-label", fullText);

  const chars: AnimatedInner[] = [];
  container.innerHTML = "";

  lines.forEach((line) => {
    const lineEl = document.createElement("span");
    lineEl.className = "wave-line";
    lineEl.setAttribute("aria-hidden", "true");

    for (const ch of line) {
      const wrap = document.createElement("span");
      wrap.className = "char-wrap";

      const inner = document.createElement("span") as AnimatedInner;
      inner.className = "char-inner";
      inner.textContent = ch === " " ? "\u00A0" : ch;

      wrap.appendChild(inner);
      lineEl.appendChild(wrap);

      if (ch !== " ") {
        chars.push(inner);
      }
    }

    container.appendChild(lineEl);
  });

  let batchTimer: number | null = null;
  let running = false;

  const scheduleNext = () => {
    if (!running) return;

    const gap = 1200 + Math.random() * 570;
    batchTimer = window.setTimeout(() => {
      if (!running) return;

      const available = chars.filter((c) => !c._animating);
      if (available.length > 0) {
        const minCount = Math.min(2, available.length);
        const maxCount = Math.min(5, available.length);
        const count = minCount + Math.floor(Math.random() * (maxCount - minCount + 1));

        const shuffled = [...available].sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, count);

        picked.forEach((inner, idx) => {
          animChar(inner, idx * 105);
        });
      }

      scheduleNext();
    }, gap);
  };

  const play = () => {
    if (running) return;
    running = true;
    scheduleNext();
  };

  const destroy = () => {
    running = false;

    if (batchTimer !== null) {
      window.clearTimeout(batchTimer);
      batchTimer = null;
    }

    for (const c of chars) {
      if (c._animTimeout !== undefined) {
        window.clearTimeout(c._animTimeout);
      }
      c._animating = false;
      c.style.transform = "translateY(0%)";
    }

    container.textContent = fullText;
  };

  return { play, destroy };
}
