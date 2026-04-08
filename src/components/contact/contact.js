import "./contact.css";
import { dom } from "../../globals";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initContact() {
  gsap.timeline({
    scrollTrigger: {
      trigger: dom.contact,
      start: "top top",
      end: "+=200%",
      scrub: true,
      pin: true,
      anticipatePin: 1,
      pinType: "fixed",
    },
  });
}
