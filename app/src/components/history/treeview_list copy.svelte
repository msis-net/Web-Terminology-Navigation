<script>
  import { onMount } from "svelte";
  import { afterUpdate } from "svelte";
  import TreeviewList from "./treeview_list.svelte";
  export let obj;
  let json = {};
  let store = {};
  const limit = 100; // 一度に読み込むアイテムの数

  onMount(() => {
    //console.log("Mounted!!");
  });
  afterUpdate(() => {
    //console.log("Updated!!");
    const keys = Object.keys(obj);
    for (let i in keys) {
      //console.log(obj[i], typeof obj[i]);
      let key = keys[i];
      if (typeof obj[key] === "object") {
        //objectを持つ要素はstoreに待機させる。
        store[key] = obj[key];
        json[key] = {};
      } else {
        //keyとvalue
        json[key] = obj[key];
      }
    }
  });

  //クリックイベントによって該当エレメントをstoreから取得して埋め込む
  function getObject(key) {
    console.log(key, json[key]);
    json[key] = store[key];
  }
</script>

<ul class="text-[0.4em]">
  <!--#1-->
  {#each Object.keys(json) as key}
    {#if typeof json[key] == "object"}
      <button on:click={getObject(key)}>{key}:▼</button>
      <ul class="ml-2">
        <TreeviewList obj={json[key]} />
      </ul>
    {:else}
      <li>{key}:"{json[key]}"</li>
    {/if}
  {/each}
  <!--#1-->
</ul>
