import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        recipe: resolve(__dirname, "src/recipe/index.html"),
        c_meals: resolve(__dirname, "src/c_meals/index.html"),
        categories: resolve(__dirname, "src/categories/index.html"),
        country: resolve(__dirname, "src/country/index.html"),
        countries: resolve(__dirname, "src/countries/index.html"),
        latest: resolve(__dirname, "src/latest/index.html"),
        search: resolve(__dirname, "src/search/index.html"),
        random: resolve(__dirname, "src/random/index.html"),
      },
    },
  },
});
