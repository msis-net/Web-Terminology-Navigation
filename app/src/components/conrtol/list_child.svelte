<script lang="ts">
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import ListChild from "./list_child.svelte";

  export let NavContext; //ParentFunction
  export let navlist; //Google icon name

  let navstatus = sessionStorage.getItem("navstatus")
    ? JSON.parse(sessionStorage.getItem("navstatus")!)
    : [];
  let itemlist = navstatus.find((v: any) => v.name == navlist.name);

  let arrowDown: boolean;
  try {
    arrowDown = itemlist.open;
  } catch (e) {
    arrowDown = false;
  }

  const toggleArrow = () => {
    if (arrowDown) {
      arrowDown = false;
    } else {
      arrowDown = true;
    }
    try {
      itemlist.open = arrowDown;
    } catch (e) {}
    sessionStorage.setItem("navstatus", JSON.stringify(navstatus));
  };
</script>

<button on:click={toggleArrow}>
  <div>
    <!--span class="material-symbols-outlined"> unfold_more </span-->
    <span class="material-symbols-outlined mr-1"> {navlist.symbol} </span>
    {navlist.name}

    <span class="material-symbols-outlined arrow" class:arrowDown
      >navigate_before</span
    >
  </div>
</button>

{#if arrowDown}
  <ul
    class="ml-6"
    transition:slide={{
      delay: 250,
      duration: 300,
      easing: quintOut,
      axis: "y", //方向
    }}
  >
    {#each navlist.lists as list}
      {#if list.sublist}
        <ListChild navlist={list.sublist} {NavContext} />
      {:else}
        <li>
          {#if list.url}
            <a href={list.url} class="">
              <span class="material-symbols-outlined label">
                {list.symbol}
              </span>
              {list.label}
            </a>
          {:else}
            <button on:click={() => NavContext(list.context)}>
              <span class="material-symbols-outlined label">
                {list.symbol}
              </span>
              {list.label}
            </button>
          {/if}
        </li>
      {/if}
    {/each}
  </ul>
{/if}

<style>
  .arrow {
    margin-left: 4px;
    transition: 0.2s;
  }

  .arrowDown {
    transform: rotate(-90deg);
  }

  button {
    display: flex;
    align-items: center;
    line-height: 40px;
    width: 100%;
    border-top: 1px solid #999;
  }

  button div {
    margin: 0.25rem;
  }
  ul {
    position: relative;
    color: #333;
  }
  ul li {
    position: relative;
    display: flex;
    align-items: center;
    line-height: 30px;
  }

  ul button {
    font-size: 0.8em;
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
