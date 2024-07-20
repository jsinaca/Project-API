import CountryMeals from "./country.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();

const externalServices = new ExternalServices();
const element = document.querySelector(".country-list");
const listing = new CountryMeals(externalServices, element);

listing.init();
