<script>
  import { t } from "@/lib/i18n/i18n";
  import { Resuoces } from "../stores.js";
  import NavTest7List from "./nav_test7_list.svelte";

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
        chunkSize = 100;
        MAX = concept.length;
      } else {
        concept = {};
      }

      //console.log("concept", MAX, chunkSize, concept);
    } else {
      title = $t("common.navigate.select-00.label");
      concept = {};
    }
  }

  const getEndOfArray = (array) => array[array.length - 1];

  function previousChunk(lastValue) {
    const _last = lastValue ?? initialValue + 1;
    //console.log("previousChunk", _last, MIN, chunkSize);
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
    console.log("▶nextChunk:", _last, lastValue, MAX, chunkSize, initialValue);
    if (MAX <= _last) return [];
    let array = [];
    for (let i = 0; i < chunkSize; i++) {
      //
      let index = _last + (i + 1);
      if (index < concept.length) array.push(_last + (i + 1));
      if (MAX <= getEndOfArray(array)) return array;
    }
    console.log("nextChunk#66:", array);
    return array;
  }

  function addObject(array) {
    console.log("addObj", array);
    if (!array) return [];
    let items = [];

    array.forEach(function (i) {
      let temp = concept[i];
      temp["no"] = i + 1;
      items.push(temp);
    });
    //console.log("items", items);
    return items;
  }
</script>

<div class="numbers h-full text-[0.8em] bg-none p-0">
  <!--
   {#key}は指定した値が変わったときにブロック内の要素も更新
  -->
  {#key concept}
    <NavTest7List
      {nextChunk}
      {previousChunk}
      {addObject}
      {chunkSize}
      let:prop={value}
    >
      <div class="row" style:background-color={`hsl(${value},90%,80%)`}>
        {value.no}:{value.code}
      </div>
    </NavTest7List>
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
