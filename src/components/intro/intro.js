import "./intro.css";
import { dom } from "../../globals";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function introTimeline() {
  gsap.set(dom.intro, { autoAlpha: 1 });

  const tl = gsap.timeline();

  tl.from(dom.iBackground, {
    y: "100dvh",
    duration: 2,
    ease: "power3.out",
    clearProps: "all",
  }).from(".text-wrapper", {
    autoAlpha: 0,
    duration: 1,
    ease: "power1.inOut",
  });
}

export function initIntro() {
  introTimeline();

  gsap.set(".reveal-wrapper", { x: "5dvw", autoAlpha: 0 });
  gsap.set([".one", ".two", ".three"], {
    width: 0,
  });

  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#intro",
      start: "top top",
      end: "+=400%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  scrollTl
    .to(".text-wrapper", {
      opacity: 0,
      x: "-5dvw",
      duration: 1,
      ease: "power2.inOut",
    })
    .to(
      ".one",
      {
        width: "100%",
      },
      "-=0.5",
    )
    .to(
      ".first-reveal",
      {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5",
    )
    .to(".first-reveal", {
      opacity: 0,
      x: "-5dvw",
      duration: 1,
    })
    .to(
      ".two",
      {
        width: "100%",
      },
      "-=0.5",
    )
    .to(
      ".second-reveal",
      {
        autoAlpha: 1,
        x: 0,
        duration: 1,
      },
      "-=0.5",
    )
    .to(".second-reveal", {
      opacity: 0,
      x: "-5dvw",
      duration: 1,
    })
    .to(
      ".three",
      {
        width: "100%",
      },
      "-=0.5",
    )
    .to(
      ".third-reveal",
      {
        autoAlpha: 1,
        x: 0,
        duration: 1,
      },
      "-=0.5",
    );
}
