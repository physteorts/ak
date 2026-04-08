export const dom = {
  body: null,
  loader: null,
  lText: null,
  lIcon: null,
  lWave: null,
  lFrame: null,
  lLines: null,
  header: null,
  logo: null,
  logoIcon: null,
  menuToggle: null,
  menuOpenLabel: null,
  menuCloseLabel: null,
  menuIcon: null,
  overviewOverlay: null,
  overviewContent: null,
  overviewLinks: null,
  main: null,
  sectionContainer: null,
  sectionOverlay: null,
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
  dom.logo = document.querySelector("header .logo");
  dom.logoIcon = document.querySelector("header .logo-icon");
  dom.menuToggle = document.querySelector(".menu-toggle");
  dom.menuOpenLabel = document.querySelector(".open-label");
  dom.menuCloseLabel = document.querySelector(".close-label");
  dom.menuIcon = document.querySelector(".menu-icon");
  dom.overviewOverlay = document.querySelector(".overview-overlay");
  dom.overviewContent = document.querySelector(".overview-content");
  dom.overviewLinks = document.querySelectorAll(".overview-link");
  dom.main = document.querySelector("main");
  dom.sectionContainer = document.querySelector(".section-container");
  dom.sectionOverlay = document.querySelector(".section-overlay");
  dom.allSections = document.querySelectorAll("section");
  dom.intro = document.querySelector("#intro");
  dom.experiments = document.querySelector("#experiments");
  dom.resume = document.querySelector("#resume");
  dom.contact = document.querySelector("#contact");
}

export function initState() {
  state.isOverviewOpen = false;
}
