import type { NodeType, EdgeType } from "../types";

/**
 * Calculates connection counts for each node based on outgoing edges
 */
export const calculateConnectionCounts = (
  nodes: NodeType[],
  edges: EdgeType[]
): NodeType[] => {
  const connectionCounts = new Map<string, number>();

  // Count outgoing connections for each node
  edges.forEach((edge) => {
    const count = connectionCounts.get(edge.source) || 0;
    connectionCounts.set(edge.source, count + 1);
  });

  // Update nodes with connection counts
  return nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      connectionCount: connectionCounts.get(node.id) || 0,
    },
  }));
};

/**
 * Generates a unique edge ID to support multiple edges from the same source
 */
export const generateEdgeId = (source: string, target: string): string => {
  return `${source}-${target}-${Date.now()}`;
};

/**
 * Creates a new node with the given data and position
 */
export const createNewNode = (
  nodeData: { name: string; thumbnail: string },
  position: { x: number; y: number }
): NodeType => {
  return {
    id: `node_${Date.now()}`,
    type: "route",
    position,
    data: {
      name: nodeData.name,
      thumbnail: nodeData.thumbnail,
    },
  };
};
