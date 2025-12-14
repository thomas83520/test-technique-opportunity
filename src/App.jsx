import { useRef } from "react";
import { ReactFlow, Background, useReactFlow, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import StartNode from "./components/react-flow/StartNode";
import EndNode from "./components/react-flow/EndNode";
import ActionNode from "./components/react-flow/ActionNode";
import useReactFlowStore from "./stores/reactFlowStore";
import CustomEdge from "./components/react-flow/CustomEdge";
import CreateStepModal from "./components/CreateStepModal";
import StepControllers from "./components/ui/StepControllers";
import { NODE_TYPE } from "./constants";
import ImportExport from "./components/ui/ImportExport";
import ExecutionDrawer from "./components/ui/ExecutionDrawer";

let id = 1;
const getId = () => `${id++}`;
const nodeOrigin = [0.5, 0];

const nodeTypes = {
  [NODE_TYPE.START]: StartNode,
  [NODE_TYPE.END]: EndNode,
  [NODE_TYPE.ACTION]: ActionNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

export default function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onConnectionEnd,
  } = useReactFlowStore((state) => state);

  const reactFlowWrapper = useRef(null);

  const { screenToFlowPosition } = useReactFlow();

  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeOrigin={nodeOrigin}
        onConnectEnd={(event, connectionState) =>
          onConnectionEnd(event, connectionState, getId(), screenToFlowPosition)
        }
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <StepControllers />
        <ImportExport />
        <Controls />
        <Background />
      </ReactFlow>
      <CreateStepModal />
      <ExecutionDrawer />
    </div>
  );
}
