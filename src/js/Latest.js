import Latest from "./latest.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();

const externalServices = new ExternalServices();
const element = document.querySelector(".recipe-list");
const listing = new Latest(externalServices, element);

listing.init();
