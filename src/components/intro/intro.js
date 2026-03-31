import "./intro.css";
import { dom } from "../../globals";
import gsap from "gsap";

function introTimeline() {
  gsap.set(dom.intro, { autoAlpha: 1 });

  gsap.from(".large-text", {
    autoAlpha: 0,
    duration: 1,
    ease: "power1.inOut",
  });
}

export function initIntro() {
  introTimeline();
}
