<script>
  import { fade } from "svelte/transition";
  import { JsxFlags } from "typescript";
  import TreeviewList from "./treeview_list.svelte";

  export let resdata = {};

  console.log("title", resdata.content);

  let title = "";
  let obj = {};
  let json = {};
  $: {
    title = resdata.title;
    obj = resdata;
    json = obj;
  }

  function eventObject(key) {
    console.log(json, Object.keys(json).length);
    if (Object.keys(json).length == 0) {
      json = obj;
    } else {
      json = {};
    }
    console.log(json, Object.keys(json).length);
  }
</script>

<hr />
<div>Title:{title}</div>
<button on:click={eventObject}>TEST</button>
{#if Object.keys(json).length > 0}
  <ul class="text-[0.4em]">
    <TreeviewList obj={json} />
  </ul>
{/if}

<!--
{#if Object.keys(obj).length > 0}
  <div class="text-[0.6em] text-blue-600">T:{obj}</div>
{/if}
-->
