import "./main-layout.css";
import gsap from "gsap";
import { dom, state } from "../../globals.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export let smoother;
export let overviewTl;
const OVERVIEW_LAYOUT_CLEAR_PROPS =
  "position,top,left,width,height,x,y,xPercent,yPercent,transformOrigin,scale,borderRadius,zIndex";
let suppressElasticDuringFocus = false;

function setOverviewHitTesting(isOverviewActive) {
  const pinSpacers = document.querySelectorAll(".pin-spacer");

  gsap.set(pinSpacers, {
    pointerEvents: isOverviewActive ? "none" : "",
  });

  gsap.set(dom.allSections, {
    pointerEvents: "auto",
  });
}

function mainReveal() {
  gsap.set(dom.main, { autoAlpha: 1 });
}

function getResponsiveRadius() {
  const vh = window.innerHeight * 0.025;
  const vw = window.innerWidth * 0.025;
  const clampedValue = Math.max(vh, Math.min(vw, window.innerWidth * 0.99));
  return clampedValue;
}

export function createToggleOverviewTimeline() {
  const st = smoother.scrollTop();

  const sectionsArray = Array.from(dom.allSections);
  const currentRadii = sectionsArray.map(
    (section) => getComputedStyle(section).borderRadius,
  );

  const activeTrigger = ScrollTrigger.getAll().find(
    (t) => t.isActive && t.vars.trigger !== dom.intro.parentElement,
  );

  const allTriggers = ScrollTrigger.getAll().filter((t) => t.vars.pin);
  const currentIndex = activeTrigger ? allTriggers.indexOf(activeTrigger) : 0;

  const rects = sectionsArray.map((sec) => sec.getBoundingClientRect());

  const getGridPos = (index) => {
    const i = index || 0;
    const isLeft = i % 2 === 0;
    const isTopRow = Math.floor(i / 2) === 0;

    return {
      x: isLeft ? "28vw" : "72vw",
      y: (isTopRow ? window.innerHeight * 0.3 : window.innerHeight * 0.74) + st,
    };
  };

  if (overviewTl) overviewTl.kill();

  gsap.killTweensOf(sectionsArray);

  gsap.set(sectionsArray, { clearProps: OVERVIEW_LAYOUT_CLEAR_PROPS });

  overviewTl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.inOut", duration: 0.6 },
    onStart: () => {
      setOverviewHitTesting(true);
      smoother.paused(true);
    },
    onReverseComplete: () => {
      setOverviewHitTesting(false);
      smoother.paused(false);
      ScrollTrigger.refresh();
    },
  });

  overviewTl.set(sectionsArray, {
    position: "fixed",
    top: 0,
    left: 0,
    width: (i) => rects[i].width,
    height: (i) => rects[i].height,
    borderRadius: (i) => currentRadii[i],
    x: (i) => rects[i].left,
    y: (i) => rects[i].top + st,
    xPercent: 0,
    yPercent: 0,
    transformOrigin: "center center",
  });

  overviewTl.to(sectionsArray, {
    scale: 0.4,
    borderRadius: `${getResponsiveRadius()}px`,
    x: (i) => getGridPos(i).x,
    y: (i) => getGridPos(i).y,
    xPercent: -50,
    yPercent: -50,
    stagger: {
      each: 0.05,
      from: currentIndex,
    },
  });

  return overviewTl;
}

export const toggleOverview = () => {
  if (state.isOverviewOpen) {
    overviewTl = createToggleOverviewTimeline();
    overviewTl.play(0);
  } else {
    if (overviewTl) overviewTl.reverse();
  }
};

export function focusOverviewSection(section) {
  if (!section || !overviewTl) return;

  const sectionsArray = Array.from(dom.allSections);
  const st = smoother.scrollTop();
  const targetId = section.id || null;
  const target = targetId ? `#${targetId}` : null;
  const reverseDuration = Math.max(
    0.2,
    overviewTl.duration() * overviewTl.progress(),
  );

  suppressElasticDuringFocus = true;
  if (elasticTimer) {
    clearTimeout(elasticTimer);
    elasticTimer = null;
  }

  smoother.paused(true);
  setOverviewHitTesting(true);

  overviewTl.eventCallback("onReverseComplete", null);
  overviewTl.reverse();

  gsap.to(section, {
    autoAlpha: 1,
    x: 0,
    y: st,
    xPercent: 0,
    yPercent: 0,
    scale: 1,
    borderRadius: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    zIndex: 3,
    duration: reverseDuration,
    ease: "power2.inOut",
    overwrite: true,
    onComplete: () => {
      gsap.killTweensOf(smoother);

      gsap.set(sectionsArray, { clearProps: OVERVIEW_LAYOUT_CLEAR_PROPS });

      if (targetId === "intro") {
        smoother.scrollTop(0);
      } else if (target) {
        smoother.scrollTo(target, false, "top top");
      }

      setOverviewHitTesting(false);
      smoother.paused(false);
      ScrollTrigger.refresh();
      ScrollTrigger.update();

      gsap.delayedCall(0, () => {
        ScrollTrigger.update();
      });

      gsap.delayedCall(0.35, () => {
        suppressElasticDuringFocus = false;
      });
    },
  });
}

export const toggleElasticEffect = (shouldScale) => {
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const targetScale = isTouch ? 0.93 : 0.9;

  gsap.to(dom.allSections, {
    scale: shouldScale ? targetScale : 1,
    borderRadius: shouldScale ? getResponsiveRadius() : 0,
    duration: 1,
    ease: "expo.out",
    overwrite: true,
  });
};

let elasticTimer = null;

function initElasticScroll() {
  dom.allSections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        // 1. Safety Checks
        if (window.scrollY === 0 && self.isActive) return;
        if (state.isOverviewOpen) return;
        if (suppressElasticDuringFocus) return;

        // 2. Only trigger when a section BECOMES active
        if (self.isActive) {
          // Clear any existing timer to "reset" the duration if the user scrolls fast
          if (elasticTimer) clearTimeout(elasticTimer);

          // Start the effect
          toggleElasticEffect(true);

          // 3. Stop the effect after a specific delay (e.g., 1000ms)
          elasticTimer = setTimeout(() => {
            toggleElasticEffect(false);
            elasticTimer = null;
          }, 1000);
        }
      },
    });
  });
}

function createSmoother() {
  smoother = ScrollSmoother.create({
    wrapper: dom.main,
    content: dom.sectionContainer,
    smooth: 2,
    smoothTouch: true,
    effects: true,
  });
}

export function initMainLayout() {
  createSmoother();
  initElasticScroll();
  mainReveal();
}
