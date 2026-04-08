import "./intro.css";
import { dom } from "../../globals";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initIntro() {
  gsap.set(dom.intro, { autoAlpha: 1 });

  gsap.to(".text-wrapper", {
    autoAlpha: 1,
    duration: 1,
    ease: "power2.inOut",
  });

  gsap.set(".reveal-wrapper", {
    yPercent: 100,
    scale: 0.4,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: dom.intro,
      start: "top top",
      end: "+=200%",
      scrub: true,
      pin: true,
      anticipatePin: 1,
      ignoreMobileResize: true,
    },
  });

  tl.to(".text-wrapper", {
    scale: 0.8,
    yPercent: -50,
    ease: "power2.inOut",
  }).to(
    ".reveal-wrapper",
    {
      yPercent: 50,
      scale: 0.8,
      autoAlpha: 1,
      ease: "power2.inOut",
    },
    "<0.1",
  );
}
