import type { DateTime } from "luxon";

export interface GrandPrix {
  name: string;
  location: string;
  results?: string[];
  time: DateTime;
}

export interface Driver {
  name: string;
  team: string;
  nicknames?: string[];
}

export interface Prediction {
  id: string;
  driver: Driver;
}
