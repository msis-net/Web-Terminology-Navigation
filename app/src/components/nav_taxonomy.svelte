<script lang="ts">
  import { t } from "@/lib/i18n/i18n";
  import { Resuoces } from "@/lib/stores";
  import NavTaxonomyList from "./nav_taxonomy_list.svelte";

  let title = $t("common.navigate.select-00.label");
  let concept: any = [];

  let MIN = 0;
  let MAX = 0;
  let chunkSize = 0;

  let initialValue = 0;

  $: {
    if ($Resuoces) {
      if ($Resuoces.id) {
        title = $Resuoces.id;
      } else {
        title = "";
      }

      if ($Resuoces.concept) {
        concept = $Resuoces.concept;
        chunkSize = 100;

        MAX = concept.length;
      } else {
        concept = {};
      }
    } else {
      title = "";
      concept = {};
    }
  }

  const getEndOfArray = (array: any) => array[array.length - 1];

  function previousChunk(lastValue: number) {
    const _last = lastValue ?? initialValue + 1;
    if (_last <= MIN) return [];
    let array = [];
    for (let i = 0; i < chunkSize; i++) {
      array.push(_last - (i + 1));
      if (getEndOfArray(array) <= MIN) return array.reverse();
    }
    return array.reverse();
  }

  function nextChunk(lastValue: number) {
    const _last = lastValue ?? initialValue - 1;
    if (MAX <= _last) return [];
    let array = [];
    for (let i = 0; i < chunkSize; i++) {
      //
      let index = _last + (i + 1);
      if (index < concept.length) array.push(_last + (i + 1));
      if (MAX <= getEndOfArray(array)) return array;
    }
    return array;
  }

  function addObject(array: any) {
    if (!array) return [];
    let items: any = [];

    array.forEach(function (i: number) {
      let temp = concept[i];
      temp["count"] = i + 1;
      items.push(temp);
    });
    return items;
  }
</script>

<div class="hidden">{title}</div>
<div class="numbers h-full text-[0.8em] bg-none p-1">
  <!--
   {#key}は指定した値が変わったときにブロック内の要素も更新
  -->
  {#key concept}
    <NavTaxonomyList {nextChunk} {previousChunk} {addObject} {chunkSize} />
  {/key}
</div>

<style>
  .numbers {
    border: solid 0px;
    box-sizing: border-box;
    border-radius: 0px;
  }
</style>
