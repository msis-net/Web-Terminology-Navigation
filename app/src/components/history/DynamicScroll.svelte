<script>
  import { tick } from "svelte";

  export let previousChunk = undefined;
  export let nextChunk = undefined;

  const maxRetryCountOnPreLoad = 20;
  const triggerRangeRatio = 0.1;

  let list = [];
  let container;
  let clientHeight = 0;
  let loading = false;
  $: triggerRange = clientHeight * triggerRangeRatio;

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
    if (!nextChunk) return;
    const beforeScrollTop = container.scrollTop;
    const next = await nextChunk(
      list.length === 0 ? null : list[list.length - 1]
    );
    if (next.length === 0) return;
    list = [...list, ...next];
    console.log("length", list.length);
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
      await loadInternal(loadPrevious);
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
      if (!!previousChunk && container.scrollTop <= triggerRange) {
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
    await tick();
    await preLoad();
  }

  init();
</script>

<div class="container" bind:clientHeight bind:this={container} on:scroll={load}>
  {#each list as value (value)}
    <slot prop={value} />
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
