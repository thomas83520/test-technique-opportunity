import _ from "lodash";
import { HADNLE_TYPE, NODE_TYPE, STEP_TYPE } from "./constants";
import { useExecutionStore } from "./stores/executionStore";
import useReactFlowStore from "./stores/reactFlowStore";

export const getColorFromSourceHandler = (source) => {
  switch (source) {
    case HADNLE_TYPE.SUCCESS:
      return "green";
    case HADNLE_TYPE.FAIL:
      return "red";
    default:
      return "black";
  }
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getNodeTypeFromStepType = (stepType) => {
  switch (stepType) {
    case STEP_TYPE.START:
      return NODE_TYPE.START;
    case STEP_TYPE.END:
      return NODE_TYPE.END;
    default:
      return NODE_TYPE.ACTION;
  }
};

export const exportFlow = (jsonData) => {
  const dataStr = JSON.stringify(jsonData, null, 2); // Format JSON
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "data.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getSuccessRateFromType = (type, value = 50) => {
  switch (type) {
    case STEP_TYPE.EMAIL:
      return 50;

    case STEP_TYPE.SMS:
      return 85;

    case STEP_TYPE.CUSTOM:
      return value;

    default:
      return 100;
  }
};

export const runFlow = async () => {
  const { nodes } = useReactFlowStore.getState();
  const { addJournal, isRunning, setIsRunning } = useExecutionStore.getState();
  try {
    if (isRunning) return;

    const journalId = self.crypto.randomUUID();

    addJournal(journalId);

    const startNodes = nodes.filter((node) => node.type === NODE_TYPE.START);

    await Promise.all(startNodes.map((node) => handleNode(journalId, node)));
  } catch (error) {
    console.error(error);
  }

  setIsRunning(false);
};

const getNextNodes = (currentNode) => {
  const { edges } = useReactFlowStore.getState();
  const nextSuccessNodes = [];
  const nextFailNodes = [];
  const nextNodes = [];

  edges.forEach((edge) => {
    if (edge.source === currentNode.id) {
      const nextNode = getNode(edge.target);
      if (!nextNode) return;
      switch (edge.sourceHandle) {
        case HADNLE_TYPE.SUCCESS:
          nextSuccessNodes.push(nextNode);
          break;

        case HADNLE_TYPE.FAIL:
          nextFailNodes.push(nextNode);
          break;

        default:
          nextNodes.push(nextNode);
          break;
      }
    }
  });

  return { nextSuccessNodes, nextFailNodes, nextNodes };
};

export const getNode = (nodeId) => {
  const { nodes } = useReactFlowStore.getState();

  return _.find(nodes, (node) => node.id === nodeId);
};

const handleNode = async (journalId, currentNode) => {
  const { addEvent } = useExecutionStore.getState();
  addEvent({
    journalId,
    text: `Starting node ${currentNode.data?.label}-${currentNode.id}`,
  });
  const { nextSuccessNodes, nextFailNodes, nextNodes } =
    getNextNodes(currentNode);

  nextNodes.forEach((node) => handleNode(journalId, node));

  await delay(1000);

  if (currentNode.type === NODE_TYPE.ACTION) {
    const success =
      Math.floor(Math.random() * 101) <= currentNode.data.successRate;

    addEvent({
      id: self.crypto.randomUUID(),
      journalId,
      text: `Ending node ${currentNode.data?.label}-${currentNode.id} - ${
        success ? "Réussi" : "Echec"
      }`,
    });

    if (success)
      nextSuccessNodes.forEach((node) => handleNode(journalId, node));
    else nextFailNodes.forEach((node) => handleNode(journalId, node));
  }
};

const delay = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
