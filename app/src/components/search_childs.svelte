<script lang="ts">
  import { SearchStr, schpanel } from "@/lib/stores";
  import SearchChilds from "./search_childs.svelte";
  import NavTaxonomyChilds from "./nav_taxonomy_childs.svelte";
  export let indent = 0;

  interface ValueType {
    display?: string;
  }
  export let value: string | ValueType = "";

  interface ObjType {
    concept?: any[]; // Adjust the type according to what `concept` actually contains
    [key: string]: any; // This allows other dynamic keys if necessary
  }
  export let obj: ObjType = {};
  let json: ObjType = {};

  let concept: any[] = [];
  let arrowDown = false;
  $: obj;

  function eventObject() {
    if (Object.keys(json).length == 0) {
      let Arg = $SearchStr.split(/[\s|,|、|　]/);
      try {
        const keys = Object.keys(obj);
        if (keys.includes("concept")) {
          const conceptAry = obj["concept"] as any[];
          for (let i in conceptAry) {
            let tmp = conceptAry[i];
            let schStr = JSON.stringify(conceptAry[i]);
            for (let n in Arg) {
              const regex = new RegExp(Arg[n], "gi");
              const comparison = regex.test(schStr);
              if (comparison) {
                concept.push(tmp);
                break; //1つでも見つかったら登録して抜ける
              }
            }
          }
        } else {
          //conceptを含まない場合は、検索文字があるか比較
          let schStr = JSON.stringify(obj);
          let comparison = false;
          for (let n in Arg) {
            const regex = new RegExp(Arg[n], "gi");
            comparison = regex.test(schStr);
            if (comparison) {
              json = obj;
              break; //1つでも見つかったら登録して抜ける
            }
          }
        }
      } catch (e) {
        console.error(e);
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

  function display(text: string) {
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
    $schpanel = "invisible";
    OpenElement(obj.code);
  }
  let OpenElement = (code: any) => {};

  let mvScroll = () => {};
</script>

<div class="hidden">
  <!--NavTaxonomyChilds#OpenElement呼出しの為表示しない-->
  {#if ($schpanel = "visible")}
    <NavTaxonomyChilds bind:OpenElement bind:mvScroll />
  {/if}
</div>

<!--div>{!value ? ["選択してください"] : value}</div-->

<button on:click={SelectObject} class="ml-{indent} text-left">
  <div class="text-[1.1em] border-b">
    <span class="arrow col-{indent}" class:arrowDown>&#x25b7</span>
    {obj["count"] ? `${obj["count"]}:` : ""}
    {#if typeof value === "object" && value.display}
      {@html display(value.display)}
    {:else}
      {@html display(JSON.stringify(value))}
    {/if}
  </div>
</button>

{#if json}
  <ul class="ml-4">
    {#each Object.keys(json) as key}
      {#if typeof json[key] == "object"}
        {#if key !== "concept"}
          <ul class="ml-{indent + 1}">
            <SearchChilds obj={json[key]} value={key} indent={indent + 1} />
          </ul>
        {/if}
      {:else if key !== "count"}
        <li class="ml-{indent + 2}">
          {@html display(key)}:{@html display(json[key])}
        </li>
      {/if}
    {/each}

    {#if concept}
      {#each concept as item}
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
