import "./header.css";
import { dom, state } from "../../globals.js";
import gsap from "gsap";
import { toggleOverview } from "../overview/overview.js";

let headerTl;

function headerToggle() {
  dom.header.addEventListener("click", toggleOverview);
}

function headerReveal() {
  gsap.set(dom.header, {
    left: "50%",
    xPercent: -50,
    yPercent: -100,
    autoAlpha: 0,
  });

  gsap.to(dom.header, {
    autoAlpha: 1,
    yPercent: 0,
    duration: 0.5,
    ease: "power1.inOut",
  });
}

function createHeaderTimeline() {
  const tl = gsap.timeline({ paused: true });

  tl.to(dom.header, {
    width: "98dvw",
    height: "98dvh",
    duration: 1.2,
    ease: "expo.inOut",
  });

  return tl;
}

export function updateHeader() {
  if (state.isOverviewOpen) {
    headerTl.play();
  } else {
    headerTl.reverse();
  }
}

export function initHeader() {
  headerReveal();
  headerToggle();
  headerTl = createHeaderTimeline();
}
