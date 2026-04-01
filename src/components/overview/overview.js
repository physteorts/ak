import "./overview.css";
import { dom, state } from "../../globals";
import { updateHeaderBackground } from "../header/header";
import { updateMainLayout, smoother } from "../main-layout/main-layout";
import gsap from "gsap";

let overviewOverlayTl;

function overviewLinkToggle() {
  dom.overviewLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = link.getAttribute("href");

      toggleOverview();

      smoother.scrollTo(target, true, "top top");
    });
  });
}

function createOverviewOverlayTimeline() {
  const tl = gsap.timeline({ paused: true });

  tl.to(dom.overviewOverlay, {
    autoAlpha: 1,
  });

  return tl;
}

function updateOverviewOverlay() {
  if (state.isOverviewOpen) {
    overviewOverlayTl.play();
  } else {
    overviewOverlayTl.reverse();
  }
}

export function toggleOverview() {
  state.isOverviewOpen = !state.isOverviewOpen;
  updateHeaderBackground();
  updateMainLayout();
  updateOverviewOverlay();
}

export function initOverview() {
  overviewLinkToggle();
  overviewOverlayTl = createOverviewOverlayTimeline();
}
