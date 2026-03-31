import "./header.css";
import { dom, state } from "../../globals.js";
import gsap from "gsap";
import { toggleOverview } from "../overview/overview.js";

let headerBackgroundTl;

function headerToggle() {
  dom.header.addEventListener("click", toggleOverview);
}

function headerReveal() {
  gsap.to(dom.header, {
    y: 0,
    duration: 0.5,
    ease: "power1.inOut",
  });
}

function createHeaderBackgroundTimeline() {
  const tl = gsap.timeline({ paused: true });

  tl.to(dom.header, {
    backgroundColor: "var(--bg)",
    duration: 0.4,
    ease: "power2.inOut",
  });

  return tl;
}

export function updateHeaderBackground() {
  if (state.isOverviewOpen) {
    headerBackgroundTl.play();
  } else {
    headerBackgroundTl.reverse();
  }
}

export function initHeader() {
  headerReveal();
  headerToggle();
  headerBackgroundTl = createHeaderBackgroundTimeline();
}
