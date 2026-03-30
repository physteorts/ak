import "./overview.css";
import { state } from "../../globals";
import { updateHeader } from "../header/header";

export function toggleOverview() {
  state.isOverviewOpen = !state.isOverviewOpen;
  updateHeader();
}

export function initOverview() { }
