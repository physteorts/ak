import "./menu.css";
import { dom, state } from "../../globals";
import {
  toggleOverview,
  focusOverviewSection,
} from "../main-layout/main-layout.js";
import { updateMenuToggle } from "../header/header";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let overviewOverlayTl;

function handleSelection(targetSection) {
  if (!state.isOverviewOpen) return;

  focusOverviewSection(targetSection);
  state.isOverviewOpen = false;
  updateMenuToggle();
  toggleOverviewOverlay();
}

function sectionOverviewToggle() {
  dom.allSections.forEach((section) => {
    section.addEventListener("click", () => {
      handleSelection(section);
    });
  });
}

function menuLinkToggle() {
  dom.menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        handleSelection(targetSection);
      }
    });
  });
}

function createOverviewOverlayTimeline() {
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power1.inOut", duration: 0.2 },
  });

  tl.to(dom.menuOverlay, {
    autoAlpha: 1,
  });

  tl.fromTo(
    dom.menuLinks,
    { x: -20, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, stagger: 0.1 },
    "-=0.3",
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

export function toggleMenu() {
  state.isOverviewOpen = !state.isOverviewOpen;
  updateMenuToggle();
  toggleOverview();
  toggleOverviewOverlay();
}

export function initMenu() {
  sectionOverviewToggle();
  menuLinkToggle();
  overviewOverlayTl = createOverviewOverlayTimeline();
}
