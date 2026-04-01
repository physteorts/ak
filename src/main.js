import "./base.css";
import { initDom, initState, dom } from "./globals.js";
import { initLoader } from "./components/loader/loader.js";
import { initHeader } from "./components/header/header.js";
import { initOverview } from "./components/overview/overview.js";
import { initMainLayout } from "./components/main-layout/main-layout.js";
import { initIntro } from "./components/intro/intro.js";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

function initApp() {
  window.addEventListener("DOMContentLoaded", () => {
    initDom();
    initState();

    dom.body.classList.add("is-ready");

    const components = [initHeader, initOverview, initMainLayout, initIntro];

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
