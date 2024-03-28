<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { JsxFlags } from "typescript";
  import NavTest2List from "./nav_test2_list.svelte";

  export let resdata = {};

  console.log("title", resdata.content);

  let title = "";
  let indent = 0;
  let obj = {};
  let json = {};
  $: {
    title = resdata.title;
    obj = resdata;
    json = obj;
  }

  function eventObject(key) {
    //console.log(json, Object.keys(json).length);
    if (Object.keys(json).length == 0) {
      json = obj;
    } else {
      json = {};
    }
    //console.log(json, Object.keys(json).length);
  }

  const addObject = () => {
    if (Object.keys(json).length == 0) {
      json = obj;
    } else {
      json = {};
    }
  };

  const childObj = (obj) => {
    //console.log(obj);
    return obj;
  };
</script>

<hr />
<!--div>{!title ? ["選択してください"] : title}</div-->
<button on:click={addObject} class="text-left"
  >{!title ? ["選択してください"] : title}</button
>

{#if Object.keys(json).length > 0}
  <ul class="text-[0.8em]">
    {#each Object.keys(json) as key}
      {#if typeof json[key] == "object"}
        <li>
          <NavTest2List obj={json[key]} title={key} indent={indent + 1} />
        </li>
      {:else}
        <li>{key}:"{json[key]}"</li>
      {/if}
    {/each}
  </ul>
{/if}

<!--
{#if Object.keys(obj).length > 0}
  <div class="text-[0.6em] text-blue-600">T:{obj}</div>
{/if}
-->
