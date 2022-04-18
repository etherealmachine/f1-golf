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
  <h3 style="margin-bottom: 8px; text-decoration: underline;">
    Your Prediction
  </h3>
  <SortableList
    sortableOptions={{ animation: 200 }}
    bind:items={prediction}
    let:item
    let:index
    on:change={predictionChanged}
    ulClass="driver-list"
    liClass="driver-slot"
  >
    <div class="driver-item">
      <span>{index + 1}</span>
      <span>{formatName(item.driver.name)}</span>
    </div>
  </SortableList>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  :global(.driver-list) {
    display: flex;
    flex-direction: column;
    flex: 1;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  :global(.driver-slot) {
    display: flex;
    align-items: center;
    flex: 1;
    border: 1px solid black;
    background: white;
    padding: 0 16px;
  }

  .driver-item {
    font-size: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
  }

  .driver-item > span {
    padding: 0 8px;
  }
</style>
