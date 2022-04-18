<script lang="ts">
  import type { Prediction } from "./Types";

  export let prediction: Prediction[];

  function formatName(name: string) {
    return name.split(" ")[1];
  }
</script>

<main>
  <h3 style="margin-bottom: 8px; text-decoration: underline;">
    Your Prediction
  </h3>
  <table>
    <tr>
      <th>Position</th>
      <th>Driver</th>
    </tr>
    {#each prediction as p, index}
      <tr>
        <td>{index + 1}</td>
        <td>{formatName(p.driver.name)}</td>
      </tr>
    {/each}
  </table>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
</style>
