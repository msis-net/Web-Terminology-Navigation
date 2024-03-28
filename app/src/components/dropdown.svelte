<script>
  import { t } from "@/lib/i18n/i18n";
  import {
    CodeSystem,
    Resuoces,
    SearchObj,
    Arguments,
    language,
    OpenTab,
  } from "./stores.js";
  import Search from "./search.svelte";
  import { readonly } from "svelte/store";

  let selectof = {};
  let count = 0;
  const onChange = () => {
    $Resuoces = {};
    $SearchObj = {};
    $Arguments = "";
    word = "";
    $OpenTab = 1;
    //console.log("selectof", selectof);
    $CodeSystem = selectof.id;
    const name = selectof.name;
    const path = selectof.path;
    const param = selectof.param;
    const url = path + param;
    //console.log("$CodeSystem ", $CodeSystem, url);
    //get_data(url);
    get_strage(url, name);
  };
  //通常のfetch処理：データ量無視
  async function get_strage(path, name) {
    console.log("path", path);
    await fetch(path) //読込
      .then((response) => response.json())
      .then((result) => {
        $Resuoces = result;
        count = $Resuoces["concept"].length;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function get_stream(path) {
    //console.log("path", path);
    await fetch(path) //読込
      //
      .then((response) => {
        count = +response.headers.get("Content-Length");

        return response.body;
      })
      .then((body) => {
        const reader = body.getReader();
        return new ReadableStream({
          start(controller) {
            //
            return pump();

            function pump() {
              return reader.read().then(({ done, value }) => {
                // データを消費する必要がなくなったら、ストリームを閉じます
                if (done) {
                  controller.close();
                  return;
                }
                console.log(value);
                // 次のデータチャンクを対象のストリームのキューに入れます
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      });
  }

  //通常のfetch処理：データ量無視
  async function get_data(path) {
    //console.log("path", path);
    await fetch(path) //読込
      .then((response) => response.json())
      .then((result) => {
        $Resuoces = result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const itemList = [
    {
      id: 1,
      store: "CodeSystem",
      name: "us-loinc-cs(JSON:Large)",
      path: "/tmpdata/",
      param: "CodeSystem-us-loinc-cs.json",
    },
    {
      id: 2,
      store: "CodeSystem",
      name: "us-loinc-cs(JSON:Normal)",
      path: "/tmpdata/",
      param: "CodeSystem-us-loinc-MIN.json",
    },
    {
      id: 2,
      store: "CodeSystem",
      name: "us-loinc-cs(JSON:Too BIG!)",
      path: "/tmpdata/",
      param: "CodeSystem-us-loinc-BIG.json",
    },
    {
      id: 3,
      store: "CodeSystem",
      name: "food-allergen(JSON)",
      path: "/tmpdata/",
      param: "CodeSystem-jp-jfagy-food-allergen-cs.json",
    },
    {
      id: 4,
      store: "CodeSystem",
      name: "ActCode(JSON)",
      path: "/tmpdata/",
      param: "CodeSystem-hl7-v3-ActCode-cs.json",
    },
    {
      id: 5,
      store: "CodeSystem(API)",
      name: "hapi.fhir.org(最近エラーになります。)",
      path: "https://hapi.fhir.org/baseR4/CodeSystem/",
      param: "50445",
    } /*,
    {
      id: 6,
      name: "点数マスタ(CSV)",
      path: "/tmpdata/",
      param: "tensu_20xx.csv",
    },
    {
      id: 6,
      name: "コメントデータ",
      path: "/tmpdata/",
      param: "comment_20xx.csv",
    },*/,
  ];
  //selectの初期値の設定
  let initval = selectof;

  let word = "";
  let searchData;
  //検索Popup
  let schpanel = "invisible";

  const SearchWord = () => {
    console.log("word", word);
    $SearchObj = {};
    let tmpConcept = [];
    if (word.length > 0) {
      $Arguments = word;
      let Arg = word.split(/[\s|,|、|　]/);
      //console.log("Arg", Arg, Arg.length);
      for (let i in $Resuoces["concept"]) {
        let tmpObj = $Resuoces["concept"][i];

        let schStr = JSON.stringify(tmpObj);
        for (let n in Arg) {
          const regex = new RegExp(Arg[n], "gi");
          const comparison = regex.test(schStr);
          if (comparison) {
            tmpConcept.push(tmpObj);
            //$OpenTab = 2;
            schpanel = "visible";
            break; //1つでも見つかったら登録して抜ける
          }
        }
      }
    }
    $SearchObj = tmpConcept;
  };
</script>

<div class="max-w-sm mx-auto mb-2">
  <div class="flex">
    <select
      id="countries"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md w-50% p-1"
      bind:value={selectof}
      on:change={onChange}
    >
      <option value={initval} disabled selected
        >{$t("common.navigate.select-00.label")}</option
      >
      {#each itemList as item}
        <option value={item}>{item.name}</option>
      {/each}
    </select>

    <div class="text-[0.8em] h-4 leading-4 m-2 p-1">
      Count:{count}
    </div>
    <button class="text-[0.8em] h-4 leading-4 m-2 p-1"></button>
  </div>
  <!--検索文字-->
  <div class="relative group mt-2">
    <input
      class="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-md p-1"
      placeholder={selectof == initval
        ? $t("common.navigate.select-00.label")
        : $t("common.navigate.SearchWord")}
      readonly={selectof == initval ? true : false}
      bind:value={word}
      on:keydown={(e) => {
        if (e.key === "Enter") {
          SearchWord();
        }
      }}
    />
    <div
      class="{schpanel} opacity-100 absolute w-full bg-white text-gray-800 border border-gray-300 rounded-md shadow-lg z-10 overflow-y-auto max-h-[500px]"
    >
      <header class="h-6">
        <ul class="mx-2 absolute right-0">
          <li>
            <button
              class="text-gray-500 text-[1.2em]"
              on:click={() => (schpanel = "invisible")}>×</button
            >
          </li>
        </ul>
      </header>
      <div>
        <Search {word} />
      </div>
    </div>
    <!--
<div
      class="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute w-48 mt-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg py-2 z-10"
    >
      <p class="px-4 py-2">This is a popover component.</p>
      <p class="px-4 py-2">You can customize it with your content.</p>
    </div>
    -->
  </div>
</div>
