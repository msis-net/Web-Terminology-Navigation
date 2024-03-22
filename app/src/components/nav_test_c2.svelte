<script>
  import { fade } from "svelte/transition";
  import { JsxFlags } from "typescript";
  import NavTest1 from "./nav_test1.svelte";

  export let resdata = {};

  console.log("title", resdata.content);

  let title = "";
  let obj = {};

  $: {
    title = resdata.title;
    obj = resdata;
  }
</script>

<hr />
<div>Title:{title}</div>
{#if obj}
  <NavTest1 {obj} />
{/if}

<div class="text-[0.6em] text-blue-600">T:{obj}</div>
