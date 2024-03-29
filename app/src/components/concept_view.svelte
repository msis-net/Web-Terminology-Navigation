<script>
  import { tick } from "svelte";
  import { fade } from "svelte/transition";
  import { Concept } from "./stores.js";
  import SearchChilds from "./search_childs.svelte";

  export let value = "";
  export let indent = 1;
  export let obj = {};
  let json = {};
  let concept = [];
  let arrowDown = false;
  $: {
    if ($Concept) {
      console.log("Change");
      obj = $Concept;
      json = {};
      concept = [];

      eventObject();
    }
  }

  async function eventObject() {
    //console.log("Arguments", $Arguments);
    //console.log(json, Object.keys(json).length);

    //if (Object.keys(json).length == 0) {
    //json = obj;
    //let Arg = $Arguments.split(/[\s|,|、|　]/);
    //try {]
    json = {};
    await tick();
    //concept = obj["concept"];

    const keys = Object.keys(obj);

    console.log("keys", keys, keys.includes("concept"));
    if (keys.includes("concept")) {
      concept = [];
      for (let i in obj["concept"]) {
        let tmp = obj["concept"][i];
        concept.push(tmp);
      }
      //json = concept;
    } else {
      json = obj;
    }
    //} catch (e) {
    //console.error(e);
    // }
    json = obj;
    arrowDown = true;
    /*} else {
      json = {}; //「隠す」も考慮する
      concept = [];
      arrowDown = false;
    }*/
    //await tick();
    //console.log(json, Object.keys(json).length);
  }

  function SelectObject(value) {
    console.log(value);
  }
</script>

<hr />
{#if Object.keys(json).length > 0}
  <!--div>{!value ? ["選択してください"] : value}</div-->
  <button on:click={SelectObject(value)} class="ml-{indent} text-left">
    <span class="arrow col-{indent}" class:arrowDown>&#x25b7</span>
    {obj["count"] ? `${obj["count"]}:` : ""}
    {#if json.display}
      {json.display}
    {:else}
      {JSON.stringify(json)}
    {/if}
  </button>

  <ul class="ml-4 text-[0.8em]">
    {#each Object.keys(json) as key, i}
      {@const item = json[key]}
      {#if typeof json[key] == "object"}
        {#if key !== "concept"}
          <ul class="ml-{indent + 1} ">
            <SearchChilds obj={json[key]} value={key} indent={indent + 1} />
          </ul>
        {/if}
      {:else if key !== "count"}
        <li class="ml-{indent + 2}">
          {key}:{json[key]}
        </li>
      {/if}
    {/each}

    {#if concept}
      {#each concept as item, i}
        <SearchChilds obj={item} value={item} indent={indent + 1} />
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
