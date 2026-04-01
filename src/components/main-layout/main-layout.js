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

function createSmoother() {
  smoother = ScrollSmoother.create({
    wrapper: dom.main,
    content: dom.sectionContainer,
    smooth: 1.2,
    effects: true,
  });
}

export function initMainLayout() {
  createSmoother();
  mainReveal();
}
