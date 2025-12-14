import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge as reactFlowAddEdge,
} from "@xyflow/react";
import { initialNodes, STEP_TYPE } from "../constants";
import {
  getNode,
  getNodeTypeFromStepType,
  getSuccessRateFromType,
} from "../utils";
import { useNewStepStore } from "./newStepStore";
import _ from "lodash";

const getDataFromFormData = (formData) => {
  return {
    label: formData.stepName || formData.stepType,
    stepType: formData.stepType,
    successRate: getSuccessRateFromType(
      formData.stepType,
      formData.successRate
    ),
  };
};

const useReactFlowStore = create((set, get) => {
  const { resetForm, fromDragEdge } = useNewStepStore.getState();
  const addNode = (node) => {
    set({ nodes: get().nodes.concat(node) });
  };

  const addEdge = (edge) => {
    set({ edges: get().edges.concat(edge) });
  };

  const deleteNode = (nodeId) => {
    const newNodes = get().nodes.filter((node) => node.id !== nodeId);
    const edges = get().edges;

    const impactedEdges = _.remove(edges, (edge) => {
      return edge.source === nodeId || edge.target === nodeId;
    });

    set({ nodes: newNodes, edges });

    impactedEdges.forEach((edge) => {
      deleteNode(edge.target);
    });
  };

  return {
    nodes: initialNodes,
    edges: [],
    resetNodes: () => set({ nodes: initialNodes, edges: [] }),
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: reactFlowAddEdge({ ...connection, type: "custom" }, get().edges),
      });
    },
    onConnectionEnd: (event, connectionState, id, screenToFlowPosition) => {
      if (!connectionState.isValid) {
        const { clientX, clientY } =
          "changedTouches" in event ? event.changedTouches[0] : event;
        const position = screenToFlowPosition({
          x: clientX,
          y: clientY,
        });

        fromDragEdge(
          connectionState.fromNode.id,
          connectionState.fromHandle?.id ?? null,
          position
        );
      }
    },
    addNode,
    addEdge,
    setNodes: (nodes) => {
      set({ nodes });
    },
    setEdges: (edges) => {
      set({ edges });
    },
    updateNode: (nodeId) => {
      const { formData } = useNewStepStore.getState();
      const node = getNode(nodeId);
      if (!node) return;

      const nodes = _.filter(get().nodes, (node) => node.id !== nodeId);

      const newNode = { ...node, data: getDataFromFormData(formData) };

      set({ nodes: nodes.concat(newNode) });
      resetForm();
    },
    createNode: () => {
      const { formData } = useNewStepStore.getState();
      const id = (get().nodes.length + 1).toString();
      const newNode = {
        id,
        type: getNodeTypeFromStepType(formData.stepType),
        position: formData.position ?? { x: 150, y: 150 },
        data: getDataFromFormData(formData),
      };
      addNode(newNode);
      if (formData.stepType !== STEP_TYPE.START)
        addEdge({
          id: `edge-${formData.prevStep}-${id}`,
          source: formData.prevStep,
          sourceHandle: formData.prevStepHandleType,
          target: id,
          type: "custom",
        });
      resetForm();
    },
    deleteNode,
  };
});

export default useReactFlowStore;
