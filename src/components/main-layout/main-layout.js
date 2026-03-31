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
    duration: 0,
  }).to(dom.main, {
    scale: 0.95,
    borderTopLeftRadius: "clamp(4dvh,4dvw,99dvw)",
    borderTopRightRadius: "clamp(4dvh,4dvw,99dvw)",
    duration: 0.5,
    ease: "power1.inOut",
  });

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
