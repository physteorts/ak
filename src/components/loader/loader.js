import "./loader.css";
import { gsap } from "gsap";
import { dom } from "../../globals";

function loaderTimeline(onComplete) {
  const tl = gsap.timeline({ onComplete });

  gsap.set([dom.lLines, dom.lFrame], {
    opacity: 0,
    scale: 0,
    rotation: -45,
    transformOrigin: "50% 50%",
  });

  tl.to([dom.lFrame, dom.lLines], {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: "power4.out",
  })
    .to(
      dom.lIcon,
      {
        fill: "var(--bg)",
        duration: 1,
        ease: "power2.inOut",
      },
      "-=0.5",
    )
    .to(dom.lIcon, {
      scale: 20,
      rotate: 180,
      duration: 1.2,
      ease: "expo.in",
    });

  return tl;
}

export function initLoader() {
  return new Promise((resolve) => {
    loaderTimeline(() => {
      dom.loader.remove();
      resolve();
    });
  });
}
