export const dom = {
  body: null,
  loader: null,
  lIcon: null,
  lWave: null,
  lFrame: null,
  lLines: null,
  header: null,
  overviewOverlay: null,
  overviewLinks: null,
  main: null,
  sectionContainer: null,
  intro: null,
};

export const state = {
  isOverviewOpen: null,
};

export function initDom() {
  dom.body = document.body;
  dom.loader = document.querySelector(".loading-screen");
  dom.lIcon = document.querySelector(".loading-screen .logo-icon");
  dom.lWave = document.querySelector(".loading-screen .liquid-wave");
  dom.lLines = document.querySelectorAll(".loading-screen .ak-line");
  dom.lFrame = document.querySelector(".loading-screen .frame");
  dom.header = document.querySelector("header");
  dom.overviewOverlay = document.querySelector(".overview-overlay")
  dom.overviewLinks = document.querySelectorAll(".overview-link");
  dom.main = document.querySelector("main");
  dom.sectionContainer = document.querySelector(".section-container");
  dom.intro = document.querySelector("#intro");
}

export function initState() {
  state.isOverviewOpen = false;
}
