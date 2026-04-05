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
      duration: 0.4,
      ease: "power2.inOut",
    },
  });

  tl.set(dom.menuCloseLabel, { y: 15 });

  tl.to(
    dom.header,
    {
      backgroundColor: "var(--bg)",
      duration: 0.8,
    },
    0,
  );

  tl.to(
    [dom.menuOpenLabel, dom.menuCloseLabel],
    {
      color: "var(--fg)",
      duration: 0.3,
    },
    0,
  );

  tl.to(
    dom.menuIcon,
    {
      backgroundColor: "var(--fg)",
      fill: "var(--bg)",
    },
    0,
  );

  tl.to(
    dom.menuOpenLabel,
    {
      autoAlpha: 0,
      y: -15,
    },
    0,
  ).to(
    dom.menuCloseLabel,
    {
      autoAlpha: 1,
      y: 0,
    },
    "<",
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
