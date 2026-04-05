export const dom = {
  body: null,
  loader: null,
  lText: null,
  lIcon: null,
  lWave: null,
  lFrame: null,
  lLines: null,
  header: null,
  menuToggle: null,
  menuOpenLabel: null,
  menuCloseLabel: null,
  menuIcon: null,
  menuOverlay: null,
  menuContent: null,
  menuLinks: null,
  main: null,
  sectionContainer: null,
  allSections: null,
  intro: null,
  experiments: null,
  resume: null,
  contact: null,
};

export const state = {
  isOverviewOpen: null,
};

export function initDom() {
  dom.body = document.body;
  dom.loader = document.querySelector(".loading-screen");
  dom.lText = document.querySelector(".loading-screen .loading-text");
  dom.lIcon = document.querySelector(".loading-screen .logo-icon");
  dom.lWave = document.querySelector(".loading-screen .liquid-wave");
  dom.lLines = document.querySelectorAll(".loading-screen .ak-line");
  dom.lFrame = document.querySelector(".loading-screen .frame");
  dom.header = document.querySelector("header");
  dom.menuToggle = document.querySelector(".menu-toggle");
  dom.menuOpenLabel = document.querySelector(".open-label");
  dom.menuCloseLabel = document.querySelector(".close-label");
  dom.menuIcon = document.querySelector(".menu-icon");
  dom.menuOverlay = document.querySelector(".menu-overlay");
  dom.menuContent = document.querySelector(".menu-content");
  dom.menuLinks = document.querySelectorAll(".menu-link");
  dom.main = document.querySelector("main");
  dom.sectionContainer = document.querySelector(".section-container");
  dom.allSections = document.querySelectorAll("section");
  dom.intro = document.querySelector("#intro");
  dom.experiments = document.querySelector("#experiments");
  dom.resume = document.querySelector("#resume");
  dom.contact = document.querySelector("#contact");
}

export function initState() {
  state.isOverviewOpen = false;
}
