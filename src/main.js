import "./base.css";
import { initDom, initState, dom } from "./globals.js";
import { initLoader } from "./components/loader/loader.js";
import { initHeader } from "./components/header/header.js";
import { initMenu } from "./components/menu/menu.js";
import { initMainLayout } from "./components/main-layout/main-layout.js";
import { initIntro } from "./components/intro/intro.js";
import { initExperiments } from "./components/experiments/experiments.js";
import { initResume } from "./components/resume/resume.js";
import { initContact } from "./components/contact/contact.js";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

function initApp() {
  window.addEventListener("DOMContentLoaded", () => {
    initDom();
    initState();

    dom.body.classList.add("is-ready");

    const components = [
      initHeader,
      initMenu,
      initMainLayout,
      initIntro,
      initExperiments,
      initResume,
      initContact,
    ];

    initLoader().then(() => {
      components.forEach((init) => {
        init();
      });

      inject();
      injectSpeedInsights();
    });
  });
}

initApp();
