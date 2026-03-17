import { lazy, Suspense, useEffect, useState } from "react";
import About from "./About";
import Contact from "./Contact";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import Projects from "./Projects";
import WaveCta from "./WaveCta";
import setSplitText from "./utils/splitText";
import { useLoading } from "../context/LoadingProvider";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = () => {
  const { setAppReady } = useLoading();
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    setAppReady(true);
  }, [setAppReady]);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []); // stable — no dep on isDesktopView to prevent Canvas unmount/remount on resize

  return (
    <div className="container-main">
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <Projects />
            <Suspense fallback={<div>Loading....</div>}>
              <TechStack />
            </Suspense>
            <WaveCta />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
