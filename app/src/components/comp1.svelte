<script lang="ts">
  import { onMount } from "svelte";
  import { loadTranslations } from "@/lib/i18n/i18n";
  import { language } from "@/lib/stores.js";
  export let label;
  loadTranslations($language, "/");

  onMount(() => {
    //pass
  });
</script>

<main class="">{label}</main>

<div
  class="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-2 gap-y-1"
>
  <div>
    <!--class="on-off"  if checked is UP-->
    <div class="card bg-blue-300">
      <input type="checkbox" id="box1" class="on-off" />
      <div class="card-header">
        <p class="card-title">Box1</p>
        <label class="btn" for="box1">
          <span class="material-symbols-outlined add"> add </span>
          <span class="material-symbols-outlined remove"> remove </span>
        </label>
      </div>
      <div class="card-body">
        <p>The body of the cardA</p>
      </div>
    </div>
  </div>
  <div>
    <div class="card bg-red-300">
      <input type="checkbox" id="box2" class="on-off" checked />
      <div class="card-header">
        <p class="card-title">Box2</p>
        <label class="btn" for="box2">
          <span class="material-symbols-outlined add"> add </span>
          <span class="material-symbols-outlined remove"> remove </span>
        </label>
      </div>
      <div class="card-body">
        <p>The body of the cardA</p>
      </div>
    </div>
  </div>
  <div>03</div>
  <div>04</div>
  <div>
    <!--class="close" and input tag is on outside-->
    <input type="checkbox" id="box5" class="close" />
    <div class="card bg-green-300">
      <div class="card-header">
        <p class="card-title">Box5</p>
        <label class="btn" for="box5">
          <span class="material-symbols-outlined"> close </span>
        </label>
      </div>
      <div class="card-body">
        <p>The body of the cardA</p>
      </div>
    </div>
  </div>
  <div>06</div>
  <div>07</div>
  <div>08</div>
  <div>09</div>
  <div>10</div>
  <div>11</div>
  <div>12</div>
</div>

<style>
  /*grids style*/
  .grid > div {
    border: solid 1px #999;
    padding: 4px;
  }
</style>
