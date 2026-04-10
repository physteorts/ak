import "./base.css";
import { initDom, initState } from "./globals.js";
import { initLoader } from "./components/loader/loader.js";
import { initHeader } from "./components/header/header.js";
import { initMainLayout } from "./components/main-layout/main-layout.js";
import { initIntro } from "./components/intro/intro.js";
import { initExperiments } from "./components/experiments/experiments.js";
import { initResume } from "./components/resume/resume.js";
import { initContact } from "./components/contact/contact.js";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

startApp();

async function startApp() {
  document.body.classList.add("is-ready");
  await initLoader();
  initApp();
}

function initApp() {
  initDom();
  initState();

  const components = [
    initHeader,
    initMainLayout,
    initIntro,
    initExperiments,
    initResume,
    initContact,
  ];

  components.forEach((initComponent) => {
    initComponent();
  });

  inject();
  injectSpeedInsights();
}
