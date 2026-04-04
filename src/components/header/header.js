import "./header.css";
import { dom, state } from "../../globals.js";
import gsap from "gsap";
import { toggleMenu } from "../menu/menu.js";

let menuToggleTl;

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
    .to(
      dom.header,
      {
        scale: 1,
        duration: 1,
        ease: "power2.inOut",
      },
      "-=0.5",
    )
    .to(dom.menuToggle, {
      autoAlpha: 1,
    });
}

function createMenuToggleTimeline() {
  const tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.5,
      ease: "power1.inOut",
    },
  });

  tl.set(dom.menuCloseLabel, {
    y: 15,
  });

  tl.to(dom.menuOpenLabel, {
    autoAlpha: 0,
    y: -15,
  }).to(
    dom.menuCloseLabel,
    {
      autoAlpha: 1,
      y: 0,
    },
    "-=0.5",
  );

  return tl;
}

export function updateMenuToggle() {
  if (state.isOverviewOpen) {
    menuToggleTl.play();
  } else {
    menuToggleTl.reverse();
  }
}

export function initHeader() {
  headerReveal();
  menuToggle();
  menuToggleTl = createMenuToggleTimeline();
}
