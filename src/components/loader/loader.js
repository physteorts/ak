import "./loader.css";
import { gsap } from "gsap";

function waitForDomContentLoaded() {
  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", resolve, { once: true });
  });
}

function animateLoadingText() {
  return new Promise((resolve) => {
    gsap.to(".loading-text", {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: resolve,
    });
  });
}

export async function initLoader() {
  await waitForDomContentLoaded();
  await animateLoadingText();
  document.querySelector(".loading-screen")?.remove();
}
