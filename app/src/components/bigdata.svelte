<script>
  import { onMount } from "svelte";
  let items = []; // データを格納する配列
  let loadedItems = []; // 表示するために読み込まれたアイテム
  let canLoadMore = true; // 追加のデータを読み込むことができるかどうか
  const limit = 10; // 一度に読み込むアイテムの数

  // データをフェッチする関数
  async function fetchData() {
    const response = await fetch("/tmpdata/test.json");
    items = await response.json();
    //console.log("#1:items", items);
    loadMore(); // 初期データの読み込み
  }

  // アイテムを追加で読み込む関数
  function loadMore() {
    console.log("#2:items");
    const nextItems = items.slice(
      loadedItems.length,
      loadedItems.length + limit
    );
    console.log("loadedItems", loadedItems.length, loadedItems.length + limit);
    console.log("loadedItems", loadedItems);

    //console.log("nextItems", nextItems);

    loadedItems = [...loadedItems, ...nextItems];
    //console.log("loadedItems", loadedItems);
    if (loadedItems.length >= items.length) {
      canLoadMore = false; // 全てのアイテムが読み込まれた
    }
  }

  // スクロールを検出してデータを追加で読み込むためのObserverを設定
  onMount(() => {
    fetchData();
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && canLoadMore) {
          loadMore();
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    );
    observer.observe(document.getElementById("loadingIndicator"));
  });
</script>

<div>
  <div>SIZE:{Object.keys(loadedItems).length}</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  <div>a</div>
  {#each loadedItems as item}
    <div>{item}X</div>
  {/each}
</div>

<!-- ローディングインジケーター -->
{#if canLoadMore}
  <div id="loadingIndicator" style="text-align: center;">Loading more...</div>
{/if}
