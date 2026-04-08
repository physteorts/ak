import "./header.css";
import { dom, state } from "../../globals.js";
import gsap from "gsap";
import { focusOverviewSection } from "../main-layout/main-layout.js";

let menuToggleTl;
let overviewOverlayTl;

function logoToggle() {
  dom.logo.addEventListener("click", (e) => {
    e.preventDefault();

    if (state.isOverviewOpen) toggleOverview();

    focusOverviewSection(dom.intro);
  });
}

function menuToggle() {
  dom.menuToggle.addEventListener("click", toggleOverview);
}

function menuLinkToggle() {
  dom.overviewLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      toggleOverview();

      focusOverviewSection(targetSection);
    });
  });
}

function createOverviewOverlayTimeline() {
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power1.inOut", duration: 0.4 },
  });

  tl.to(dom.overviewOverlay, {
    autoAlpha: 1,
  });

  tl.fromTo(
    dom.overviewLinks,
    { x: -20, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, stagger: 0.1 },
    "-=0.3",
  );

  return tl;
}

function headerReveal() {
  gsap.set(dom.header, {
    autoAlpha: 1,
  });

  const tl = gsap.timeline();

  tl.to([dom.logo, dom.menuToggle], {
    autoAlpha: 1,
    duration: 1,
    ease: "power2.inOut",
  });
}

function createMenuToggleTimeline() {
  const tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.4,
      ease: "power2.inOut",
    },
  });

  tl.set(dom.menuCloseLabel, { y: 15 });

  tl.to(
    dom.menuOpenLabel,
    {
      autoAlpha: 0,
      y: -15,
    },
    0,
  ).to(
    dom.menuCloseLabel,
    {
      autoAlpha: 1,
      y: 0,
    },
    "<",
  );

  return tl;
}

function toggleOverviewOverlay() {
  if (state.isOverviewOpen) {
    overviewOverlayTl.play();
  } else {
    overviewOverlayTl.reverse();
  }
}

function toggleOverview() {
  state.isOverviewOpen = !state.isOverviewOpen;
  updateMenuToggle();
  toggleOverviewOverlay();
}

function updateMenuToggle() {
  if (state.isOverviewOpen) {
    menuToggleTl.play();
  } else {
    menuToggleTl.reverse();
  }
}

function setOverviewOverlayTop() {
  const headerHeight = dom.header ? dom.header.offsetHeight : 0;
  gsap.set(dom.overviewOverlay, {
    "--header-h": `${headerHeight}px`,
  });
}

export function initHeader() {
  headerReveal();
  menuToggle();
  menuToggleTl = createMenuToggleTimeline();
  logoToggle();
  menuLinkToggle();
  overviewOverlayTl = createOverviewOverlayTimeline();
  setOverviewOverlayTop();
}
