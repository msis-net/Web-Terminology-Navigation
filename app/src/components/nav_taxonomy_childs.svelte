<script>
  import { tick, onMount } from "svelte";
  import { fade } from "svelte/transition";

  import { Concept, Openkey, OpenTab, Label, Position } from "./stores.js";
  import NavTaxonomyChilds from "@/components/nav_taxonomy_childs.svelte";

  export let value = "";
  export let indent = 0;
  export let obj = {};
  export let opencode = [];
  let element;
  let elementCoordinates;
  let json = {};
  let concept = [];
  let arrowDown = false;
  $: obj = obj;
  $: {
    if ($Openkey) {
      console.log("Openkey>>", $Openkey, obj.code);
      try {
        const schStr = JSON.stringify(obj);
        if ($Openkey.length > 0 && schStr.indexOf($Openkey) !== -1) {
          //eventObject();
          viewTarget($Openkey);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
  function viewTarget(code) {
    console.log("viewTarget", code, obj);
    console.log(json, Object.keys(json).length);

    if (Object.keys(json).length == 0) {
      //閉じている場合のみ実行
      let scfStr = JSON.stringify(obj);
      //if (scfStr.indexOf(code) != -1) {
      json = obj;

      try {
        concept = obj["concept"];
      } catch (e) {
        //console.error(e);
        //console.log("json", JSON.stringify(json));
      }

      arrowDown = true;
      //}
    }
    //console.log(json, Object.keys(json).length);
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
    console.log(json, Object.keys(json).length);
  }

  function display(text) {
    if (text) {
      const regex = new RegExp($Openkey, "gi");
      let result = text.match(regex);
      if (result) {
        text = text.replaceAll(regex, "<b>" + Arg[n] + "</b>");
        console.log("regex:", regex);
      }
      return text;
    } else {
      return "";
    }
  }
  function SelectObject(value) {
    console.log("value", typeof value, value);
    if (typeof value === "object") {
      $Concept = value;
    } else {
      $Concept = obj;
    }
    $Label = value;
  }
  export const OpenElement = (code) => {
    $Openkey = code;
    $OpenTab = 1;
    console.log("NTC:OpenElement", code);
  };

  onMount(() => {
    const { top, right, bottom, left } = element.getBoundingClientRect();
    elementCoordinates = { top, right, bottom, left };
    if ($Openkey === obj.code) {
      console.log(
        "Element coordinates:" + value.display,
        $Openkey,
        json.code,
        obj.code,
        elementCoordinates
      );
      mvScroll(elementCoordinates.top - 142);
    }
  });
  function mvScroll(num) {
    $Position = num;
    console.log("Position", $Position);
  }
</script>

<hr />

<!--div>{!value ? ["選択してください"] : value}</div-->
<button on:click={eventObject} class="ml-{indent} text-left">
  <span class="arrow col-{indent}" class:arrowDown>&#x25b6</span>
</button>
<button
  on:click={SelectObject(value)}
  class="element ml-{indent} text-left text-[1.1em]"
  bind:this={element}
>
  <!--検索するとcountが入れ替わる
  {obj["count"] ? `${obj["count"]}:` : ""}
  -->
  {value.display ? `${value.display}` : `${JSON.stringify(value)}`}
  <span class="arrow text-[0.6em]"></span>
</button>

{#if json}
  <ul class="ml-4">
    {#each Object.keys(json) as key, i}
      {@const item = json[key]}
      {#if typeof item == "object"}
        {#if key !== "concept"}
          <ul class="ml-{indent + 1}">
            <NavTaxonomyChilds
              obj={json[key]}
              value={key}
              indent={indent + 1}
              {opencode}
            />
          </ul>
        {/if}
      {:else if key !== "count"}
        <li class="ml-{indent + 2}">{key}:"{json[key]}"</li>
      {/if}
    {/each}

    {#if concept}
      {#each concept as item, i}
        <NavTaxonomyChilds
          obj={item}
          value={item}
          {opencode}
          indent={indent + 1}
        />
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
