import "./main-layout.css";
import gsap from "gsap";
import { dom, state } from "../../globals.js";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

let smoother;
let updateMainLayoutTl;

function mainReveal() {
  gsap.set(dom.main, { autoAlpha: 1 });
}

function scrollSmoother() {
  smoother = ScrollSmoother.create({
    wrapper: dom.main,
    content: dom.sectionContainer,
    smooth: 1.2,
    smoothTouch: 0.1,
    normalizeScroll: true,
    effects: true,
  });

  smoother.scrollTop(0);
}

function updateMainLayoutTimeline() {
  const tl = gsap.timeline({ paused: true });

  tl.to(dom.main, {
    y: "30dvh",
    scaleX: "0.95",
    borderTopLeftRadius: "clamp(4dvh,4dvw,99dvw)",
    borderTopRightRadius: "clamp(4dvh,4dvw,99dvw)",
    duration: 0.8,
    ease: "power3.inOut",
  });

  return tl;
}

export function updateMainLayout() {
  if (state.isOverviewOpen) {
    smoother.paused(true);
    updateMainLayoutTl.play();
  } else {
    smoother.paused(false);
    updateMainLayoutTl.reverse();
  }
}

export function initMainLayout() {
  mainReveal();
  scrollSmoother();
  updateMainLayoutTl = updateMainLayoutTimeline();
}
