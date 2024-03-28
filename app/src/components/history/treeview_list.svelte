<script>
  import { onMount } from "svelte";
  import { afterUpdate } from "svelte";
  import TreeviewList from "./treeview_list.svelte";
  import Bigdata from "./bigdata.svelte";

  export let obj;
  $: json = {};
  let loadedItems = [];
  let count = {};
  let counter = 0;
  const limit = 5; // 一度に読み込むアイテムの数

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
        store[key] = obj[key]; //objectを持つ要素はstoreに待機させる。
        const keys_childs = Object.keys(obj[key]);
        //console.log("keys_childs", keys_childs);
        let child = { key: obj[key]["code"] };
        json[key] = child;
      } else {
        //keyとvalue
        json[key] = obj[key];
      }
    }
  });

  //クリックイベントによって該当エレメントをstoreから取得して埋め込む
  function getObject(key) {
    console.log(json[key], Object.keys(json[key]).length);
    json[key] = store[key];
    json = json;
  }
  function delObject(key) {
    json[key] = {};
    json = json;
    console.log(json[key], Object.keys(json[key]).length);
  }
</script>

<!--#1-->

{#each Object.keys(json) as key}
  {#if typeof json[key] == "object"}
    <button on:click={getObject(key)}
      ><span class="arrow">&#x25b6</span>{key}:{json[key]["key"]}</button
    >
    <button on:click={delObject(key)}
      ><span class="arrow">&#x25b6</span>DELE</button
    >
    <ul class="ml-2">
      {#if Object.keys(obj).length > 0}
        <TreeviewList obj={json[key]} />
      {/if}
    </ul>
  {:else}
    <li>{key}:"{json[key]}"</li>
  {/if}
{/each}
<!--#1-->
