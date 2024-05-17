<script lang="ts">
  import { tick } from "svelte";
  import { Concept, Label } from "@/lib/stores";
  import ConceptChilds from "@/components/concept_childs.svelte";
  export let value = "";
  export let indent = 0;

  interface ObjType {
    concept?: any[]; // Adjust the type according to what `concept` actually contains
    [key: string]: any; // This allows other dynamic keys if necessary
  }

  export let obj: ObjType = {};
  let json: ObjType = {};

  let concept: any[] = [];
  let arrowDown = false;

  $: {
    if ($Concept) {
      obj = $Concept;
      json = {};
      concept = [];
      eventObject();
    }
  }

  async function eventObject() {
    json = {};
    await tick();
    console.log("obj", typeof obj);
    const keys = Object.keys(obj);

    console.log("keys", keys, keys.includes("concept"));
    if (keys.includes("concept")) {
      concept = [];
      const conceptAry = obj["concept"] as any[];
      for (let i in conceptAry) {
        let tmp = conceptAry[i];
        concept.push(tmp);
      }
    }
    //json = concept;

    json = obj;
    arrowDown = true;
  }

  async function SelectObject(value: any) {
    console.log("It's next Action! ", value, $Label);
  }
  function display(text: string) {
    if (text) {
      //console.log("text:", text, typeof text, $Label);
      let Arg = obj.display;
      //console.log("text:", text, obj.display);
      if (obj.display) {
        const regex = new RegExp(Arg, "gi");
        let result = text.match(regex);
        //console.log("result:", result, Arg);
        if (result) {
          text = text.replaceAll(regex, "<b>" + Arg + "</b>");
          //console.log("regex:", regex);
        }
      } else {
        text = $Label;
      }
      return text;
    } else {
      return "";
    }
  }
</script>

<hr />
<div class="text-[0.6em]">ConceptView</div>
{#if Object.keys(json).length > 0}
  <!--div>{!value ? ["選択してください"] : value}</div-->
  <button on:click={() => SelectObject(value)} class="ml-{indent} text-left">
    <span class="arrow col-{indent}" class:arrowDown>&#x25b7</span>
    <!--
      {obj["count"] ? `${obj["count"]}:` : ""}
    -->
    {#if json.display}
      {@html display(json.display)}
    {:else}
      {@html display(JSON.stringify(json))}
    {/if}
  </button>

  <ul class="ml-4 text-[0.8em]">
    {#each Object.keys(json) as key}
      {#if typeof json[key] == "object"}
        {#if key !== "concept"}
          <ul class="ml-{indent + 1} ">
            <ConceptChilds obj={json[key]} value={key} indent={indent + 1} />
          </ul>
        {/if}
      {:else if key !== "count"}
        <li class="ml-{indent + 2}">
          {key}:{json[key]}
        </li>
      {/if}
    {/each}

    {#if concept}
      {#each concept as item}
        <ConceptChilds obj={item} value={item} indent={indent + 1} />
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
