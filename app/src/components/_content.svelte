<script lang="ts">
  import { loadTranslations } from "@/lib/i18n/i18n";
  import { language, navcontext } from "@/lib/stores";
  import ConceptView from "@/components/concept_view.svelte";
  export let label;
  loadTranslations($language, "/");

  //Compornetnt items
  import Comp1 from "./comp1.svelte";
  import Comp2 from "./comp2.svelte";
  import Comp3 from "./comp3.svelte";

  const options = [
    { name: "", component: Comp1 },
    { name: "Dashbord", component: null },
    { name: "Menu1", component: Comp1 },
    { name: "Menu2", component: Comp2 },
    { name: "Menu3", component: Comp3 },
  ];

  let selected = options[0];
  $: {
    if ($navcontext.length > 0) {
      if (options.find((v) => v.name == $navcontext)) {
        const foundOption = options.find((v) => v.name == $navcontext);
        selected = foundOption ? foundOption : options[0];
      } else {
        selected = options[0];
      }
    } else {
      selected = options[0];
    }
  }
</script>

<div>{label}:location[{$navcontext}]</div>
<div></div>
<div class="bg-white">
  {#if selected.component === null}
    <div>[{$navcontext}] is Nothing</div>
  {:else}
    <svelte:component this={selected.component} label={$navcontext} />
  {/if}
</div>
<div>
  <ConceptView indent={1} />
</div>
