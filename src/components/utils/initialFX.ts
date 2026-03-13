import { SplitText } from "gsap-trial/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");

  const masterTL = gsap.timeline({ delay: 0.3 });

  // MacBook slides up
  masterTL.fromTo(
    ".macbook",
    { opacity: 0, y: 80 },
    { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" },
    0
  );

  // Screen nav
  masterTL.fromTo(
    ".screen-nav",
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    0.5
  );

  // "Hello" text animation
  const helloSplit = new SplitText(".screen-hello", {
    type: "words,lines",
    linesClass: "split-line",
  });
  masterTL.fromTo(
    helloSplit.words,
    { opacity: 0, y: 60, filter: "blur(4px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
      stagger: 0.04,
    },
    0.7
  );

  // Stats
  masterTL.fromTo(
    ".screen-stat",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 },
    0.6
  );

  // Subtitle
  masterTL.fromTo(
    ".screen-subtitle",
    { opacity: 0, x: -15 },
    { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
    1.0
  );

  // Photo
  masterTL.fromTo(
    ".screen-photo",
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
    0.8
  );

  // Vertical text
  masterTL.fromTo(
    ".screen-vertical-text",
    { opacity: 0 },
    { opacity: 1, duration: 0.6, ease: "power1.out" },
    0.9
  );

  // Bottom bar
  masterTL.fromTo(
    ".screen-bottom",
    { opacity: 0 },
    { opacity: 1, duration: 0.6, ease: "power1.out" },
    1.1
  );

  // Navbar & social icons
  gsap.fromTo(
    [".dynamic-island", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}
