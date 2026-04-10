import "./intro.css";
import { dom } from "../../globals";
import gsap from "gsap";

export function initIntro() {
  gsap.to(dom.intro, { autoAlpha: 1, duration: 1, ease: "power2.inOut" });
}
