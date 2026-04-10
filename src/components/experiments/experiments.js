import "./experiments.css";
import { dom } from "../../globals";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initExperiments() {
  gsap.timeline({
    scrollTrigger: {
      trigger: dom.experiments,
      start: "top top",
      end: "+=100%",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
  });
}
