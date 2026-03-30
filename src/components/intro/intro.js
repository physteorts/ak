import "./intro.css";
import { dom } from "../../globals";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function introTimeline() {
  gsap.set(dom.intro, { autoAlpha: 1 });

  gsap.from(dom.iBackground, {
    scale: 0,
    duration: 1.5,
    ease: "power3.out",
    clearProps: "all",
  });
}

export function initIntro() {
  introTimeline();

  gsap.set(".reveal-wrapper", { x: "10dvw", autoAlpha: 0 });
  gsap.set([".one", ".two", ".three"], {
    width: 0,
  });

  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#intro",
      start: "top top",
      end: "+=500%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  scrollTl
    .to(".text-wrapper", {
      opacity: 0,
      x: "-10dvw",
      duration: 1,
      ease: "power2.inOut",
    })
    .to(
      ".one",
      {
        width: "99%",
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
      x: "-10dvw",
      duration: 1,
    })
    .to(
      ".two",
      {
        width: "98%",
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
      x: "-10dvw",
      duration: 1,
    })
    .to(
      ".three",
      {
        width: "97%",
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
