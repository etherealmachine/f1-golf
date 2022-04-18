<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import SortableList from "./SortableList.svelte";
  import type { Prediction } from "./Types";

  export let prediction: Prediction[];

  function formatName(name: string) {
    return name.split(" ")[1];
  }

  function predictionChanged(event: CustomEvent) {
    dispatch("change", event.detail);
  }
</script>

<main>
  <div>
    <h3>Your Prediction</h3>
    <SortableList
      sortableOptions={{ animation: 200 }}
      bind:items={prediction}
      let:item
      let:index
      on:change={predictionChanged}
      ulClass="driver-list"
    >
      <div class="driver-slot">
        {index + 1}
        {formatName(item.driver.name)}
      </div>
    </SortableList>
  </div>
</main>

<style>
  :global(.driver-list) {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .driver-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid black;
    background: white;
  }
</style>
