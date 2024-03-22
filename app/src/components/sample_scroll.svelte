<script>
  let key = "";
  let innerWidth;
  let innerHeight;
  let outerWidth;
  let outerHeight;
  let online;
  let scrollX;
  let scrollY;
  // window.addEventListener('keydown', event => {
  //   key += event.key
  // })
</script>

<svelte:window
  on:keydown={(e) => (key = e.key)}
  bind:innerWidth
  bind:innerHeight
  bind:outerWidth
  bind:outerHeight
  bind:online
  bind:scrollX
  bind:scrollY
/>
<h1>{key}</h1>
<div>innerWidth: {innerWidth}</div>
<div>innerHeight: {innerHeight}</div>
<div>outerWidth: {outerWidth}</div>
<div>outerHeight: {outerHeight}</div>
<div>online: {online}</div>
<div class="fixed">
  <input type="number" bind:value={scrollX} />
  <input type="number" bind:value={scrollY} />
</div>
<div class="for-scroll"></div>

<style>
  .fixed {
    position: fixed;
    top: 10px;
    right: 10px;
  }
  .for-scroll {
    width: 200px;
    height: 2000px;
  }
</style>
