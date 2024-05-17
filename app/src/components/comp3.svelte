<script lang="ts">
  import { loadTranslations } from "@/lib/i18n/i18n";
  import { language } from "@/lib/stores.js";
  export let label;
  loadTranslations($language, "/");
</script>

<main class="">{label}</main>

<div
  class="grid grid-cols-2 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-2 gap-y-1"
>
  <div class="relative text-gray-400">
    これはスピナーの例です。
    ああぼくいまお母さんの夢をみていたのさ標本にするんですかええ、毎日注文があります。みんなほんとうに別れが惜しそうで、そのマジェランの星雲だ。するといきなりジョバンニは自分というものが書いてある。そらその男は立って窓をしめておこうかああ、どうか小さな人たちをだいて、それから硫黄のほのおのような、青宝玉と黄玉の大きな二つの車輪の輻のようにはね起きました。銀河ステーションそしてジョバンニは青い琴の星が、三つにもなって、その下の方で、見えない天の川の水がぎらっと光って、またとうもろこしの林になっていました。

    <div class="spinner1"></div>
  </div>
  <div>
    Where does it come from? Contrary to popular belief, Lorem Ipsum is not
    simply random text. It has roots in a piece of classical Latin literature
    from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
    professor at Hampden-Sydney College in Virginia, looked up one of the more
    obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
    through the cites of the word in classical literature, discovered the
    undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
    "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
    written in 45 BC. This book is a treatise on the theory of ethics, very
    popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum
    dolor sit amet..", comes from a line in section 1.10.32. The standard chunk
    of Lorem Ipsum used since the 1500s is reproduced below for those
    interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
    Malorum" by Cicero are also reproduced in their exact original form,
    accompanied by English versions from the 1914 translation by H. Rackham.
  </div>
</div>

<style>
  /*grids style*/
  .grid > div {
    border: solid 1px #999;
    padding: 4px;
  }

  .spinner1 {
    align-items: center; /*↕*/
    justify-content: center; /*center↔*/
    width: 64px;
    height: 64px;
    margin: 10px auto;
    border: 4px #ddd solid;
    border-top: 4px #2e93e6 solid;
    border-radius: 50%;
    animation: sp-anime 1s infinite linear;
  }

  @keyframes sp-anime {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
