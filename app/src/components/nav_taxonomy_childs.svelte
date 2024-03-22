<script>
  import { fade } from "svelte/transition";
  import NavTaxonomyChilds from "@/components/nav_taxonomy_childs.svelte";

  export let title = "";
  export const id = "";
  export let indent = 0;
  export let obj = {};
  let json = {};
  let arrowDown = false;
  $: {
    obj = obj;
  }

  function eventObject(key) {
    if (Object.keys(json).length == 0) {
      json = obj;
      arrowDown = true;
    } else {
      json = {}; //「隠す」も考慮する
      arrowDown = false;
    }
    console.log(json, Object.keys(json).length);
  }
</script>

<hr />
<!--div>{!title ? ["選択してください"] : title}</div-->
<button on:click={eventObject} class="ml-{indent} w-full text-left"
  ><span class="arrow" class:arrowDown>&#x25b6</span>{title}</button
>

{#if Object.keys(json).length > 0}
  <ul class="text-[1em]">
    {#each Object.keys(json) as key}
      <!--object判定-->
      {#if typeof json[key] == "object"}
        <!--code属性判定-->
        {#if json[key]["code"]}
          <NavTaxonomyChilds
            obj={json[key]}
            title={json[key]["display"]}
            id={json[key]["index"]}
            indent={indent + 1}
          />
        {:else}
          <ul class="ml-{indent + 1}">
            <NavTaxonomyChilds
              obj={json[key]}
              title={key}
              id={json[key]["index"]}
              {indent}
            />
          </ul>
        {/if}
      {:else}
        <li class="ml-{indent}">{key}:"{json[key]}"</li>
      {/if}
    {/each}
  </ul>
  <hr />
{/if}

<!--
{#if Object.keys(obj).length > 0}
  <div class="text-[0.6em] text-blue-600">T:{obj}</div>
{/if}
-->
<style>
  .arrow {
    cursor: pointer;
    display: inline-block;
    /* transition: transform 200ms; */
  }
  .arrowDown {
    transform: rotate(90deg);
  }
</style>
