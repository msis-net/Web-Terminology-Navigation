<script lang="ts">
  import { loadTranslations } from "@/lib/i18n/i18n";
  import { language } from "@/lib/stores.js";
  export let label;
  loadTranslations($language, "/");
</script>

<main class="">{label}</main>

<div class="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-1">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
  <div>07</div>
  <div>08</div>
  <div class="sm:col-span-2">09</div>
  <div class="sm:col-span-2">10</div>
  <div class="md:col-span-4">11</div>
  <div class="md:col-span-4">12</div>
</div>
<hr />

<style>
  /*grids style*/
  .grid > div {
    border: solid 1px #999;
    padding: 4px;
  }
</style>
