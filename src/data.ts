import { DateTime } from "luxon";

import type { GrandPrix, Driver } from "./Types";

export const TEAMS: string[] = [
  "Ferrari",
  "Mercedes",
  "Redbull",
  "McLaren",
  "Williams",
  "Haas",
  "Alfa Romeo",
  "Alpha Tauri",
  "Alpine",
  "Aston Martin",
];

export const DRIVERS: Driver[] = [
  {
    name: "Charles Leclerc",
    team: "Ferrari",
  },
  {
    name: "Carlos Sainz",
    team: "Ferrari",
  },
  {
    name: "Lewis Hamilton",
    team: "Mercedes",
  },
  {
    name: "George Russell",
    team: "Mercedes",
  },
  {
    name: "Max Verstappen",
    team: "Redbull",
  },
  {
    name: "Sergio Perez",
    team: "Redbull",
  },
  {
    name: "Lando Norris",
    team: "McLaren",
  },
  {
    name: "Daniel Ricciardo",
    team: "McLaren",
  },
  {
    name: "Alex Albon",
    team: "Williams",
  },
  {
    name: "Nicholas Latifi",
    team: "Williams",
  },
  {
    name: "Kevin Magnussen",
    team: "Haas",
  },
  {
    name: "Mick Schumacher",
    team: "Haas",
  },
  {
    name: "Valtteri Bottas",
    team: "Alfa Romeo",
  },
  {
    name: "Zhou Guanyu",
    team: "Alfa Romeo",
  },
  {
    name: "Pierre Gasly",
    team: "Alpha Tauri",
  },
  {
    name: "Yuki Tsunoda",
    team: "Alpha Tauri",
  },
  {
    name: "Fernando Alonso",
    team: "Alpine",
  },
  {
    name: "Esteban Ocon",
    team: "Alpine",
  },
  {
    name: "Sebastian Vettel",
    team: "Aston Martin",
  },
  {
    name: "Lance Stroll",
    team: "Aston Martin",
  },
];

export const RACES: GrandPrix[] = [
  {
    name: "AUSTRALIAN GRAND PRIX",
    location: "Melbourne, Australia",
    results: [
      "Charles Leclerc",
      "Sergio Perez",
      "George Russell",
      "Lewis Hamilton",
      "Lando Norris",
      "Daniel Ricciardo",
      "Esteban Ocon",
      "Valtteri Bottas",
      "Pierre Gasly",
      "Alex Albon",
      "Guanyu Zhou",
      "Lance Stroll",
      "Mick Schumacher",
      "Kevin Magnussen",
      "Yuki Tsunoda",
      "Nicholas Latifi",
      "Fernando Alonso",
      "Max Verstappen",
      "Sebastian Vettel",
      "Carlos Sainz",
    ],
    time: DateTime.fromISO("2022-04-09T22:00:00-07:00"),
  },
  {
    name: "EMILIA ROMANGNA GRAND PRIX",
    location: "Imola, Italy",
    time: DateTime.fromISO("2022-04-24T06:00:00-07:00"),
    results: [
      "Max Verstappen",
      "Sergio Perez",
      "Lando Norris",
      "George Russell",
      "Valtteri Bottas",
      "Charles Leclerc",
      "Yuki Tsunoda",
      "Sebastian Vettel",
      "Kevin Magnussen",
      "Lance Stroll",
      "Alex Albon",
      "Pierre Gasly",
      "Lewis Hamilton",
      "Esteban Ocon",
      "Guanyu Zhou",
      "Nicholas Latifi",
      "Mick Schumacher",
      "Daniel Ricciardo",
      "Fernando Alonso",
      "Carlos Sainz",
    ],
  },
];
