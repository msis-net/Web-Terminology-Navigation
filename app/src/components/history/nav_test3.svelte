<!--
  
-->
<script>
  import { onMount, afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import { JsxFlags } from "typescript";
  import { db } from "@/lib/db";

  export let resdata = {};

  console.log("title", resdata.content);

  let limit = 100; // 一度に読み込むアイテムの数
  let start = 0; //開始位置

  let title = "";
  let indent = 0;
  let obj = {};
  let json = [];
  $: {
    title = resdata.title;
    obj = resdata;
    json = json;
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

  const addObject = () => {
    if (Object.keys(json).length == 0) {
      json = obj;
    } else {
      json = {};
    }
  };

  const checkJson = () => {
    console.log(json);
  };

  async function addDatabase() {
    try {
      const concept = obj["concept"];
      const max = concept.length;

      console.log("max", max);

      //Promiseで利用する配列を作成
      const targets = [];
      while (true) {
        start = Math.min((start += limit), max);
        targets.push(start);
        if (start >= max) break;
      }
      start = 0; //開始位置を初期化
      console.log("targets:", targets, start);

      Promise.all(
        targets.map((target) => {
          try {
            console.log("tmp:", start, target);
            let tmpobj = concept.slice(start, target);
            start += tmpobj.length;
            console.log("tmpobj", tmpobj);
            json = [...json, tmpobj];
            //Object.assign(json, tmpobj);
            return tmpobj.json();
          } catch (e) {
            console.log(e);
          }
        })
      ).then((results) => {
        console.log("result", results);
        console.log("json", json);
        //json = result;
      });

      /*
      arg.forEach((v) => {
        console.log(">", v);
      });
      */
      /*
      arg.map((v) => {
        console.log(">", v);
      });
*/
      /*
      for (let i in arg) {
        console.log(i, arg[i]);
        const id = await db.CodeSystem.add({
          key: i,
          value: arg[i],
        });
      }
      */
    } catch (error) {
      //console.log(error);
    }
  }

  afterUpdate(() => {
    console.log("afterUpdate!");
    // 画面の水平方向のスクロール位置を取得
    var x = window.scrollX;
    console.log(x); // 300  // 画面の垂直方向のスクロール位置を取得
    var y = window.scrollY;
    console.log(y); // 150
  });
  onMount(() => {
    console.log("onMount!");
  });
</script>

<button on:click={addDatabase} class="text-left"
  >{!title ? ["選択してください"] : title + "←クリックで開始"}</button
><br />

<div>count:{start}</div>
<!--
{#each Object.keys(json) as key}
  <li>{key}:"{json[key]}"</li>
{/each}
-->
{#if json}
  <ul class="text-[0.4em]">
    {#each json as key, i}
      {#each json[i] as item, i2}
        <li>{i * 100 + i2}:{item.code}</li>
      {/each}
    {/each}
  </ul>
{/if}
<!--
{#if Object.keys(obj).length > 0}
  <div class="text-[0.6em] text-blue-600">T:{obj}</div>
{/if}
-->
