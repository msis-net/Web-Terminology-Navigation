<script>
  import { tick } from "svelte";
  import SearchChilds from "./search_childs.svelte";
  export let previousChunk = undefined;
  export let nextChunk = undefined;
  export let addObject = undefined;
  export let chunkSize = 0;
  export const word = "";

  const maxRetryCountOnPreLoad = 20;
  const triggerRangeRatio = 0.01;

  let list = [];
  let list_swap = []; //表示内容の配列
  let list_buff = 2; //リストのバッファ
  let loadCount = 0;

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
    //console.log("loadPrevious:loading", loading);
    if (!previousChunk) return;

    const beforeScrollHeight = container.scrollHeight;
    const beforeScrollTop = container.scrollTop;
    //const prev = await previousChunk(list.length === 0 ? null : list[0]);

    const swap_index = list_swap.length - loadCount - 2;
    //console.log("loadPrevious",list_swap.length,list_swap,loadCount,swap_index)
    if (swap_index < 0) return;
    //console.log("loadPrevious:swap_index",swap_index, list_swap[swap_index]);
    //追加items：
    const items = await addObject(list_swap[swap_index]);
    //console.log("loadPrevious:items", items);
    //jsonの後列を省く
    //console.log("□loadPrevious:json", json.length,json);
    //console.log("□loadPrevious:list", list.length,list);
    json.splice(json.length - items.length, items.length);
    list.splice(list.length - items.length, items.length);
    list_swap.splice(list_swap.length - 1, 1);

    json = [...items, ...json];
    await tick();
    //console.log("□□loadPrevious:json", json.length,json);
    //console.log("□□loadPrevious:list", list.length,list);
    //console.log("□□loadPrevious:scrollTo", container.scrollHeight - beforeScrollHeight + beforeScrollTop);
    /*
    if (prev.length === 0) return;
    list = [...prev, ...list];
    await tick();
     */
    container.scrollTo(0, chunkSize);
  }

  /**
   * 下方向のデータをロードします。
   */
  async function loadNext() {
    //console.log("loadNext:loading", loading);
    if (!nextChunk) return;
    let beforeScrollTop = container.scrollTop;
    const next = await nextChunk(
      list.length === 0 ? null : list[list.length - 1]
    );
    if (next.length === 0) return;
    //console.log("loadNext:next", next);
    list_swap.push(next);
    list = [...list, ...next];
    //console.log("loadNext:list", list);

    //追加items：
    const items = await addObject(next);

    if (json.length > chunkSize * loadCount) {
      //console.log("▶▶▶json", json.length, json);
      json.splice(0, items.length);
      //console.log("▶▶▶tmp", tmp.length, tmp);
      beforeScrollTop = beforeScrollTop * 0.9;
    }

    json = [...json, ...items];
    await tick();

    //console.log("loadNext:items", items.length, json.length > items.length * 2);
    //console.log("■loadNext:json", json.length,json);
    //console.log("■loadNext:list", list.length,list,beforeScrollTop);
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
      //console.log("loadCount", loadCount);
    }
  }

  /**
   * スクロールの方向に応じてデータをロードします。
   */
  async function load() {
    if (!container) return;
    if (loading) return;
    loading = true;
    /*
    console.log(
      triggerRange,
      container.scrollHeight,
      container.clientHeight,
      container.scrollTop,
      container.clientHeight + container.scrollTop
    );
*/
    try {
      if (
        !!previousChunk &&
        //container.scrollTop <= triggerRange
        container.scrollTop === 0
      ) {
        await loadPrevious();
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
  {#key json}
    {#each json as value, i}
      <!--slot prop={value} {i} /-->
      <SearchChilds obj={value} {value} indent={1} />
    {/each}
  {/key}
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }
</style>
