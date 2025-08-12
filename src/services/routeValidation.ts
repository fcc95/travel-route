import blockedRoutes from "../config/blockedRoutes.json";
import type { NodeType, EdgeType } from "../types";

export interface RouteValidationResult {
  isValid: boolean;
  reason?: string;
}

export const checkForCycles = (
  nodes: NodeType[],
  edges: EdgeType[],
  sourceId: string,
  targetId: string
): RouteValidationResult => {
  // Create adjacency list for the graph
  const adjacencyList = new Map<string, string[]>();

  // Initialize adjacency list with existing edges
  edges.forEach((edge) => {
    if (!adjacencyList.has(edge.source)) {
      adjacencyList.set(edge.source, []);
    }
    adjacencyList.get(edge.source)!.push(edge.target);
  });

  // Add the new edge temporarily
  if (!adjacencyList.has(sourceId)) {
    adjacencyList.set(sourceId, []);
  }
  adjacencyList.get(sourceId)!.push(targetId);

  // Check for cycles using DFS
  const visited = new Set<string>();
  const recStack = new Set<string>();

  const hasCycle = (nodeId: string): boolean => {
    if (recStack.has(nodeId)) {
      return true; // Back edge found - cycle detected
    }

    if (visited.has(nodeId)) {
      return false; // Already processed
    }

    visited.add(nodeId);
    recStack.add(nodeId);

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (hasCycle(neighbor)) {
        return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  };

  // Check all nodes for cycles
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (hasCycle(node.id)) {
        return {
          isValid: false,
          reason: "Adding this route would create a cycle in your travel plan",
        };
      }
    }
  }

  return { isValid: true };
};

// Checks if a route already exists (prevents duplicate edges)
export const checkDuplicateRoute = (
  edges: EdgeType[],
  sourceId: string,
  targetId: string
): RouteValidationResult => {
  const existingEdge = edges.find(
    (edge) => edge.source === sourceId && edge.target === targetId
  );

  if (existingEdge) {
    return {
      isValid: false,
      reason: "This route already exists",
    };
  }

  return { isValid: true };
};

export const checkBlockedRoute = (
  nodes: NodeType[],
  sourceId: string,
  targetId: string
): RouteValidationResult => {
  const sourceNode = nodes.find((node) => node.id === sourceId);
  const targetNode = nodes.find((node) => node.id === targetId);

  if (!sourceNode || !targetNode) {
    return { isValid: true };
  }

  const sourceName = sourceNode.data.name;
  const targetName = targetNode.data.name;

  // Check if this specific route is blocked
  const blockedRoute = blockedRoutes.routes.find(
    (route) => route.from === sourceName && route.to === targetName
  );

  if (blockedRoute) {
    return {
      isValid: false,
      reason:
        blockedRoute.reason ||
        "This route is blocked due to travel restrictions",
    };
  }

  return { isValid: true };
};

export const validateRoute = (
  nodes: NodeType[],
  edges: EdgeType[],
  sourceId: string,
  targetId: string
): RouteValidationResult => {
  // First check if it's a duplicate route
  const duplicateCheck = checkDuplicateRoute(edges, sourceId, targetId);
  if (!duplicateCheck.isValid) {
    return duplicateCheck;
  }

  // Then check if it's a blocked route
  const blockedCheck = checkBlockedRoute(nodes, sourceId, targetId);
  if (!blockedCheck.isValid) {
    return blockedCheck;
  }

  // Finally check for cycles
  const cycleCheck = checkForCycles(nodes, edges, sourceId, targetId);
  if (!cycleCheck.isValid) {
    return cycleCheck;
  }

  return { isValid: true };
};
