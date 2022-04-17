<script lang="ts">
  import type { Prediction } from "./types";

  export let results: string[];
  export let prediction: Prediction[];

  function formatName(name: string) {
    return name.split(" ")[1];
  }

  function formatPrediction(prediction: Prediction[], driver: string) {
    const predictedIndex = prediction.findIndex((d) => d.id === driver);
    return `${predictedIndex + 1}`;
  }

  function scoreSingle(
    prediction: Prediction[],
    resultIndex: number,
    driver: string
  ): number {
    const predictedIndex = prediction.findIndex((d) => d.id === driver);
    return 20 - Math.abs(resultIndex - predictedIndex);
  }

  function score(prediction: Prediction[], results: string[]): number {
    return results.reduce(
      (score, result, index) => score + scoreSingle(prediction, index, result),
      0
    );
  }

  function formatScore(score) {
    return `${Math.round(100 * (score / 400))}%`;
  }
</script>

<main>
  <h3>Results</h3>
  <table>
    <tr>
      <th>Position</th>
      <th>Driver</th>
      <th>Prediction</th>
      <th>Score</th>
    </tr>
    {#each results as driver, index}
      <tr>
        <td>{index + 1}</td>
        <td>{formatName(driver)}</td>
        <td>{formatPrediction(prediction, driver)}</td>
        <td>{scoreSingle(prediction, index, driver)}</td>
      </tr>
    {/each}
  </table>
  <h4>
    Total: {formatScore(score(prediction, results))}
  </h4>
</main>

<style>
</style>
