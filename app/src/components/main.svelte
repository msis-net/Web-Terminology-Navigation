<script>
  import { t } from "@/lib/i18n/i18n";
  import { Resuoces, Concept, SearchObj } from "./stores.js";
  import ConceptView from "./concept_view.svelte";
  import Search from "./search.svelte";
  import NavTaxonomy from "./nav_taxonomy.svelte";
</script>

<div>Concept Detail</div>
<div>
  <ConceptView indent="1" />
</div>
<div>
  <!--
  <Search {$SearchObj} />
  <NavTaxonomy {$Resuoces} />
  -->
</div>
