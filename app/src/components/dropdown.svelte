<script lang="ts">
  import { t } from "@/lib/i18n/i18n";
  import {
    CodeSystem,
    Resuoces,
    SearchObj,
    SearchStr,
    Concept,
    OpenTab,
    schpanel,
    Openkey,
  } from "@/lib/stores";
  import Search from "./search.svelte";

  type listtype = {
    id: number;
    store: string;
    name: string;
    path: string;
    param: string;
  };

  let selectof: listtype;
  let count = 0;
  let SearchResult = "";

  const objInit = () => {
    $Resuoces = {};
    $SearchObj = {};
    $Concept = [];
    $Openkey = "";
    word = "";
    $OpenTab = 1;
    $schpanel = "invisible";
  };

  const onChange = () => {
    objInit();
    $CodeSystem = selectof.id;

    const path = selectof.path;
    const param = selectof.param;
    const url = path + param;
    get_strage(url);
  };

  //通常のfetch処理：データ量無視
  async function get_strage(path: string) {
    await fetch(path) //読込
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        $Resuoces = result;
        count = $Resuoces["concept"].length;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /*
  async function get_stream(path: string) {
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
  */
  /*
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
  */
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
      name: "hapi.fhir.org",
      path: "https://hapi.fhir.org/baseR4/CodeSystem/",
      param: "102716",
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
  let initval = itemList[0];

  let word = "";
  //検索Popup

  const SearchWord = () => {
    $SearchObj = {};
    let tmpConcept = [];
    let schcount = 0;
    if (word.length > 0) {
      let Arg = word.split(/[\s|,|、|　]/);
      $SearchStr = word;
      for (let i in $Resuoces["concept"]) {
        let tmpObj = $Resuoces["concept"][i];

        let schStr = JSON.stringify(tmpObj);
        for (let n in Arg) {
          const regex = new RegExp(Arg[n], "gi");
          const comparison = regex.test(schStr);
          if (comparison) {
            tmpConcept.push(tmpObj);
            const matches = schStr.match(regex);
            if (matches) {
              schcount += matches.length;
            }
            break; //1つでも見つかったら登録して抜ける
          }
        }
      }
    }

    if (Object.keys(tmpConcept).length === 0) {
      SearchResult = $t("common.navigate.NoResults");
    } else {
      //SearchResult = tmpConcept.length + " " + $t("common.navigate.BeResults");
      $SearchObj = tmpConcept;

      SearchResult = $t("common.navigate.Result") + ":" + schcount;
    }
    $schpanel = "visible";
  };
</script>

<div class="max-w-sm mx-auto mb-2 ml-0">
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
      Count:{count.toLocaleString()}
    </div>
    <button class="text-[0.8em] h-4 leading-4 m-2 p-1"></button>
  </div>
  <!--文字列検索-->
  <div class="relative group mt-2">
    <input
      class="w-full border border-gray-300 text-gray-900 text-sm rounded-md p-2"
      placeholder={selectof == initval
        ? $t("common.navigate.select-00.label")
        : $t("common.navigate.SearchWord")}
      readonly={count == 0 ? true : false}
      bind:value={word}
      on:keydown={(e) => {
        if (e.key === "Enter") {
          SearchWord();
        }
      }}
      disabled={count == 0 ? true : false}
    />
    <div
      class="{$schpanel} p-2 opacity-100 absolute w-full bg-yellow-50 text-gray-800 border border-gray-300 rounded-md shadow-lg z-10 overflow-y-auto max-h-[500px]"
    >
      <header class="h-7">
        <div class="mx-2 flex text-[1.0em] text-gray-500">
          <div>{SearchResult}</div>
          <button
            class=" text-[1.2em] ml-auto"
            on:click={() => ($schpanel = "invisible")}>x</button
          >
        </div>
      </header>
      <div>
        <Search />
      </div>
    </div>
  </div>
</div>
