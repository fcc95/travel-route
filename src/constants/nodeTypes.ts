import { NodeTypes } from "../enums/nodeEnums";

export const NODE_TYPE_LIST = [
  { id: NodeTypes.Country, label: "Country" },
  { id: NodeTypes.Place, label: "Place" },
  { id: NodeTypes.Hotel, label: "Hotel" },
  { id: NodeTypes.Airport, label: "Airport" },
  { id: NodeTypes.Other, label: "Other" },
] as const;
