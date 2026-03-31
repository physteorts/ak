import "./overview.css";
import { state } from "../../globals";
import { updateHeaderBackground } from "../header/header";
import { updateMainLayout } from "../main-layout/main-layout";

export function toggleOverview() {
  state.isOverviewOpen = !state.isOverviewOpen;
  updateHeaderBackground();
  updateMainLayout();
}

export function initOverview() { }
