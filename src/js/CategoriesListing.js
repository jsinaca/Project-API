import CategoriesList from "./categories-list.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();

// const category = getCategories("category");
const externalServices = new ExternalServices();
const element = document.querySelector(".categories-list");
const listing = new CategoriesList(externalServices, element);

listing.init();