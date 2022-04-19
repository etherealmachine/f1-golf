<script lang="ts">
  import Sortable, { SortableEvent } from "sortablejs";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import type { Prediction } from "./Types";

  export let prediction: Prediction[];

  function formatName(name: string) {
    return name.split(" ")[1];
  }

  let sortable: Sortable;
  let sortableOptions = {
    animation: 200,
    onSort: (event: SortableEvent) => {
      const item = prediction.splice(event.oldIndex, 1)[0];
      prediction = prediction
        .slice(0, event.newIndex)
        .concat([item])
        .concat(prediction.slice(event.newIndex, prediction.length));
      dispatch("change", prediction);
    },
  };
  let listElement: HTMLElement;
  $: if (listElement && !sortable) {
    sortable = Sortable.create(listElement, sortableOptions);
  }
</script>

<main>
  <h3 style="margin-bottom: 8px; text-decoration: underline;">
    Your Prediction
  </h3>
  <div>
    <div class="header">
      <span>In the Points</span>
      <span>In the Hunt</span>
    </div>
    <div bind:this={listElement} class="driver-list">
      {#each prediction as item, index (item.driver.name)}
        <div class="driver-item">
          <span>{index + 1}</span>
          <span>{formatName(item.driver.name)}</span>
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: space-around;
    font-weight: 600;
  }

  .driver-list {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(10, auto);
    padding: 0;
    margin: 0;
  }

  .driver-item {
    font-size: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    outline: 1px solid black;
    padding: 0 16px;
  }

  .driver-item > span {
    padding: 0 8px;
  }
</style>
