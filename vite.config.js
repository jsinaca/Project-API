import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        // cart: resolve(__dirname, "src/cart/index.html"),
        // checkout: resolve(__dirname, "src/checkout/index.html"),
        recipe: resolve(__dirname, "src/recipe/index.html"),
        // list: resolve(__dirname, "src/recipe/index.html"),
        category_meals: resolve(__dirname, "src/category-meals/index.html"),
        categories: resolve(__dirname, "src/categories/index.html"),
      },
    },
  },
});
