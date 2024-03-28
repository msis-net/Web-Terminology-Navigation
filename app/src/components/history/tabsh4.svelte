<script>
  import { onMount } from "svelte";
  import { ImportsNotUsedAsValues } from "typescript";
  import {
    language,
    CodeSystem,
    Tabname,
    getJonResource,
    Resuoces,
  } from "../stores.js";

  import NavTest4 from "./nav_test4.svelte";
  let openTab = 1;

  function toggleTabs(tabNumber, tabName) {
    openTab = tabNumber;
    $Tabname = tabName;
  }

  //Resuocesの変更が発生した時（DropDownが変更）
</script>

<!--親ノードでflex適用されている-->
<div class="font-mono">
  <nav class=" text-sm">
    <button
      type="button"
      id="btn1"
      on:click={() => toggleTabs(1, "Taxonomy")}
      class="px-2 {openTab === 1
        ? 'transition-all font-bold text-blue-600 border-y-2 border-blue-600'
        : 'bg-none text-gray-500'}"
    >
      Taxonomy
    </button>
    <button
      type="button"
      on:click={() => toggleTabs(2, "Search")}
      class="px-2 {openTab === 2
        ? 'transition-all font-bold text-blue-600 border-y-2 border-blue-600'
        : 'bg-none text-gray-500'}"
    >
      Search
    </button>
    <button
      type="button"
      on:click={() => toggleTabs(3, "Favorites")}
      class="px-2 {openTab === 3
        ? 'transition-all font-bold text-blue-600 border-y-2 border-blue-600'
        : 'bg-none text-gray-500'}"
    >
      Bookmarks
    </button>
    <button
      type="button"
      on:click={() => toggleTabs(4, "History")}
      class="px-2 {openTab === 4
        ? 'transition-all font-bold text-blue-600 border-y-2 border-blue-600'
        : 'bg-none text-gray-500'}"
    >
      History
    </button>
  </nav>
</div>

<div class="tab-height-nav">
  <div
    id="tab1"
    class="h-full bg-gray-100 {openTab === 1 ? 'visible' : 'hidden'}"
  >
    <NavTest4 resdata={$Resuoces} />
  </div>

  <div
    id="tab2"
    class="h-full bg-green-100 {openTab === 2 ? 'visible' : 'hidden'}"
  >
    <div>
      <div>CodeSystem {$CodeSystem}</div>
      <div>Tabname {$Tabname}</div>
    </div>
  </div>

  <div
    id="tab3"
    class="h-full bg-yellow-100 {openTab === 3 ? 'visible' : 'hidden'}"
  >
    <div>
      <div>CodeSystem {$CodeSystem}</div>
      <div>Tabname {$Tabname}</div>
    </div>
  </div>

  <div
    id="tab4"
    class="h-full bg-red-100 {openTab === 4 ? 'visible' : 'hidden'}"
  >
    <div>
      <div>CodeSystem {$CodeSystem}</div>
      <div>Tabname {$Tabname}</div>
    </div>
  </div>
</div>
