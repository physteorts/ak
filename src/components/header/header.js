import "./header.css";
import { dom, state } from "../../globals.js";
import gsap from "gsap";
import { toggleOverview } from "../overview/overview.js";

let updateHeaderBackgroundTl;

function headerToggle() {
  dom.header.addEventListener("click", toggleOverview);
}

function updateHeaderBackgroundTimeline() {
  const tl = gsap.timeline({ paused: true });

  tl.to(dom.header, {
    backgroundColor: "var(--bg)",
    duration: 0.8,
    ease: "power3.inOut",
  });

  return tl;
}

function headerReveal() {
  gsap.from(dom.header, {
    scaleX: 0,
    duration: 1,
    ease: "power1.inOut",
    clearProps: "all",
  });
}

export function updateHeaderBackground() {
  if (state.isOverviewOpen) {
    updateHeaderBackgroundTl.play();
  } else {
    updateHeaderBackgroundTl.reverse();
  }
}

export function initHeader() {
  headerReveal();
  headerToggle();
  updateHeaderBackgroundTl = updateHeaderBackgroundTimeline();
}
