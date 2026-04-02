import "./menu.css";
import { dom, state } from "../../globals";
import { smoother } from "../main-layout/main-layout";
import gsap from "gsap";

let menuOverlayTl;

function menuLinkToggle() {
  dom.menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = link.getAttribute("href");

      toggleMenu();

      smoother.scrollTo(target, true, "top top");
    });
  });
}

function createMenuOverlayTimeline() {
  const tl = gsap.timeline({ paused: true });

  tl.to(dom.menuOverlay, {
    autoAlpha: 1,
  });

  return tl;
}

function updateMenuOverlay() {
  if (state.isMenuOpen) {
    smoother.paused(true);
    menuOverlayTl.play();
  } else {
    smoother.paused(false);
    menuOverlayTl.reverse();
  }
}

export function toggleMenu() {
  state.isMenuOpen = !state.isMenuOpen;
  updateMenuOverlay();
}

export function initMenu() {
  menuLinkToggle();
  menuOverlayTl = createMenuOverlayTimeline();
}
