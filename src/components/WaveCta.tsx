import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/WaveCta.css";

const TOP_LINE = "Let's work";
const BOTTOM_LINE = "together!";
const COLUMNS = Math.max(TOP_LINE.length, BOTTOM_LINE.length);

type CharDirection = "up" | "down";

interface CharSlot {
  element: HTMLSpanElement;
  direction: CharDirection;
  isLetter: boolean;
}

gsap.registerPlugin(ScrollTrigger);

const WaveCta = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const charRefs = useRef<CharSlot[]>([]);
  const rafRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);

  const hideCharsImmediately = () => {
    charRefs.current.forEach(({ element, direction, isLetter }) => {
      element.style.transition = "none";
      element.style.transitionDelay = "0s";
      element.style.transform = direction === "up" ? "translateY(120%)" : "translateY(-120%)";
      element.style.opacity = isLetter ? "1" : "0";
    });
  };

  const shuffle = (input: number[]) => {
    const arr = [...input];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const playReveal = () => {
    hasPlayedRef.current = true;
    hideCharsImmediately();

    // Force style flush before enabling transitions.
    void titleRef.current?.offsetHeight;

    const byColumn = new Map<number, CharSlot[]>();
    charRefs.current.forEach((slot) => {
      const column = Number(slot.element.dataset.column || 0);
      const colSlots = byColumn.get(column) ?? [];
      colSlots.push(slot);
      byColumn.set(column, colSlots);
    });

    const activeColumns: number[] = [];
    byColumn.forEach((slots, column) => {
      if (slots.some((slot) => slot.isLetter)) {
        activeColumns.push(column);
      }
    });

    const randomOrder = shuffle(activeColumns);
    randomOrder.forEach((column, index) => {
      const slots = byColumn.get(column) ?? [];
      slots.forEach(({ element, isLetter }) => {
        element.style.transition = "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
        element.style.transitionDelay = `${index * 0.05}s`;
        element.style.transform = "translateY(0%)";
        element.style.opacity = isLetter ? "1" : "0";
      });
    });
  };

  const appendCharMask = (
    column: number,
    rawChar: string,
    direction: CharDirection,
    rowClass: string,
    parent: HTMLElement
  ) => {
    const mask = document.createElement("span");
    mask.className = `char-mask ${rowClass}`;

    const glyph = document.createElement("span");
    glyph.className = "char";
    glyph.dataset.column = String(column);

    const isLetter = rawChar !== " ";
    glyph.textContent = isLetter ? rawChar : "\u00A0";

    if (!isLetter) {
      mask.classList.add("char-mask-space");
      glyph.classList.add("char-space");
    }

    mask.appendChild(glyph);
    parent.appendChild(mask);
    charRefs.current.push({ element: glyph, direction, isLetter });
  };

  useEffect(() => {
    const heading = titleRef.current;
    if (!heading) return;

    heading.innerHTML = "";
    charRefs.current = [];

    const fragment = document.createDocumentFragment();
    const grid = document.createElement("span");
    grid.className = "reveal-grid";

    for (let i = 0; i < COLUMNS; i++) {
      const columnWrap = document.createElement("span");
      columnWrap.className = "reveal-column";

      appendCharMask(i, TOP_LINE[i] ?? " ", "up", "char-mask-top", columnWrap);
      appendCharMask(i, BOTTOM_LINE[i] ?? " ", "down", "char-mask-bottom", columnWrap);

      grid.appendChild(columnWrap);
    }

    fragment.appendChild(grid);

    heading.appendChild(fragment);
    hideCharsImmediately();

    return () => {
      heading.textContent = `${TOP_LINE} ${BOTTOM_LINE}`;
    };
  }, []);

  // Trigger and replay animation whenever section enters viewport.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      once: true,
      onEnter: () => {
        if (!hasPlayedRef.current) {
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(() => {
            playReveal();
          });
        }
      },
    });

    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="work-section" id="collaboration">
      <h1 ref={titleRef} className="reveal-text" aria-label={`${TOP_LINE} ${BOTTOM_LINE}`} />
    </section>
  );
};

export default WaveCta;
