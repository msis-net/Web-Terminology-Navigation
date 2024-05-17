<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { locale, t } from "@/lib/i18n/i18n";
  import { language } from "@/lib/stores.js";
  import { fade } from "svelte/transition";

  export let label;
  export let NavContext; //ParentFunction
  const onChange = () => {
    locale.set($language);
  };

  let arrowDown = false;
  const toggleArrow = () => {
    if (arrowDown) {
      arrowDown = false;
    } else {
      arrowDown = true;
    }
  };

  //dropdown以外のクリックで閉じる
  const handleClickOutside = (event: any) => {
    if (!event.target.closest(".dropdown") && arrowDown) {
      arrowDown = false;
    }
  };

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener("click", handleClickOutside);
  });
</script>

<!--headerの全体枠-->
<div class="dropdown">
  <button class="nav-icon flex space-x-1" on:click={toggleArrow}>
    <span class="material-symbols-outlined"> settings </span>
    <div class="label">{label}</div>
    <span class="material-symbols-outlined arrow" class:arrowDown
      >navigate_before</span
    >
  </button>
  {#if arrowDown}
    <ul class="dropdown-item hidden p-2" transition:fade>
      <li class="">
        <button on:click={() => NavContext("ABOUT")}> ABOUT </button>
      </li>
      <li class="li-body">
        <button on:click={() => NavContext("SERVICE")}> SERVICE </button>
      </li>
      <li class="li-body">
        <button on:click={() => NavContext("CONTACT")}> CONTACT </button>
      </li>
      <li class="li-body">
        <div class="p-1 space-x-2">
          <span>{$t("common.navigate.Language")}</span>
          <select bind:value={$language} on:change={onChange} class="pl-4 pr-4">
            <option value="en" selected>en</option>
            <option value="ja">ja</option>
          </select>
        </div>
      </li>
    </ul>
  {/if}
</div>

<style>
  .dropdown {
    @apply relative;
    cursor: pointer;
    font-size: 0.9em;
  }

  .dropdown:hover {
    @apply shadow-md rounded-md;
  }

  .dropdown:hover > .dropdown-item {
    display: block;
  }

  .arrow {
    transition: 0.2s;
  }
  .arrowDown {
    transform: rotate(-90deg);
  }

  .dropdown-item {
    @apply absolute w-48 -left-12 bg-white border rounded-md shadow-md;
    z-index: 20;
    color: #666;
  }

  ul li {
    display: block;
    height: 100%;
    line-height: 30px;
  }

  ul li.li-body {
    border-top: 1px solid #ddd;
  }

  ul li button {
    margin: 4px;
    width: 98%;
    text-align: left;
  }
  ul li:hover {
    background-color: #eee;
  }

  @media (max-width: 768px) {
    .label,
    .arrow {
      display: none;
    }
    .dropdown-item {
      @apply -left-48;
    }
  }
</style>
