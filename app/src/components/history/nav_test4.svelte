<script>
  import DynamicScroll from "./DynamicScroll.svelte";
  import NavTest4Scroll from "./nav_test4_scroll.svelte";
  const MIN = 0;
  const MAX = 1000;
  const chunkSize = 10;
  let initialValue = 0;
  $: inputValue = initialValue;

  $: {
    if (initialValue < MIN) initialValue = MIN;
    if (MAX < initialValue) initialValue = MAX;
  }

  const getEndOfArray = (array) => array[array.length - 1];

  function previousChunk(lastValue) {
    const _last = lastValue ?? initialValue + 1;
    if (_last <= MIN) return [];
    let array = [];
    for (let i = 0; i < chunkSize; i++) {
      array.push(_last - (i + 1));
      if (getEndOfArray(array) <= MIN) return array.reverse();
    }
    return array.reverse();
  }

  function nextChunk(lastValue) {
    const _last = lastValue ?? initialValue - 1;
    if (MAX <= _last) return [];
    let array = [];
    for (let i = 0; i < chunkSize; i++) {
      array.push(_last + (i + 1));
      if (MAX <= getEndOfArray(array)) return array;
    }
    console.log("nextChunk", array);
    return array;
  }
</script>

<div class="numbers h-full text-[0.8em] bg-slate-400 p-0">
  {#key initialValue}
    <NavTest4Scroll {nextChunk} {previousChunk} let:prop={value}>
      <div class="row" style:background-color={`hsl(${value},90%,80%)`}>
        {value}
      </div>
    </NavTest4Scroll>
  {/key}
</div>

<style>
  .numbers {
    border: solid 0px;
    box-sizing: border-box;
    border-radius: 0px;
  }
  .row {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    /*height: 20px;*/
    width: 100%;
    /*padding: 0px;*/
    box-sizing: border-box;
    /* text-align: center;*/
  }
</style>
