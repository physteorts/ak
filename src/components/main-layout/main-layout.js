import "./main-layout.css";
import gsap from "gsap";
import { dom, state } from "../../globals.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export let smoother;
let mainLayoutTl;

function getSectionTopPosition(section) {
  const sectionTrigger = ScrollTrigger.getAll().find(
    (trigger) => trigger.vars?.trigger === section && trigger.vars?.pin,
  );

  if (sectionTrigger) {
    return sectionTrigger.start;
  }

  return section.offsetTop;
}

function mainReveal() {
  gsap.set(dom.main, { autoAlpha: 1 });
  gsap.set(dom.body, { backgroundColor: "var(--fg)" });
}

function createMainLayoutTimeline() {
  const headerHeight = dom.header ? dom.header.offsetHeight : 0;
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
      "--progress": 1,
      "--scale": 0.95,
      "--header-h": `${headerHeight}px`,
    })
    .to(
      dom.sectionOverlay,
      {
        opacity: 0.7,
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

export function focusOverviewSection(section) {
  const targetId = section.id;

  ScrollTrigger.refresh();

  const targetTop = targetId === "intro" ? 0 : getSectionTopPosition(section);
  smoother.paused(false);

  gsap.killTweensOf(smoother);
  gsap.to(smoother, {
    scrollTop: targetTop,
    duration: 1,
    ease: "power2.inOut",
    overwrite: true,
    onUpdate: () => {
      ScrollTrigger.update();
    },
    onComplete: () => {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    },
  });
}

function createSmoother() {
  smoother = ScrollSmoother.create({
    wrapper: dom.main,
    content: dom.sectionContainer,
    smooth: 2,
    smoothTouch: true,
    normalizeScroll: true,
    effects: true,
  });
}

export function initMainLayout() {
  createSmoother();
  mainReveal();
  mainLayoutTl = createMainLayoutTimeline();
}
