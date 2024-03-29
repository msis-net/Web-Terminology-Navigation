<script>
  import { tick } from "svelte";
  import { fade } from "svelte/transition";
  import NavTaxonomyChilds from "@/components/nav_taxonomy_childs.svelte";
  import { Concept } from "./stores.js";

  export let value = "";
  export let indent = 0;
  export let obj = {};
  let json = {};
  let concept = [];
  let arrowDown = false;
  $: {
    obj = obj;
  }

  function eventObject(key) {
    //console.log(json, Object.keys(json).length);
    if (Object.keys(json).length == 0) {
      json = obj;

      try {
        concept = obj["concept"];
      } catch (e) {
        //console.error(e);
      }

      arrowDown = true;
    } else {
      json = {}; //「隠す」も考慮する
      concept = [];
      arrowDown = false;
    }
    //await tick();
    //console.log(json, Object.keys(json).length);
  }
  function SelectObject(value) {
    $Concept = value;
    console.log("$Concept", $Concept);
  }
</script>

<hr />
<!--div>{!value ? ["選択してください"] : value}</div-->
<button on:click={eventObject} class="ml-{indent} text-left">
  <span class="arrow col-{indent}" class:arrowDown>&#x25b6</span>
</button>
<button
  on:click={SelectObject(value)}
  class="ml-{indent} text-left text-[1.1em]"
>
  {obj["count"] ? `${obj["count"]}:` : ""}
  {value.display ? `${value.display}` : `${JSON.stringify(value)}`}
  <span class="arrow text-[0.6em]">*</span>
</button>

{#if json}
  <ul class="ml-4">
    {#each Object.keys(json) as key, i}
      {@const item = json[key]}
      {#if typeof json[key] == "object"}
        {#if key !== "concept"}
          <ul class="ml-{indent + 1}">
            <NavTaxonomyChilds
              obj={json[key]}
              value={key}
              indent={indent + 1}
            />
          </ul>
        {/if}
      {:else if key !== "count"}
        <li class="ml-{indent + 2}">{key}:"{json[key]}"</li>
      {/if}
    {/each}

    {#if concept}
      {#each concept as item, i}
        <NavTaxonomyChilds obj={item} value={item} indent={indent + 1} />
      {/each}
    {/if}
  </ul>
{/if}

<style>
  .arrow {
    cursor: pointer;
    display: inline-block;
    /* transition: transform 200ms; */
  }
  .arrowDown {
    transform: rotate(90deg);
  }
  .col-1 {
    color: #2364aa;
  }
  .col-2 {
    color: #fec601;
  }
  .col-3 {
    color: #73bfb8;
  }
  .col-4 {
    color: #ea7317;
  }
  .col-5 {
    color: #3da5d9;
  }
</style>
