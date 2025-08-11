import type { ReactNode } from "react";

export type ResultItemType = {
  id: string;
  name: string;
  thumbnail: string;
};

export type NodeElementType = {
  name: string;
  thumbnail: string;
  color?: string;
  textNote?: string;
  connectionCount?: number; // number of outgoing connections for branched routes
  [key: string]: unknown; // allows any future property
};

export type NodeType = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeElementType;
};

export type EdgeType = {
  id: string;
  source: string;
  target: string;
  label?: ReactNode;
  animated?: boolean;
};

export type RouteValidationResult = {
  isValid: boolean;
  reason?: string;
};

export type BlockedRoute = {
  from: string;
  to: string;
  reason: string;
};
