<script>
  import { loadTranslations, t } from "@/lib/i18n/i18n";
  import { onMount } from "svelte";
  import { ImportsNotUsedAsValues } from "typescript";
  import {
    language,
    Tabname,
    OpenTab,
    SearchObj,
    Resuoces,
  } from "@/lib/stores";
  loadTranslations($language, "/");
  import NavTaxonomy from "./nav_taxonomy.svelte";
  import Search from "./search.svelte";

  function toggleTabs(tabNumber, tabName) {
    $OpenTab = tabNumber;
    $Tabname = tabName;
  }
</script>

<!--親ノードでflex適用されている-->

<div class="font-mono mt-1">
  <nav class=" text-sm">
    <button
      type="button"
      on:click={() => toggleTabs(1, "Taxonomy")}
      class="px-2 {$OpenTab === 1
        ? 'transition-all font-bold text-blue-600 border-y-2 border-blue-600'
        : 'bg-none text-gray-500'}"
    >
      {$t("common.navigate.Taxonomy")}
    </button>
    <button
      type="button"
      on:click={() => toggleTabs(2, "Search")}
      class="px-2 {$OpenTab === 2
        ? 'transition-all font-bold text-blue-600 border-y-2 border-blue-600'
        : 'bg-none text-gray-500'}"
    >
      {$t("common.navigate.Search")}
    </button>
    <button
      type="button"
      on:click={() => toggleTabs(3, "Bookmarks")}
      class="px-2 {$OpenTab === 3
        ? 'transition-all font-bold text-blue-600 border-y-2 border-blue-600'
        : 'bg-none text-gray-500'}"
    >
      {$t("common.navigate.Bookmarks")}
    </button>
    <button
      type="button"
      on:click={() => toggleTabs(4, "History")}
      class="px-2 {$OpenTab === 4
        ? 'transition-all font-bold text-blue-600 border-y-2 border-blue-600'
        : 'bg-none text-gray-500'}"
    >
      {$t("common.navigate.History")}
    </button>
  </nav>
</div>

<div class="tabbody tab-height-nav">
  <div
    id="tab1"
    class="h-full bg-gray-100 {$OpenTab === 1 ? 'visible' : 'hidden'}"
  >
    <div class="tabbody">
      <NavTaxonomy {$Resuoces} />
    </div>
  </div>

  <div
    id="tab2"
    class="h-full bg-green-100 {$OpenTab === 2 ? 'visible' : 'hidden'}"
  >
    <div class="tabbody">
      <Search {$SearchObj} />
    </div>
  </div>

  <div
    id="tab3"
    class="h-full bg-yellow-100 {$OpenTab === 3 ? 'visible' : 'hidden'}"
  >
    <div class="tabbody">
      <div>Tabname {$Tabname}</div>
    </div>
  </div>

  <div
    id="tab4"
    class="h-full bg-red-100 {$OpenTab === 4 ? 'visible' : 'hidden'}"
  >
    <div class="tabbody">
      <div>Tabname {$Tabname}</div>
    </div>
  </div>
</div>

<style>
  .tabbody {
    height: calc(100%);
  }
  .tab-height-nav {
    height: calc(100% - 110px);
  }
</style>
