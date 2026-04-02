import "./main-layout.css";
import gsap from "gsap";
import { dom } from "../../globals.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export let smoother;

function mainReveal() {
  gsap.set(dom.main, { autoAlpha: 1 });
}

function getResponsiveRadius() {
  const vh = window.innerHeight * 0.025;
  const vw = window.innerWidth * 0.025;
  const clampedValue = Math.max(vh, Math.min(vw, window.innerWidth * 0.99));
  return clampedValue;
}

function initElasticScroll() {
  const allSections = gsap.utils.toArray("section");

  let scrollTimeout;
  let isScaledDown = false;

  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  ScrollTrigger.create({
    onUpdate: (self) => {
      const velocity = Math.abs(self.getVelocity());
      const threshold = isTouch ? 300 : 150;
      const isNearEnd = self.progress > 0.98;

      if (velocity > threshold && !isNearEnd) {
        if (!isScaledDown) {
          isScaledDown = true;
          gsap.to(allSections, {
            scale: isTouch ? 0.93 : 0.9,
            borderRadius: `${getResponsiveRadius()}px`,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        }

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
          isScaledDown = false;
          gsap.to(allSections, {
            scale: 1,
            borderRadius: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
        }, 300);
      }
    },
  });
}

function createSmoother() {
  smoother = ScrollSmoother.create({
    wrapper: dom.main,
    content: dom.sectionContainer,
    smooth: 1.5,
    smoothTouch: true,
    effects: true,
  });
}

export function initMainLayout() {
  createSmoother();
  initElasticScroll();
  mainReveal();
}
