import "./header.css";
import { dom } from "../../globals.js";
import gsap from "gsap";
import { toggleMenu } from "../menu/menu.js";

function menuToggle() {
  dom.menuToggle.addEventListener("click", toggleMenu);
}

function headerReveal() {
  gsap.set(dom.header, {
    scale: 0.2,
    left: "50%",
    xPercent: -50,
    yPercent: -100,
    autoAlpha: 0,
  });

  const tl = gsap.timeline();

  tl.to(dom.header, {
    yPercent: 0,
    autoAlpha: 1,
    duration: 1,
    ease: "power2.inOut",
  })
    .to(dom.header, {
      scale: 1,
      duration: 1,
      ease: "power2.inOut",
    }, "-=0.3")
    .to(dom.menuToggle, {
      autoAlpha: 1,
    });
}

export function initHeader() {
  headerReveal();
  menuToggle();
}
