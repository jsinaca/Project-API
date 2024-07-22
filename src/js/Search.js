import ExternalServices from "./ExternalServices.mjs";
import Search from "./search.mjs";

const dataSource = new ExternalServices();

const recipe = new Search(dataSource);

recipe.init();
