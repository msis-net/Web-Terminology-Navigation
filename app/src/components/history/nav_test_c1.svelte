<script>
  import { fade } from "svelte/transition";
  import { JsxFlags } from "typescript";

  export let resdata = {};

  console.log("title", resdata.content);

  let title = "";
  let obj = {};

  $: {
    title = resdata.title;
    obj = resdata;
  }
</script>

<hr />
<div>Title:{title}</div>
{#if obj}
  <ul class="text-[0.4em]">
    <!--#1-->
    {#each Object.keys(obj) as key}
      {#if typeof obj[key] == "object"}
        <li>#1:{key}:▼</li>
        <ul class="ml-2">
          <!--#2-->
          {#each Object.keys(obj[key]) as key1}
            {#if typeof obj[key][key1] == "object"}
              <li>#2:{key1}:▼▼</li>
              <ul class="ml-3">
                <!--#3-->
                {#each Object.keys(obj[key][key1]) as key2}
                  {#if typeof obj[key][key1][key2] == "object"}
                    <li>#3:{key2}:▼▼▼</li>
                    <ul class="ml-4">
                      <!--#4-->
                      {#each Object.keys(obj[key][key1][key2]) as key3}
                        {#if typeof obj[key][key1][key2][key3] == "object"}
                          <li>#4:{key3}:▼▼▼▼</li>
                          <ul class="ml-5">
                            <!--#5-->
                            {#each Object.keys(obj[key][key1][key2][key3]) as key4}
                              {#if typeof obj[key][key1][key2][key3][key4] == "object"}
                                <li>#5:{key4}:▼▼▼▼▼</li>
                                <ul class="ml-6">
                                  <!--#6-->
                                  {#each Object.keys(obj[key][key1][key2][key3][key4]) as key5}
                                    {#if typeof obj[key][key1][key2][key3][key4][key5] == "object"}
                                      <li>#6:{key5}:▼▼▼▼▼▼</li>
                                      <ul class="ml-7">
                                        <!--#7-->
                                        {#each Object.keys(obj[key][key1][key2][key3][key4][key5]) as key6}
                                          {#if typeof obj[key][key1][key2][key3][key4][key5][key6] == "object"}
                                            <li>#7:{key6}:▼▼▼▼▼▼▼</li>
                                            <ul class="ml-8">
                                              <!--#8-->
                                              {#each Object.keys(obj[key][key1][key2][key3][key4][key5][key6]) as key7}
                                                {#if typeof obj[key][key1][key2][key3][key4][key5][key6][key7] == "object"}
                                                  <li>#8:{key7}:▼▼▼▼▼▼▼▼</li>
                                                  <ul class="ml-9">
                                                    <!--#9-->
                                                    {#each Object.keys(obj[key][key1][key2][key3][key4][key5][key6][key7]) as key8}
                                                      {#if typeof obj[key][key1][key2][key3][key4][key5][key6][key7][key8] == "object"}
                                                        <li>
                                                          #9:{key8}:▼▼▼▼▼▼▼▼▼
                                                        </li>
                                                        <ul class="ml-9"></ul>
                                                      {:else}
                                                        <li>
                                                          #9:{key8}:"{obj[key][
                                                            key1
                                                          ][key2][key3][key4][
                                                            key5
                                                          ][key6][key7][key8]}"
                                                        </li>
                                                      {/if}
                                                    {/each}
                                                    <!--#9-->
                                                  </ul>
                                                {:else}
                                                  <li>
                                                    #8:{key7}:"{obj[key][key1][
                                                      key2
                                                    ][key3][key4][key5][key6][
                                                      key7
                                                    ]}"
                                                  </li>
                                                {/if}
                                              {/each}
                                              <!--#8-->
                                            </ul>
                                          {:else}
                                            <li>
                                              #7:{key6}:"{obj[key][key1][key2][
                                                key3
                                              ][key4][key5][key6]}"
                                            </li>
                                          {/if}
                                        {/each}
                                        <!--#7-->
                                      </ul>
                                    {:else}
                                      <li>
                                        #6:{key5}:"{obj[key][key1][key2][key3][
                                          key4
                                        ][key5]}"
                                      </li>
                                    {/if}
                                  {/each}
                                  <!--#6-->
                                </ul>
                              {:else}
                                <li>
                                  #5:{key4}:"{obj[key][key1][key2][key3][key4]}"
                                </li>
                              {/if}
                            {/each}
                            <!--#5-->
                          </ul>
                        {:else}
                          <li>#4:{key3}:"{obj[key][key1][key2][key3]}"</li>
                        {/if}
                      {/each}
                      <!--#4-->
                    </ul>
                  {:else}
                    <li>#3:{key2}:"{obj[key][key1][key2]}"</li>
                  {/if}
                {/each}
                <!--#3-->
              </ul>
            {:else}
              <li>#2:{key1}:"{obj[key][key1]}"</li>
            {/if}
          {/each}
          <!--#2-->
        </ul>
      {:else}
        <li>#1:{key}:"{obj[key]}"</li>
      {/if}
    {/each}
    <!--#1-->
  </ul>
{/if}

<div class="text-[0.6em] text-blue-600">T:{obj}</div>
