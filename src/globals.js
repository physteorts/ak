export const dom = {
  body: null,
  loader: null,
  lIcon: null,
  lWave: null,
  lFrame: null,
  lLines: null,
  header: null,
  menuToggle: null,
  menuOverlay: null,
  menuLinks: null,
  main: null,
  sectionContainer: null,
  intro: null,
};

export const state = {
  isMenuOpen: null,
};

export function initDom() {
  dom.body = document.body;
  dom.loader = document.querySelector(".loading-screen");
  dom.lIcon = document.querySelector(".loading-screen .logo-icon");
  dom.lWave = document.querySelector(".loading-screen .liquid-wave");
  dom.lLines = document.querySelectorAll(".loading-screen .ak-line");
  dom.lFrame = document.querySelector(".loading-screen .frame");
  dom.header = document.querySelector("header");
  dom.menuToggle = document.querySelector(".menu-toggle");
  dom.menuOverlay = document.querySelector(".menu-overlay");
  dom.menuLinks = document.querySelectorAll(".menu-link");
  dom.main = document.querySelector("main");
  dom.sectionContainer = document.querySelector(".section-container");
  dom.intro = document.querySelector("#intro");
}

export function initState() {
  state.isMenuOpen = false;
}
