export const dom = {
  body: null,
  header: null,
  hLogo: null,
  menuToggle: null,
  menuOpenLabel: null,
  menuCloseLabel: null,
  menuIcon: null,
  overviewOverlay: null,
  overviewContent: null,
  overviewLinks: null,
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
  dom.header = document.querySelector("header");
  dom.hLogo = document.querySelector("header .logo");
  dom.menuToggle = document.querySelector(".menu-toggle");
  dom.menuOpenLabel = document.querySelector(".open-label");
  dom.menuCloseLabel = document.querySelector(".close-label");
  dom.menuIcon = document.querySelector(".menu-icon");
  dom.overviewOverlay = document.querySelector(".overview-overlay");
  dom.overviewContent = document.querySelector(".overview-content");
  dom.overviewLinks = document.querySelectorAll(".overview-link");
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
