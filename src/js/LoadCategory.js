import CategoryMeals from "./category-mod.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();

const externalServices = new ExternalServices();
const element = document.querySelector(".category-list");
const listing = new CategoryMeals(externalServices, element);

listing.init();