import "./menu.css";
import { dom, state } from "../../globals";
import {
  smoother,
  toggleOverview,
  focusOverviewSection,
} from "../main-layout/main-layout.js";
import { updateMenuToggle } from "../header/header";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let menuOverlayTl;

function sectionOverviewToggle() {
  dom.allSections.forEach((section) => {
    section.addEventListener("click", () => {
      if (!state.isOverviewOpen) return;

      focusOverviewSection(section);
      state.isOverviewOpen = false;
      updateMenuToggle();
    });
  });
}

function createMenuOverlayTimeline() {
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power1.inOut", duration: 0.4 },
  });

  tl.to(dom.menuOverlay, {
    autoAlpha: 1,
  })
    .fromTo(
      dom.menuContent,
      {
        y: 20,
      },
      {
        y: 0,
      },
      "<",
    )
    .to(
      dom.menuLinks,
      {
        autoAlpha: 1,
        stagger: 0.05,
      },
      "-=0.2",
    );

  return tl;
}

export function toggleMenu() {
  state.isOverviewOpen = !state.isOverviewOpen;
  updateMenuToggle();
  toggleOverview();
}

export function initMenu() {
  sectionOverviewToggle();
  menuOverlayTl = createMenuOverlayTimeline();
}
