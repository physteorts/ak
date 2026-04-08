import "./resume.css";
import { dom } from "../../globals";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initResume() {
  gsap.timeline({
    scrollTrigger: {
      trigger: dom.resume,
      start: "top top",
      end: "+=120%",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
  });
}
