import "./App.css";
import { ReactFlowProvider } from "@xyflow/react";
import Sidebar from "./containers/sidebar/Sidebar";
import { RouteFlow, ControlPanel } from "./components";
import { useGraphManager } from "./hooks";

function App() {
  const {
    nodes,
    edges,
    message,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    save,
    load,
    clear,
  } = useGraphManager();

  return (
    <ReactFlowProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 relative">
          <ControlPanel
            onSave={save}
            onLoad={load}
            onClear={clear}
            message={message}
          />

          <RouteFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onEdgesChange={onEdgesChange}
            onNodesChange={onNodesChange}
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
