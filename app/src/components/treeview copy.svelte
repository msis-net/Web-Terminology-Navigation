<script>
  import TreeviewList from "./treeview_list.svelte";
  export let resdata = {};

  console.log("title", resdata.content);

  let title = "";
  let obj = {};
  let json = {};
  $: {
    title = resdata.title;
    obj = resdata;
  }

  function getObject(key) {
    json = obj[key];
    console.log("key", key, json);
  }
</script>

<hr />
<div>Title:{title}</div>
{#if obj}
  <ul class="text-[0.4em]">
    <!--#1-->
    {#each Object.keys(obj) as key}
      {#if typeof obj[key] == "object"}
        <button on:click={() => getObject(key)}>{key}:▼</button>
        <ul class="ml-2">
          <TreeviewList obj={json} />
        </ul>
      {:else}
        <li>{key}:"{obj[key]}"</li>
      {/if}
    {/each}
    <!--#1-->
  </ul>
{/if}

<div class="text-[0.6em] text-blue-600">T:{obj}</div>
