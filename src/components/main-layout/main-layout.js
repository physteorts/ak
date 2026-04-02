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

function initElasticScroll() {
  const allSections = gsap.utils.toArray("section");
  let isRunning = false;

  const peekEffect = gsap.timeline({
    paused: true,
    onComplete: () => {
      gsap.delayedCall(0.1, () => {
        isRunning = false;
      });
    },
  });

  peekEffect
    .to(allSections, {
      scale: 0.9,
      borderRadius: "var(--section-radius)",
      duration: 0.6,
      ease: "power1.inOut",
    })
    .to(
      allSections,
      {
        scale: 1,
        borderRadius: "var(--section-full-radius)",
        duration: 0.6,
        ease: "power1.inOut",
      },
      "+=0.5",
    );

  ScrollTrigger.create({
    onUpdate: (self) => {
      const velocity = Math.abs(self.getVelocity());
      const isMovingFast = velocity > 200;

      if (!isRunning && isMovingFast) {
        isRunning = true;
        peekEffect.restart();
      }
    },
  });
}

function createSmoother() {
  smoother = ScrollSmoother.create({
    wrapper: dom.main,
    content: dom.sectionContainer,
    smooth: 2,
    effects: true,
  });
}

export function initMainLayout() {
  createSmoother();
  initElasticScroll();
  mainReveal();
}
