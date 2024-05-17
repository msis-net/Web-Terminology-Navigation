<script lang="ts">
  import { tick } from "svelte";
  import NavTaxonomyChilds from "@/components/nav_taxonomy_childs.svelte";
  export let previousChunk: (lastValue: number) => number[];
  export let nextChunk: (lastValue: number) => number[];
  export let addObject: (array: number[]) => any[];
  export let chunkSize: number = 0;

  const maxRetryCountOnPreLoad = 5;
  const triggerRangeRatio = 0.01;

  let list: number[] = [];
  let list_swap: number[] = []; // 表示内容の配列

  let loadCount = 0; //Scrollが表示されている場合は「１」以上

  let json: any[] = [];
  let container: any;
  let clientHeight = 0;

  let loading = false;
  $: triggerRange = clientHeight * triggerRangeRatio;

  async function mvScroll(y: number) {
    //container.scrollTo(0, num);
    loadCount = 0;
    await preLoad();
    const { top } = container.getBoundingClientRect();

    if (loadCount > 0) {
      //現在位置(container.scrollTop )からの差分(y)が目標位置:178は親オブジェクト
      container.scrollTo(0, container.scrollTop + y - top);
    }
  }
  /**
   * 上方向のデータをロードします。
   */
  async function loadPrevious() {
    if (!previousChunk) return;
    const swap_index = list_swap.length - loadCount - 2;
    if (swap_index < 0) return;
    //追加items：
    const items = await addObject([list_swap[swap_index]]);

    json.splice(json.length - items.length, items.length);
    list.splice(list.length - items.length, items.length);
    list_swap.splice(list_swap.length - 1, 1);

    json: [] = [...items, ...json];
    await tick();

    container.scrollTo(0, chunkSize);
  }

  /**
   * 下方向のデータをロードします。
   */
  async function loadNext() {
    if (!nextChunk) return;
    let beforeScrollTop = container.scrollTop;
    const next: number[] = await nextChunk(list[list.length - 1]);
    if (next.length === 0) return;
    list_swap = [...list_swap, ...next];
    list = [...list, ...next];
    //追加items：
    const items = await addObject(next);

    if (json.length > chunkSize * loadCount) {
      json.splice(0, items.length);
      beforeScrollTop = beforeScrollTop * 0.9;
    }

    json = [...json, ...items];
    await tick();

    container.scrollTo(0, beforeScrollTop);
  }

  /**
   * スクロールバーが表示されるまでロードします。
   */
  async function preLoad() {
    if (!container) return;
    if (loading) return;
    loading = true;
    //console.log("loadCount", loadCount, maxRetryCountOnPreLoad);
    try {
      const loadInternal = async (loadFunc: any) => {
        while (
          loadCount === 0 ||
          container.scrollHeight <= container.clientHeight
        ) {
          loadCount++;
          await loadFunc();
          if (list.length === 0) return;
          await tick();
          if (maxRetryCountOnPreLoad < loadCount) {
            loadCount = 0; //リトライのみでbreakした場合はScrollが表示されない
            break;
          }
        }
      };
      await loadInternal(loadNext);
      await tick();
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

    try {
      if (
        !!previousChunk &&
        //container.scrollTop <= triggerRange
        container.scrollTop === 0
      ) {
        await loadPrevious();
      } else if (
        !!nextChunk &&
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
    await tick(); //DOM更新が完了を待つ
    await preLoad(); //初期動作を実行する。
  }

  init();

  //画面リサイズ：縦方向拡大でスクロールバーが消えた時、次候補がある場合は読込を追加
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
    {#each json as value}
      <!--slot prop={value} {i} /-->
      <NavTaxonomyChilds obj={value} indent={1} {mvScroll} />
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
