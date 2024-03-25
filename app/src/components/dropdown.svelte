<script>
  import { t } from "@/lib/i18n/i18n";
  import {
    CodeSystem,
    Resuoces,
    language,
    OpenTab,
    SearchObj,
  } from "./stores.js";
  import { readonly } from "svelte/store";

  let selectof = {};
  let count = 0;
  const onChange = () => {
    $OpenTab = 1;
    $Resuoces = "";
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
      name: "hapi.fhir.org",
      path: "https://hapi.fhir.org/baseR4/CodeSystem/",
      param: "50445",
    },
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
    },
  ];
  //selectの初期値の設定
  let initval = selectof;

  let word = "";

  function SearchWord() {
    console.log("word", word);
    if (!word) return;
    //$Resuoces = {};
    // toggleTabs("2", "Search");

    try {
      const items = $Resuoces["concept"];
      let concept = [];
      for (let item in items) {
        console.log(item, items[item]);
        let tmp1 = items[item];
        let keys = Object.keys(tmp1);
        keys.forEach((key) => {
          let tmp2 = tmp1[key];

          if (typeof tmp2 == "object") {
          } else {
            console.log("key", key, tmp2);
            let value = tmp2;
            if (typeof tmp2 !== "text") {
              value = tmp2.toString();
            }
            try {
              let reg = new RegExp(word, "g");
              let result = value.match(reg);
              if (result) {
                let newStr = value.replace(reg, "<b>" + word + "</b>");
                console.log("indexOf:", word, key, newStr);
              }
              //console.log("value", value);
            } catch (e) {
              console.error(e);
            }
          }
        });
        $OpenTab = 2;
      }
      console.log("concept:", concept);
      $SearchObj = $Resuoces;
      console.log("$SearchObj:", $SearchObj);
      console.log("$OpenTab:", $OpenTab);
    } catch (e) {
      console.error(e);
    }
  }

  function ChekConceptElements(word) {}
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

  <div class="mt-2">
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
  </div>
</div>
