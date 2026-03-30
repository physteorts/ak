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
  gsap.from(dom.header, {
    scaleX: 0,
    duration: 1,
    ease: "power1.inOut",
    clearProps: "all",
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
    onComplete: () => {
      if (!state.isOverviewOpen) {
        gsap.set(dom.header, { clearProps: "all" });
      }
    },
  });
}

export function initHeader() {
  headerReveal();
  headerToggle();
}
