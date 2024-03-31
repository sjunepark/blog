import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import {
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": {
      status: 301,
      destination: "/posts",
    },
  },
  site: "https://sjunepark.com",
  integrations: [svelte(), mdx(), sitemap(), tailwind()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        light: "light-plus",
        dark: "dark-plus",
      },
      transformers: [
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff(),
      ],
    },
  },
});
