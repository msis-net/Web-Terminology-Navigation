<script lang="ts">
  import NavChild from "./conrtol/nav_child.svelte";
  import { t } from "@/lib/i18n/i18n";
  import { navcontext } from "@/lib/stores.js";
  export let label;

  const NavContext = (context: any) => {
    $navcontext = context;
  };
</script>

<!--headerの全体枠-->
<div class="relative m-2 w-lvw">
  <div class="hidden">{label}</div>
  <ul class="navbar-main">
    <li class="title">{$t("common.header.title")}</li>
    <!--
    <li>
      <button on:click={() => NavContext("home")}>
        <span class="material-symbols-outlined"> home </span>
      </button>
    </li>
    <li>
      <button on:click={() => NavContext("logout")}>
        <span class="material-symbols-outlined"> logout </span>
      </button>
    </li>
    -->
  </ul>

  <div class="navbar-child ms-auto space-x-2">
    <NavChild label="Settings" {NavContext} />
  </div>
</div>

<style>
  * {
    user-select: none;
    color: #dff;
  }
  .navbar-main {
    @apply absolute left-2 flex space-x-5;
    line-height: 42px;
  }
  .navbar-main .title {
    font-size: 3vw;
  }
  /*.navbar-nav 
  右下寄せ、要素内：横並び、左右中央、16px間隔　
  */
  .navbar-child {
    @apply absolute flex right-9 bottom-4 align-middle justify-center space-x-4;
  }

  ul li {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .navbar-main {
      top: 4px;
      line-height: none;
    }
  }
</style>
