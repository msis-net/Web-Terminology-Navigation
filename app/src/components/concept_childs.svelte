<script>
  import { tick } from "svelte";
  import { fade } from "svelte/transition";
  import { SearchStr, schpanel } from "@/lib/stores";
  import ConceptChilds from "./concept_childs.svelte";
  export let value = "";
  export let indent = 0;
  export let obj = {};
  let json = {};
  let concept = [];
  let arrowDown = false;
  $: {
    obj = obj;
  }

  function eventObject() {
    console.log("SearchStr", $SearchStr);
    //console.log(json, Object.keys(json).length);

    if (Object.keys(json).length == 0) {
      //json = obj;
      let Arg = [];
      if ($SearchStr) {
        Arg = $SearchStr.split(/[\s|,|、|　]/);
      }
      try {
        //concept = obj["concept"];
        const keys = Object.keys(obj);
        //console.log("keys", keys, keys.includes("concept"));
        if (keys.includes("concept")) {
          for (let i in obj["concept"]) {
            let tmp = obj["concept"][i];
            let schStr = JSON.stringify(tmp);
            for (let n in Arg) {
              const regex = new RegExp(Arg[n], "gi");
              const comparison = regex.test(schStr);
              if (comparison) {
                concept.push(tmp);
                break; //1つでも見つかったら登録して抜ける
              }
            }
          }
          //json = concept;
        } else {
          //conceptを含まない場合は、検索文字があるか比較

          let schStr = JSON.stringify(obj);
          //console.log("schStr", schStr);
          let comparison = false;
          for (let n in Arg) {
            const regex = new RegExp(Arg[n], "gi");
            comparison = regex.test(schStr);
            if (comparison) {
              json = obj;
              break; //1つでも見つかったら登録して抜ける
            }
          }
          //console.log("comparison", comparison);
        }
      } catch (e) {
        //console.error(e);
      }
      json = obj;
      arrowDown = true;
    } else {
      json = {}; //「隠す」も考慮する
      concept = [];
      arrowDown = false;
    }
    //await tick();
    //console.log(json, Object.keys(json).length);
  }
  eventObject();

  function display(text) {
    if (text) {
      let Arg = $SearchStr.split(/[\s|,|、|　]/);
      for (let n in Arg) {
        const regex = new RegExp(Arg[n], "gi");
        let result = text.match(regex);
        if (result) {
          text = text.replaceAll(regex, "<b>" + Arg[n] + "</b>");
          //console.log("regex:", regex);
        }
      }
      return text;
    } else {
      return "";
    }
  }
  function SelectObject() {
    console.log(value);
    $schpanel = "invisible";
  }
</script>

<hr />
<div class="text-[0.6em]">SearchChilds</div>
<!--div>{!value ? ["選択してください"] : value}</div-->
<button on:click={SelectObject(value)} class="ml-{indent} text-left">
  <div class="text-[1.1em] border-b">
    <span class="arrow col-{indent}" class:arrowDown>&#x25b7</span>
    {obj["count"] ? `${obj["count"]}:` : ""}
    {#if value.display}
      {@html display(value.display)}
    {:else}
      {@html display(JSON.stringify(value))}
    {/if}
  </div>
</button>

{#if json}
  <ul class="ml-4">
    {#each Object.keys(json) as key, i}
      {@const item = json[key]}
      {#if typeof json[key] == "object"}
        {#if key !== "concept"}
          <ul class="ml-{indent + 1}">
            <ConceptChilds obj={json[key]} value={key} indent={indent + 1} />
          </ul>
        {/if}
      {:else if key !== "count"}
        <li class="ml-{indent + 2}">
          {@html display(key)}:{@html display(json[key])}
        </li>
      {/if}
    {/each}

    {#if concept}
      {#each concept as item, i}
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
