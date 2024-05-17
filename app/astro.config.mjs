import { defineConfig } from "astro/config";
import node from "@astrojs/node";

/*integrations*/
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  //HTMLを圧縮しない
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: "file",
  },
  server: {
    port: 5678,
    host: false, //ネットワーク全ての接続を許可(本番時)
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [tailwind(), svelte()],
});
