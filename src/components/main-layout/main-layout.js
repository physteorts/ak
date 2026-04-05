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
  const vh = window.innerHeight * 0.01;
  const vw = window.innerWidth * 0.01;

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

  const isWideMode = window.innerWidth > window.innerHeight;
  const isPortraitMobile = !isWideMode && window.innerWidth < 1200;

  if (isPortraitMobile) {
    gsap.to(dom.menuOverlay, {
      width: "100vw",
      height: "auto",
      top: "8vh",
    });

    gsap.to(dom.menuContent, {
      width: "50%",
    });
  }

  const stackOffset = isPortraitMobile ? 5 * vh : 6 * vh;
  const baseScale = isPortraitMobile ? 0.7 : 0.5;
  const targetX = isPortraitMobile ? window.innerWidth / 2 : 67 * vw;
  const verticalMidpoint = isPortraitMobile
    ? window.innerHeight * 0.7
    : window.innerHeight / 2;

  const mobileCardHeight = window.innerWidth * 0.8;
  const actualHeight = isPortraitMobile
    ? mobileCardHeight * baseScale
    : rects[0].height * baseScale;

  const totalCards = sectionsArray.length;
  const stackHeight = (totalCards - 1) * stackOffset;
  const startPadding = verticalMidpoint - stackHeight / 2 - actualHeight / 2;

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
    transformOrigin: "center top",
    overflow: "hidden",
  });

  overviewTl.to(sectionsArray, {
    x: targetX,
    xPercent: -50,
    y: (i) => startPadding + i * stackOffset + st,
    yPercent: 0,
    height: (i) => (isPortraitMobile ? mobileCardHeight : rects[i].height),
    scale: (i) => baseScale + i * 0.02,
    borderRadius: `${getResponsiveRadius()}px`,
    zIndex: (i) => i,
    stagger: {
      amount: 0.3,
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
  // Filter out the active section so we can hide the rest
  const otherSections = sectionsArray.filter((s) => s !== section);

  const st = smoother.scrollTop();
  const targetId = section.id || null;
  const target = targetId ? `#${targetId}` : null;

  suppressElasticDuringFocus = true;
  if (elasticTimer) {
    clearTimeout(elasticTimer);
    elasticTimer = null;
  }

  smoother.paused(true);
  setOverviewHitTesting(true);

  // 1. Immediately hide other sections
  gsap.to(otherSections, {
    autoAlpha: 0,
    duration: 0.3,
    overwrite: true,
  });

  // 2. Animate the chosen section to full screen
  gsap.to(section, {
    autoAlpha: 1, // Ensure target stays visible
    x: 0,
    y: st,
    xPercent: 0,
    yPercent: 0,
    scale: 1,
    borderRadius: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    zIndex: 10, // Higher z-index to stay above the fading elements
    duration: 0.6,
    ease: "power2.inOut",
    overwrite: true,
    onComplete: () => {
      gsap.killTweensOf(smoother);

      // Reset all properties (this brings back autoAlpha for other sections)
      gsap.set(sectionsArray, { clearProps: OVERVIEW_LAYOUT_CLEAR_PROPS });
      gsap.to(otherSections, {
        autoAlpha: 1,
        duration: 0,
        overwrite: true,
      });

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

      gsap.delayedCall(0.4, () => {
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
    duration: 0.6,
    ease: "power2.inOut",
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
        if (window.scrollY === 0 && self.isActive) return;
        if (state.isOverviewOpen) return;
        if (suppressElasticDuringFocus) return;

        if (self.isActive) {
          if (elasticTimer) clearTimeout(elasticTimer);

          toggleElasticEffect(true);

          elasticTimer = setTimeout(() => {
            toggleElasticEffect(false);
            elasticTimer = null;
          }, 700);
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
    effects: true,
  });
}

export function initMainLayout() {
  createSmoother();
  initElasticScroll();
  mainReveal();
}
