import "./main-layout.css";
import gsap from "gsap";
import { dom, state } from "../../globals.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export let smoother;
let mainLayoutTl;

function mainReveal() {
  gsap.set(dom.main, { autoAlpha: 1 });
  gsap.set(dom.body, { backgroundColor: "var(--fg)" });
}

function createMainLayoutTimeline() {
  const headerHeight = dom.header
    ? dom.header.getBoundingClientRect().height
    : 0;
  gsap.set(dom.main, {
    "--header-h": headerHeight + "px",
  });

  mainLayoutTl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.inOut", duration: 0.6 },
    onStart: () => {
      smoother.paused(true);
    },
    onReverseComplete: () => {
      smoother.paused(false);
    },
  });

  mainLayoutTl
    .to(dom.main, {
      "--scale": 0.95,
      "--progress": 1,
      borderTopLeftRadius: "calc(2rem + clamp(2dvh, 2dvw, 99dvw))",
      borderTopRightRadius: "calc(2rem + clamp(2dvh, 2dvw, 99dvw))",
    })
    .to(
      dom.allSections,
      {
        autoAlpha: 0,
        display: "none",
        duration: 0.4,
      },
      "<",
    );

  return mainLayoutTl;
}

export const updateMainLayout = () => {
  if (state.isOverviewOpen) {
    mainLayoutTl.play();
  } else {
    mainLayoutTl.reverse();
  }
};

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
  smoother = ScrollSmoother.create({
    wrapper: dom.main,
    content: dom.sectionContainer,
    smooth: 2,
    normalizeScroll: true,
    effects: true,
  });
}

export function initMainLayout() {
  createSmoother();
  mainReveal();
  mainLayoutTl = createMainLayoutTimeline();
}
