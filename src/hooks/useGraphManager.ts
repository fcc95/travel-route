import { useCallback, useState, useEffect } from "react";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type EdgeChange,
} from "@xyflow/react";
import {
  saveGraphToStorage,
  loadGraphFromStorage,
  clearGraphFromStorage,
  validateRoute,
  calculateConnectionCounts,
  generateEdgeId,
  createNewNode,
} from "../services";
import type { EdgeType } from "../types";
import {
  INITIAL_NODES,
  INITIAL_EDGES,
  MESSAGE_TIMEOUTS,
  NODE_SPACING,
} from "../constants";

export const useGraphManager = () => {
  const [message, setMessage] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);

  useEffect(() => {
    setNodes((curr) => calculateConnectionCounts(curr, edges));
  }, [edges, setNodes]);

  const handleEdgesChange = useCallback(
    (changes: EdgeChange<EdgeType>[]) => {
      onEdgesChange(changes);
    },
    [onEdgesChange]
  );

  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), MESSAGE_TIMEOUTS);
  }, []);

  const save = useCallback(() => {
    const success = saveGraphToStorage(nodes, edges);
    showMessage(success ? "Graph saved successfully!" : "Failed to save graph");
  }, [nodes, edges, showMessage]);

  const load = useCallback(() => {
    const graphData = loadGraphFromStorage();
    if (graphData) {
      setEdges(graphData.edges);
      setNodes(() =>
        calculateConnectionCounts(graphData.nodes, graphData.edges)
      );

      showMessage("Graph loaded successfully!");
    } else {
      showMessage("No saved graph found or failed to load");
    }
  }, [setNodes, setEdges, showMessage]);

  const clear = useCallback(() => {
    setEdges(INITIAL_EDGES);
    setNodes(() => calculateConnectionCounts(INITIAL_NODES, INITIAL_EDGES));
    clearGraphFromStorage();
    showMessage("Graph cleared and reset to initial state");
  }, [setNodes, setEdges, showMessage]);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const transferData = event.dataTransfer.getData("application/json");
      if (!transferData) return;

      const nodeData = JSON.parse(transferData);
      const position = { x: NODE_SPACING.X * nodes.length, y: 0 };
      const newNode = createNewNode(nodeData, position);

      setNodes((prev) => calculateConnectionCounts([...prev, newNode], edges));
    },
    [nodes.length, edges, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      const validation = validateRoute(
        nodes,
        edges,
        params.source,
        params.target
      );

      if (!validation.isValid) {
        showMessage(validation.reason || "Invalid route");
        return;
      }

      const edgeId = generateEdgeId(params.source, params.target);
      const newEdge: EdgeType = {
        id: edgeId,
        source: params.source,
        target: params.target,
      };

      setEdges((eds) => {
        const nextEdges = addEdge(newEdge, eds);
        setNodes((curr) => calculateConnectionCounts(curr, nextEdges));
        return nextEdges;
      });

      showMessage("Route added successfully!");
    },
    [nodes, edges, setEdges, setNodes, showMessage]
  );

  return {
    nodes,
    edges,
    message,
    onNodesChange,
    onEdgesChange: handleEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    save,
    load,
    clear,
  };
};
