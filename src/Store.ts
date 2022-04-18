import { writable } from "svelte/store";
import type { Prediction } from "./Types";

const VERSION = "state-v1.0.0";

export interface State {
  spoiled: { [key: string]: boolean };
  predictions: { [key: string]: Prediction[] };
}

const defaultState = {
  spoiled: {},
  predictions: {},
};

const storedState = JSON.parse(localStorage.getItem(VERSION));

export const state = writable<State>(storedState || defaultState);

state.subscribe((value) =>
  localStorage.setItem(VERSION, JSON.stringify(value))
);
