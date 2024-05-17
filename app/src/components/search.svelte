<script lang="ts">
  import { t } from "@/lib/i18n/i18n";
  import { SearchObj } from "@/lib/stores";
  import SearchList from "./search_list.svelte";
  export const word = "";
  let title = $t("common.navigate.select-00.label");
  let concept: any = [];

  let MIN = 0;
  let MAX = 0;
  let chunkSize = 0;

  let initialValue = 0;

  $: {
    if ($SearchObj) {
      if ($SearchObj.id) {
        title = $SearchObj.id;
      } else {
        title = "";
      }

      if ($SearchObj.length > 0) {
        concept = $SearchObj;
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
    //console.log("addObj", array);
    if (!array) return [];
    let items: any = [];

    array.forEach(function (i: number) {
      let temp = concept[i];
      //CodeSystem.countを連番として追加
      //https://hl7.org/fhir/R4/codesystem-definitions.html#CodeSystem.count
      temp["count"] = i + 1;
      items.push(temp);
    });
    //console.log("items", items);
    if (Object.keys(items).length === 0) return;

    return items;
  }
</script>

<div class="numbers h-full text-[0.8em] bg-none p-0">
  <!--
   {#key}は指定した値が変わったときにブロック内の要素も更新
  -->
  {#key concept}
    <SearchList {nextChunk} {previousChunk} {addObject} {chunkSize} />
  {/key}
</div>

<style>
  .numbers {
    border: solid 0px;
    box-sizing: border-box;
    border-radius: 0px;
  }
</style>
