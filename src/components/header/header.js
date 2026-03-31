import "./header.css";
import { dom, state } from "../../globals.js";
import gsap from "gsap";
import { toggleOverview } from "../overview/overview.js";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

function headerToggle() {
  dom.header.addEventListener("click", toggleOverview);
}

function headerReveal() {
  gsap.to(dom.header, {
    autoAlpha: 1,
    scaleX: 1,
    duration: 1,
    ease: "power1.inOut",
  });
}

export function updateHeader() {
  const initialState = Flip.getState(dom.header);

  if (state.isOverviewOpen) {
    dom.header.classList.add("overview");
  } else {
    dom.header.classList.remove("overview");
  }

  Flip.from(initialState, {
    duration: 1,
    ease: "expo.inOut",
  });
}

export function initHeader() {
  headerReveal();
  headerToggle();
}
