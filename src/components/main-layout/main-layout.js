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
  ScrollTrigger.refresh();

  const st = ScrollTrigger.getAll().find((t) => t.trigger === section);

  let targetTop;

  if (st) {
    targetTop = st.start;
  } else {
    targetTop = smoother.offset(section, "top top");
  }

  smoother.scrollTo(targetTop, true);
}

function createSmoother() {
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  smoother = ScrollSmoother.create({
    wrapper: dom.main,
    content: dom.sectionContainer,
    smooth: 2,
    smoothTouch: 0,
    effects: true,
  });
}

export function initMainLayout() {
  createSmoother();
  mainReveal();
}
