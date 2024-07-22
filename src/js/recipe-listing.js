import ExternalServices from "./ExternalServices.mjs";
import RecipesList from "./recipe-list.mjs";
import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();

const externalServices = new ExternalServices();
const element = document.querySelector(".recipe-list");
const listing = new RecipesList(externalServices, element);

listing.init();
