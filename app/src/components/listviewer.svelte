<script>
  import { onMount } from "svelte";
  import Listviewer from "./listviewer.svelte";
  export let obj;

  onMount(() => {
    console.log("Mounted!!");
  });
</script>

<ul class="text-[0.4em]">
  <!--#1-->
  {#each Object.keys(obj) as key}
    {#if typeof obj[key] == "object"}
      <li>{key}:▼</li>
      <ul class="ml-2">
        <Listviewer obj={obj[key]} />
      </ul>
    {:else}
      <li>{key}:"{obj[key]}"</li>
    {/if}
  {/each}
  <!--#1-->
</ul>
