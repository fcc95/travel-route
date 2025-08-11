import type { NodeType, EdgeType } from "../types";

export const STORAGE_ROUTE_FLOW = "STORAGE_ROUTE_FLOW";

export const setDataToStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getDataToStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const deleteDataToStorage = (key: string) => {
  localStorage.removeItem(key);
};

// Graph serialization/deserialization functions
export const saveGraphToStorage = (nodes: NodeType[], edges: EdgeType[]) => {
  const graphData = {
    nodes,
    edges,
    timestamp: new Date().toISOString(),
  };

  try {
    const serializedData = JSON.stringify(graphData);
    setDataToStorage(STORAGE_ROUTE_FLOW, serializedData);
    return true;
  } catch (error) {
    console.error("Failed to save graph to storage:", error);
    return false;
  }
};

export const loadGraphFromStorage = () => {
  try {
    const storedData = getDataToStorage(STORAGE_ROUTE_FLOW);
    if (!storedData) return null;

    const graphData = JSON.parse(storedData);

    // Validate the structure
    if (!graphData.nodes || !graphData.edges) {
      console.warn("Invalid graph data structure in storage");
      return null;
    }

    return {
      nodes: graphData.nodes,
      edges: graphData.edges,
      timestamp: graphData.timestamp,
    };
  } catch (error) {
    console.error("Failed to load graph from storage:", error);
    return null;
  }
};

export const clearGraphFromStorage = () => {
  deleteDataToStorage(STORAGE_ROUTE_FLOW);
};
