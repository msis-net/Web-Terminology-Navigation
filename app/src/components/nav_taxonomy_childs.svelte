<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { Concept, Openkey, OpenTab, Label } from "@/lib/stores";
  import NavTaxonomyChilds from "@/components/nav_taxonomy_childs.svelte";

  export let indent = 0;

  interface ObjType {
    concept?: any[]; // Adjust the type according to what `concept` actually contains
    [key: string]: any; // This allows other dynamic keys if necessary
  }
  export let obj: ObjType = {};
  export let opencode: string[] = [];
  export let mvScroll: any;
  let element: HTMLElement;
  let elementCoordinates;

  let json: ObjType = {};
  let concept: any[] | ObjType = [];
  let arrowDown = false;
  let id = "";
  $: obj;
  $: {
    if ($Openkey) {
      //console.log("Openkey>>", $Openkey, obj.code);
      try {
        const schStr = JSON.stringify(obj);
        if ($Openkey.length > 0 && schStr.indexOf($Openkey) !== -1) {
          //eventObject();
          id = $Openkey;
          viewTarget($Openkey);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  //検索
  function viewTarget(code: string) {
    if (Array.isArray(obj)) {
      json = obj;
    } else {
      concept = Array.isArray(obj["concept"]) ? obj["concept"] : [];
      if (Object.keys(concept).length > 0) {
        //下位層がある場合は展開
        arrowDown = true;
      }
    }
  }

  function eventObject() {
    if (Object.keys(json).length == 0) {
      json = obj;

      concept = Array.isArray(obj["concept"]) ? obj["concept"] : [];
      arrowDown = true;
    } else {
      json = {};
      concept = [];
      arrowDown = false;
    }
  }

  function SelectObject(value: any) {
    console.log("SelectObject", value);
    if (typeof value === "object") {
      $Concept = value;
    } else {
      $Concept = obj;
    }
    $Label = value;
  }
  export const OpenElement = (code: string) => {
    $Openkey = "";
    $OpenTab = 1;
    $Openkey = code;
  };

  onMount(() => {
    const { top, right, bottom, left } = element.getBoundingClientRect();
    elementCoordinates = { top, right, bottom, left };
  });

  //Scroll to finded position
  afterUpdate(() => {
    if ($Openkey === obj.code) {
      try {
        window.setTimeout(() => {
          const { top, right, bottom, left } = element.getBoundingClientRect();
          elementCoordinates = { top, right, bottom, left };
          element.classList.add("bg-yellow-200");
          mvScroll(top);
        }, 100);
      } catch (e) {}
    }
  });
</script>

<hr />

<!--div>{!value ? ["選択してください"] : obj}</div-->
<div class="whitespace-nowrap">
  <button on:click={eventObject} class="ml-{indent} text-left">
    <span class="arrow col-{indent}" class:arrowDown>&#x25b6</span>
  </button>
  <button
    on:click={() => SelectObject(obj)}
    class="element pl-1 rounded-sm bgy text-left text-[1.1em]"
    bind:this={element}
    {id}
  >
    {obj.display ? obj.display : `${JSON.stringify(obj)}`}
    <span class="arrow text-[0.6em]"></span>
  </button>
</div>
{#if json}
  <ul class="ml-4">
    {#each Object.keys(json) as key}
      {@const item = json[key]}
      {#if typeof item == "object"}
        {#if key !== "concept"}
          <ul class="ml-3">
            <NavTaxonomyChilds
              obj={json[key]}
              indent={indent + 1}
              {opencode}
              {mvScroll}
            />
          </ul>
        {/if}
      {:else if key !== "count"}
        <li class="ml-6">{key}:"{json[key]}"</li>
      {/if}
    {/each}

    {#if concept}
      {#if Array.isArray(concept)}
        {#each concept as item}
          <NavTaxonomyChilds
            obj={item}
            indent={indent + 1}
            {opencode}
            {mvScroll}
          />
        {/each}
      {/if}
    {/if}
  </ul>
{/if}

<style>
  .arrow {
    cursor: pointer;
    display: inline-block;
    transition: transform 200ms;
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
