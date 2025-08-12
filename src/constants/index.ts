import type { NodeType, EdgeType } from "../types";

export * from "./nodeTypes";

export const IMAGES = {
  place: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
  hotel: "https://cdn-icons-png.flaticon.com/512/3837/3837802.png",
  airport: "https://cdn-icons-png.flaticon.com/512/7720/7720661.png",
  other:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjKh6pcT4tAmAe0JaKRwwpC2cBk6BOMIAWPw&s",
} as const;

export const INITIAL_NODES: NodeType[] = [
  {
    id: "fr",
    type: "route",
    position: { x: 0, y: 0 },
    data: { name: "France", thumbnail: "https://flagcdn.com/w80/fr.png" },
  },
  {
    id: "es",
    type: "route",
    position: { x: 220, y: 0 },
    data: { name: "Spain", thumbnail: "https://flagcdn.com/w80/es.png" },
  },
  {
    id: "it",
    type: "route",
    position: { x: 440, y: 0 },
    data: { name: "Italy", thumbnail: "https://flagcdn.com/w80/it.png" },
  },
  {
    id: "de",
    type: "route",
    position: { x: 0, y: 200 },
    data: { name: "Germany", thumbnail: "https://flagcdn.com/w80/de.png" },
  },
];

export const INITIAL_EDGES: EdgeType[] = [
  { id: "fr-es", source: "fr", target: "es" },
  { id: "es-it", source: "es", target: "it" },
  { id: "fr-de", source: "fr", target: "de" },
];

export const MESSAGE_TIMEOUTS = 5000;

export const NODE_SPACING = {
  X: 220,
  Y: 200,
} as const;
