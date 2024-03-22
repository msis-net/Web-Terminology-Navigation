<script>
  import { fade } from "svelte/transition";
  import { JsxFlags } from "typescript";
  import TreeviewList from "./treeview_list.svelte";

  export let resdata = {};

  console.log("title", resdata.content);

  let title = "";
  let obj = {};

  $: {
    title = resdata.title;
    obj = resdata["concept"];
  }
</script>

<div>Title:{title}</div>
{#if obj}
  <ul class="text-[0.4em]">
    <TreeviewList {obj} />
  </ul>
{/if}
<!--
<div class="text-[0.6em] text-blue-600">T:{obj}</div>
-->
