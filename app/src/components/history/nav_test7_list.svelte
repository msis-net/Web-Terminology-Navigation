<script>
  import { tick } from "svelte";

  export let previousChunk = undefined;
  export let nextChunk = undefined;
  export let addObject = undefined;
  export let chunkSize = 0;

  const maxRetryCountOnPreLoad = 20;
  const triggerRangeRatio = 0.01;

  let list = [];
  let json = []; //追加
  let container;
  let clientHeight = 0;
  let loading = false;
  $: triggerRange = clientHeight * triggerRangeRatio;
  $: chunkSize = chunkSize;
  /**
   * 上方向のデータをロードします。
   */
  async function loadPrevious() {
    if (!previousChunk) return;
    const beforeScrollHeight = container.scrollHeight;
    const beforeScrollTop = container.scrollTop;
    const prev = await previousChunk(list.length === 0 ? null : list[0]);
    if (prev.length === 0) return;
    list = [...prev, ...list];
    await tick();
    container.scrollTo(
      0,
      container.scrollHeight - beforeScrollHeight + beforeScrollTop
    );
  }

  /**
   * 下方向のデータをロードします。
   */
  async function loadNext() {
    console.log("loadNext:loading", loading);
    if (!nextChunk) return;
    let beforeScrollTop = container.scrollTop;
    const next = await nextChunk(
      list.length === 0 ? null : list[list.length - 1]
    );
    if (next.length === 0) return;
    //console.log("loadNext:next", next);
    list = [...list, ...next];
    //console.log("loadNext:list", list);

    //追加items：
    const items = await addObject(next);
    console.log(
      "▶▶loadNext:loading",
      json.length > chunkSize * 2,
      json.length,
      items.length
    );
    if (json.length > chunkSize * 2) {
      //console.log("▶▶▶json", json.length, json);
      let tmp = json.splice(0, chunkSize);
      //console.log("▶▶▶tmp", tmp.length, tmp);
      beforeScrollTop = beforeScrollTop * 0.9;
    }

    json = [...json, ...items];
    await tick();

    console.log("loadNext:items", items.length, json.length > items.length * 2);
    console.log("loadNext:json", json.length);

    container.scrollTo(0, beforeScrollTop);
  }

  /**
   * スクロールバーが表示されるまでロードします。
   */
  async function preLoad() {
    if (!container) return;
    if (loading) return;
    loading = true;
    try {
      const loadInternal = async (loadFunc) => {
        let loadCount = 0;
        while (
          loadCount === 0 ||
          container.scrollHeight <= container.clientHeight
        ) {
          loadCount++;
          await loadFunc();
          if (list.length === 0) return;
          await tick();
          if (maxRetryCountOnPreLoad < loadCount) {
            break;
          }
        }
      };
      await loadInternal(loadNext);
      await tick();
      //await loadInternal(loadPrevious);
      //await tick();
    } finally {
      loading = false;
    }
  }

  /**
   * スクロールの方向に応じてデータをロードします。
   */
  async function load() {
    if (!container) return;
    if (loading) return;
    loading = true;

    console.log(
      triggerRange,
      container.scrollHeight,
      container.clientHeight + container.scrollTop
    );

    try {
      if (!!previousChunk && container.scrollTop <= triggerRange) {
        //await loadPrevious();
      } else if (
        !!nextChunk &&
        // container.scrollHeight <=
        //  container.clientHeight + container.scrollTop + triggerRange
        container.scrollTop >=
          container.scrollHeight - container.clientHeight - triggerRange
      ) {
        await loadNext();
      }
    } finally {
      loading = false;
    }
  }

  async function init() {
    list = [];
    await tick();
    await preLoad();
    /*テスト:全読込:上のawait preLoad()をコメントアウト
    let counter = 1701;
    for (let i = 0; i < counter; i++) {
      console.log(i + "/" + counter);
      await loadNext();
      await tick();
    }*/
  }

  init();

  //画面リサイズ：縦方向拡大でスクロールバーが消えた時
  let innerHeight = window.innerHeight;
  async function reSize() {
    //console.log(container.scrollHeight, container.clientHeight);
    if (container.scrollHeight <= container.clientHeight) {
      loadNext();
    }
  }
</script>

<svelte:window bind:innerHeight on:resize={reSize} />

<div class="container" bind:clientHeight bind:this={container} on:scroll={load}>
  {#each json as value, i}
    <slot prop={value} {i} />
  {/each}
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }
</style>
