import "./overview.css";
import { state } from "../../globals";
import { updateMainLayout } from "../main-layout/main-layout";
import { updateHeaderBackground } from "../header/header";

export function toggleOverview() {
  state.isOverviewOpen = !state.isOverviewOpen;
  updateMainLayout();
  updateHeaderBackground();
}

export function initOverview() { }
