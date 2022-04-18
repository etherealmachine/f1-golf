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
  import { shuffle } from "./lib";

  import { attachDebug } from "./Debug";
  import ViewPrediction from "./ViewPrediction.svelte";
  attachDebug();

  let currentRace: GrandPrix = RACES[0];
  $: currentRaceIndex = RACES.indexOf(currentRace);
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
    currentRace = RACES[currentRaceIndex - 1];
  }

  function nextRace() {
    currentRace = RACES[currentRaceIndex + 1];
  }

  function spoil(race: string) {
    $state.spoiled[race] = true;
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

  function predictionChanged(event: CustomEvent) {
    $state.predictions[currentRace.name] = event.detail;
  }
</script>

<main>
  <div
    style="display: flex; justify-content: space-between; align-items: center;"
  >
    <button
      on:click={previousRace}
      class="next"
      class:hidden={currentRaceIndex <= 0}
      aria-label="previous"
    >
      <Icon icon="fa6-solid:arrow-left-long" />
    </button>
    <h1>
      {currentRace.name}
    </h1>
    <button
      on:click={nextRace}
      class="next"
      class:hidden={currentRaceIndex >= RACES.length - 1}
      aria-label="next"
    >
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
  <hr />
  <div style="display: flex; flex: 1; margin-bottom: 8px;">
    {#if currentDelta > 0}
      <Predict
        prediction={$state.predictions[currentRace.name]}
        on:change={predictionChanged}
      />
    {:else if currentRace.results}
      <div style="flex: 1;">
        {#if $state.predictions[currentRace.name] && !$state.spoiled[currentRace.name]}
          <ViewPrediction prediction={$state.predictions[currentRace.name]} />
        {:else if $state.predictions[currentRace.name] && $state.spoiled[currentRace.name]}
          <ViewScore
            results={currentRace.results}
            prediction={$state.predictions[currentRace.name]}
          />
        {:else if $state.spoiled[currentRace.name]}
          <ViewResults results={currentRace.results} />
        {/if}
        {#if !$state.spoiled[currentRace.name]}
          <button
            class="start"
            style="margin-top: 8px;"
            on:click={() => spoil(currentRace.name)}>View Results</button
          >
        {/if}
      </div>
    {:else}
      <div style="margin-top: 24px;">
        <ViewPrediction prediction={$state.predictions[currentRace.name]} />
        <div>Waiting for results...</div>
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
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

  button.start {
    color: white;
    font-weight: 900;
    background-color: #ff1801;
    border-radius: 12px;
    padding: 16px 24px;
  }

  button.hidden {
    display: none;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
