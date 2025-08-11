import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  type OnEdgesChange,
  type OnNodesChange,
  type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import RouteNode from "../nodes/routeNode/RouteNode";
import type { NodeElementType, EdgeType, NodeType } from "../../types";

const nodeTypes = { route: RouteNode };

export interface NodeChangeType {
  id: string;
  position: { x: number; y: number };
  data: NodeElementType;
}

interface IProps {
  nodes: Array<NodeType>;
  edges: Array<EdgeType>;
  onConnect: OnConnect;
  onNodesChange: OnNodesChange<NodeType>;
  onEdgesChange: OnEdgesChange<EdgeType>;
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
}

const defaultEdgeOptions = {
  style: { stroke: "#3b82f6", strokeWidth: 2 },
  type: "smoothstep",
  animated: false,
};

const RouteFlow = ({
  nodes,
  edges,
  onConnect,
  onNodesChange,
  onEdgesChange,
  onDrop,
  onDragOver,
}: IProps) => {
  return (
    <div
      style={{ width: "100vw", height: "100vh", color: "black" }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default RouteFlow;
