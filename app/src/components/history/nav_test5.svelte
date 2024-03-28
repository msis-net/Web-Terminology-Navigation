<script>
  import { t } from "@/lib/i18n/i18n";
  import NavTest5Scroll from "./nav_test5_scroll.svelte";
  import { Resuoces } from "../stores.js";

  let title = $t("common.navigate.select-00.label");
  let concept = [];

  let MIN = 0;
  let MAX = 0;
  let chunkSize = 0;

  let initialValue = 0;

  $: inputValue = initialValue;
  $: {
    if (initialValue < MIN) initialValue = MIN;
    if (MAX < initialValue) initialValue = MAX;
    if ($Resuoces) {
      if ($Resuoces.id) {
        title = $Resuoces.id;
      } else {
        title = $t("common.navigate.select-00.label");
      }

      if ($Resuoces.concept) {
        concept = $Resuoces.concept;
        chunkSize = 20;
        MAX = concept.length;
      } else {
        concept = {};
      }

      console.log("concept", MAX, chunkSize, concept);
    } else {
      title = $t("common.navigate.select-00.label");
      concept = {};
    }
  }

  const getEndOfArray = (array) => array[array.length - 1];

  function previousChunk(lastValue) {
    const _last = lastValue ?? initialValue + 1;
    console.log("previousChunk", _last, MIN, chunkSize);
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
    console.log("nextChunkx", _last, MAX, chunkSize);
    if (MAX <= _last) return [];
    let array = [];
    for (let i = 0; i < chunkSize; i++) {
      //
      let index = _last + (i + 1);
      if (index < concept.length) array.push(_last + (i + 1));
      if (MAX <= getEndOfArray(array)) return array;
    }
    console.log("nextChunk", array);
    return array;
  }

  function addObject(array) {
    console.log("addObj", array);
    if (!array) return [];
    let items = [];
    for (let i in array) {
    }
    array.forEach(function (i) {
      items.push(concept[i]);
    });
    console.log("items", items);
    return items;
  }
</script>

<div class="numbers h-full text-[0.8em] bg-none p-0">
  <!--
   {#key}は指定した値が変わったときにブロック内の要素も更新
  -->
  {#key concept}
    <NavTest5Scroll
      {nextChunk}
      {previousChunk}
      {addObject}
      let:prop={value}
      let:id
    >
      <div class="row" style:background-color={`hsl(${value},90%,80%)`}>
        {id}:{value}
      </div>
    </NavTest5Scroll>
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
