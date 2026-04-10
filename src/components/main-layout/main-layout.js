import "./main-layout.css";
import gsap from "gsap";
import { dom } from "../../globals.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother;

function mainReveal() {
  gsap.set(dom.main, { autoAlpha: 1 });
  gsap.set(dom.body, { backgroundColor: "var(--fg)" });
}

export function focusSection(section) {
  if (!section || !smoother) return;

  ScrollTrigger.refresh();
  const targetTop = section === dom.intro ? 0 : smoother.offset(section, "top top");

  smoother.scrollTo(targetTop, true);
}

function createSmoother() {
  smoother = ScrollSmoother.create({
    wrapper: dom.main,
    content: dom.sectionContainer,
    smooth: 2,
  });
}

export function initMainLayout() {
  createSmoother();
  mainReveal();
}
