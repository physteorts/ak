import "./main-layout.css";
import gsap from "gsap";
import { dom, state } from "../../globals.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let mainLayoutTl;
export let smoother;

function mainReveal() {
  gsap.set(dom.main, { autoAlpha: 1 });
}

function createSmoother() {
  smoother = ScrollSmoother.create({
    wrapper: dom.main,
    content: dom.sectionContainer,
    smooth: 1.2,
    effects: true,
  });
}

function createMainLayoutTimeline() {
  const tl = gsap.timeline({ paused: true });

  tl.to(dom.body, {
    backgroundColor: "var(--fg)",
    duration: 0,
  })
    .to(dom.main, {
      y: "5vh",
      scale: 0.95,
      borderTopLeftRadius: "clamp(4vh,4vw,99vw)",
      borderTopRightRadius: "clamp(4vh,4vw,99vw)",
      duration: 0.4,
      ease: "power1.inOut",
    })
    .to(
      dom.sectionContainer,
      {
        opacity: 0.4,
        filter: "blur(16px)",
        duration: 0.4,
        ease: "power1.inOut",
      },
      "<",
    );

  return tl;
}

export function updateMainLayout() {
  if (state.isOverviewOpen) {
    smoother.paused(true);
    mainLayoutTl.play();
  } else {
    smoother.paused(false);
    mainLayoutTl.reverse();
  }
}

export function initMainLayout() {
  createSmoother();
  mainReveal();
  mainLayoutTl = createMainLayoutTimeline();
}
