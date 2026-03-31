import "./main-layout.css";
import gsap from "gsap";
import { dom, state } from "../../globals.js";

let mainLayoutTl;

function mainReveal() {
  gsap.set(dom.main, { autoAlpha: 1 });
}

function createMainLayoutTimeline() {
  const tl = gsap.timeline({ paused: true });

  tl.to(dom.body, {
    backgroundColor: "var(--fg)",
    overflow: "hidden",
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
        filter: "blur(8px)",
        duration: 0.4,
        ease: "power1.inOut",
      },
      "<",
    );

  return tl;
}

export function updateMainLayout() {
  if (state.isOverviewOpen) {
    mainLayoutTl.play();
  } else {
    mainLayoutTl.reverse();
  }
}

export function initMainLayout() {
  mainReveal();
  mainLayoutTl = createMainLayoutTimeline();
}
