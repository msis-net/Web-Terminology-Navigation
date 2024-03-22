
#### Astro準備
```
> npm create astro@latest or ( npm create astro@latest app)
astro   Launch sequence initiated.
   dir   Where should we create your new project?
         ./app
  tmpl   How would you like to start your new project?
         Include sample files
    ts   Do you plan to write TypeScript?
         Yes
   use   How strict should TypeScript be?
         Strict
  deps   Install dependencies?
         Yes
   git   Initialize a new git repository?
         No
      ◼  Sounds good! You can always run git init manually.
 ██████  Project initializing...
```

cd app/

#### 「Svelte」JSフレームワークの追加
```
> npx astro add svelte
```
astro.config.mjs
```
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  // ...
  integrations: [svelte()],
});
```


#### 「Tailwind」CSSフレームワークの追加
```
> npx astro add tailwind
```
astro.config.mjs
```
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  // ...
  integrations: [svelte(),tailwind()],
});
```

#### 「サーバーサイドレンダリング（SSR）」を有効にする

```
> npm install @astrojs/node
```
astro.config.mjs
```
import { defineConfig } from 'astro/config';
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
    format: 'file'
  },
  server: {
   host: false //ネットワーク全てのif空の接続を許可
  },
  output: "server", 
  adapter: node({
    mode: "standalone",
    adapter: nodejs(),
  }),
  integrations: [tailwind(), svelte()]
});
```
