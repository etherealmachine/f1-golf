<script lang="ts">
  import type { Prediction } from "./Types";

  export let results: string[];

  function formatName(name: string) {
    return name.split(" ")[1];
  }
</script>

<main>
  <h3>Results</h3>
  <table>
    <tr>
      <th>Position</th>
      <th>Driver</th>
    </tr>
    {#each results as driver, index}
      <tr>
        <td>{index + 1}</td>
        <td>{formatName(driver)}</td>
      </tr>
    {/each}
  </table>
</main>

<style>
</style>
