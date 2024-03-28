<script>
  import { tick } from "svelte";
  import { fade } from "svelte/transition";
  import { JsxFlags } from "typescript";
  import NavTest9Child from "./nav_test9_child.svelte";

  export let title = "";
  export let indent = 0;
  export let obj = {};
  let json = {};
  let concept = [];
  let arrowDown = false;
  $: {
    obj = obj;
  }

  async function eventObject(key) {
    console.log(json, Object.keys(json).length);
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
    await tick();
    console.log(json, Object.keys(json).length);
  }
</script>

<hr />
<!--div>{!title ? ["選択してください"] : title}</div-->
<button on:click={eventObject} class="ml-{indent} w-full text-left">
  <span class="arrow" class:arrowDown>&#x25b6</span>
  {obj["count"] ? `${obj["count"]}:` : ""}{title}:{indent}
</button>

{#if json}
  <ul class="">
    {#each Object.keys(json) as key}
      {@const item = json[key]}
      {#if typeof json[key] == "object"}
        <!--"concept"エレメントを無視して表示する場合-->
        {#if key !== "concept"}
          <ul class="ml-{indent + 1}">
            <NavTest9Child obj={json[key]} title={key} indent={indent + 1} />
          </ul>
        {/if}

        <!--"concept"エレメントを無視せず、１Stepとして表示する場合
        {#if json[key]["code"]}
          <NavTaxonomyChilds
            obj={json[key]}
            title={json[key]["display"]}
            {indent}
          />
        {:else}
          <ul class="ml-{indent + 1}">
            <NavTaxonomyChilds
              obj={json[key]}
              title={key}
              indent={indent + 1}
            />
          </ul>
        {/if}
        -->
      {:else}
        <li class="ml-{indent + 2}">{key}:"{json[key]}A"</li>
      {/if}
    {/each}
    <!--"concept"エレメント表示部分-->
    {#if concept}
      {#each concept as item, i}
        <NavTest9Child
          obj={item}
          title="{item['display']}D"
          indent={indent + 1}
        />
      {/each}
    {/if}
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
