<script lang="ts">
  import { DateTime } from "luxon";
  import humanizeDuration from "humanize-duration";
  import Icon from "@iconify/svelte";

  import type { GrandPrix } from "./Types";
  import { DRIVERS, RACES } from "./Data";
  import Predict from "./Predict.svelte";
  import ViewResults from "./ViewResults.svelte";
  import { state } from "./Store";
  import ViewScore from "./ViewScore.svelte";

  let currentRace: GrandPrix = RACES[0];
  let currentTime: DateTime = DateTime.now();

  $: currentDelta = currentRace.time.diff(currentTime).valueOf();
  $: currentDeltaString =
    currentDelta < 0
      ? humanizeDuration(currentDelta, {
          units: ["w"],
          round: true,
        }) + " ago"
      : humanizeDuration(currentDelta, {
          units: ["y", "mo", "w", "d", "h", "m"],
          round: true,
          conjunction: " and ",
        }) + " from now";

  setInterval(() => {
    currentTime = DateTime.now();
  }, 1000);

  function previousRace() {
    const i = RACES.indexOf(currentRace);
    if (i === 0) {
      return;
    }
    currentRace = RACES[i - 1];
  }

  function nextRace() {
    const i = RACES.indexOf(currentRace);
    if (i + 1 >= RACES.length) {
      return;
    }
    currentRace = RACES[i + 1];
  }

  function spoil(race: string) {
    $state.spoiled[race] = true;
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  $: if (
    $state.predictions[currentRace.name] === undefined &&
    currentDelta > 0
  ) {
    $state.predictions[currentRace.name] = shuffle(
      DRIVERS.map((d) => {
        return {
          id: d.name,
          driver: d,
        };
      })
    );
  }

  $: prediction = $state.predictions[currentRace.name];

  function predictionChanged(event: CustomEvent) {
    $state.predictions[currentRace.name] = event.detail;
  }
</script>

<main>
  <div
    style="display: flex; justify-content: space-between; align-items: center;"
  >
    <button on:click={previousRace} class="next" aria-label="previous">
      <Icon icon="fa6-solid:arrow-left-long" />
    </button>
    <h1>
      {currentRace.name}
    </h1>
    <button on:click={nextRace} class="next" aria-label="next">
      <Icon icon="fa6-solid:arrow-right-long" />
    </button>
  </div>
  <h2>
    {currentRace.time.toLocaleString({
      weekday: "long",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    })}
  </h2>
  <h3>{currentDeltaString}</h3>
  <div style="display: flex;">
    {#if currentDelta > 0}
      <Predict {prediction} on:change={predictionChanged} />
    {:else if currentRace.results && $state.spoiled[currentRace.name] && prediction}
      <ViewScore results={currentRace.results} {prediction} />
    {:else if currentRace.results && $state.spoiled[currentRace.name] && !prediction}
      <ViewResults results={currentRace.results} />
    {:else if currentRace.results && !$state.spoiled[currentRace.name]}
      <button on:click={() => spoil(currentRace.name)}>View Results</button>
    {:else}
      <div>Waiting for results...</div>
    {/if}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    padding: 0 12px;
  }

  h1 {
    color: #ff1801;
    text-transform: uppercase;
  }

  button.next {
    font-size: 36px;
    line-height: 36px;
    background: transparent;
    border: none;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
