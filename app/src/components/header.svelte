<script>
  import { loadTranslations, t, locale, locales } from "@/lib/i18n/i18n";
  import { language, CodeSystem, Tabname, OpenTab } from "./stores.js";

  loadTranslations($language, "/");

  export let title;

  const onChange = () => {
    locale.set($language);
  };
  console.log("language", $language);
  console.log("OpenTab", $OpenTab);
</script>

<h1>
  <a href="/" class="text-2xl md:text-[3vw] lg:text-4xl text-cyan-600">
    <div>{$t("common.header.title")}</div>
    <div class="hidden">{title}</div>
  </a>
</h1>

<nav class="">
  <ul class="flex mx-4 space-x-3 absolute right-0">
    <li><a href="/">ABOUT</a></li>
    <li><a href="/">SERVICE</a></li>
    <li><a href="/">COMPANY</a></li>
    <li><a href="/">CONTACT</a></li>
    <li>
      <select bind:value={$language} on:change={onChange}>
        <option value="en" selected>en</option>
        <option value="ja">ja</option>
      </select>
    </li>
  </ul>
</nav>
