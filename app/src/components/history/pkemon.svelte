<script>
  async function getRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 150) + 1;
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/` + randomNumber
    );
    const json = await res.json();
    await sleep(1000); // 非同期処理をわかりやすくするための待ち時間
    return json;
  }

  let promise = getRandomNumber();

  function handleClick() {
    promise = getRandomNumber();
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
</script>

<button on:click={handleClick}> Pokemon gettin'! </button>

{#await promise}
  <p>...waiting</p>
{:then pokemon}
  <p>The pokemon is {pokemon.name}</p>
  <p><img src={pokemon.sprites.front_default} /></p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

catchブロックを省略して記載することもできる
{#await promise then pokemon}
  <p>The pokemon is {pokemon.name}</p>
  <p><img src={pokemon.sprites.front_default} /></p>
{/await}
