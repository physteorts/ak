import "./main-layout.css";
import gsap from "gsap";
import { dom } from "../../globals.js";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

function mainReveal() {
  gsap.set(dom.main, { autoAlpha: 1 });
}

function scrollSmoother() {
  ScrollSmoother.create({
    wrapper: dom.main,
    content: dom.sectionContainer,
    smooth: 1.2,
    smoothTouch: 0.1,
    normalizeScroll: true,
    effects: true,
  });
}

export function initMainLayout() {
  mainReveal();
  scrollSmoother();
}
