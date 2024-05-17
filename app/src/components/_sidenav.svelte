<script lang="ts">
  import ListChild from "./conrtol/list_child.svelte";
  import { loadTranslations } from "@/lib/i18n/i18n";
  import { language, navcontext } from "@/lib/stores";
  import { navlist } from "@/lib/sidenav";
  //$language = window.navigator.language;
  loadTranslations($language, "/");

  export let title;

  const NavContext = (context: any) => {
    $navcontext = context;
  };

  if (!sessionStorage.getItem("navstatus")) {
    sessionStorage.setItem("navstatus", JSON.stringify(navlist));
  }
</script>

<div class="hidden">{title}</div>
<!--
<a href="/">
  <div class="title nav-height flex">
    <img src="/images/adlogo.png" class="image" alt="adlogo" />
    {$t("common.header.title")}
  </div>
</a>
-->
<ul class="overflow-y-auto">
  <ListChild navlist={navlist.find((v) => v.name == "Dashbord")} {NavContext} />
  <ListChild navlist={navlist.find((v) => v.name == "Toggle")} {NavContext} />
  <li>
    <button on:click={() => NavContext("Menu1")}>
      <span class="material-symbols-outlined"> format_indent_increase </span>
      Menu1
    </button>
  </li>
  <li>
    <button on:click={() => NavContext("Menu2")}>
      <span class="material-symbols-outlined"> unfold_more </span>
      Menu2
    </button>
  </li>
  <li>
    <button on:click={() => NavContext("Menu3")}>
      <span class="material-symbols-outlined"> list </span>
      Menu3
    </button>
  </li>
  <li>
    <div class="p-2">Checkout /lib/sidenav.js</div>
  </li>
</ul>

<style>
  * {
    user-select: none;
  }
  .title {
    align-items: center; /*↕*/
    justify-content: left; /*center↔*/
    font-size: 1.25em;
    padding: 4px;
  }
  .image {
    width: 48px; /* image width*/
    height: 48px; /* image height */
    object-fit: contain; /*contain / cover*/
    /*border: dashed 1px gray; */ /* for check of image outline  */
  }
  ul {
    color: #333;
  }
  ul li {
    display: flex;
    align-items: center;
    line-height: 40px;
    border-top: 1px solid #999;
  }
  ul button {
    margin: 4px;
    display: block;
    width: 100%;
    text-align: left;
    list-style: 56px;
    transition: 0.3s;
  }
  ul li:hover button {
    padding-left: 10px;
  }
  ul li span {
    margin-right: 5px;
  }
</style>
