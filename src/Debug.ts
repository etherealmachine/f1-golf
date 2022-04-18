import { DRIVERS, RACES } from "./Data";
import { shuffle } from "./lib";
import { state } from "./Store";

export function attachDebug() {
  (window as any).reset = function () {
    state.update((_) => {
      return {
        spoiled: {},
        predictions: {},
      };
    });
  };

  (window as any).predict = function () {
    RACES.forEach((race) => {
      state.update((oldState) => {
        oldState.predictions[race.name] = shuffle(
          DRIVERS.map((d) => {
            return {
              id: d.name,
              driver: d,
            };
          })
        );
        return oldState;
      });
    });
  };
}
