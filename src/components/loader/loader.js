import "./loader.css";
import { gsap } from "gsap";
import { dom } from "../../globals";

function waitForPageLoad() {
  if (document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.addEventListener("load", resolve, { once: true });
  });
}

function loaderTimeline(onComplete) {
  const tl = gsap.timeline({ onComplete });

  gsap.set(dom.lIcon, { autoAlpha: 0 });
  gsap.set([dom.lLines, dom.lFrame], {
    opacity: 0,
    scale: 0,
    rotation: -45,
    transformOrigin: "50% 50%",
  });
  gsap.set(dom.lWave, { x: 0, y: 100 });

  tl.to(dom.lText, {
    autoAlpha: 1,
    duration: 0.6,
    ease: "power2.out",
  })
    .to(dom.lText, {
      autoAlpha: 0,
      duration: 0.45,
      ease: "power2.in",
    })
    .set(dom.lIcon, { autoAlpha: 1 })
    .to([dom.lFrame, dom.lLines], {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "expo.out",
    })
    .to(
      dom.lWave,
      {
        x: -100,
        duration: 1.5,
        ease: "none",
      },
      "<",
    )
    .to(
      dom.lWave,
      {
        y: -101,
        duration: 3.5,
        ease: "power2.inOut",
      },
      "-=1.2",
    );

  return tl;
}

export function initLoader() {
  gsap.set(dom.lText, { autoAlpha: 0.12 });
  gsap.set(dom.lIcon, { autoAlpha: 0 });

  return waitForPageLoad().then(
    () =>
      new Promise((resolve) => {
        loaderTimeline(() => {
          dom.loader.remove();
          resolve();
        });
      }),
  );
}
