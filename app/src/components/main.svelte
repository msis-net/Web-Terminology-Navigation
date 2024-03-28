<script>
  import { t } from "@/lib/i18n/i18n";
  import {
    CodeSystem,
    Resuoces,
    language,
    OpenTab,
    SearchObj,
  } from "./stores.js";
  import Search from "./search.svelte";
</script>

<div>MAIN</div>
<div>
  <Search {$SearchObj} />
</div>
