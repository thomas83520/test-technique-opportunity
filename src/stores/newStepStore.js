import { create } from "zustand";
import { useUIStore } from "./uiStore";
import { NODE_TYPE, STEP_TYPE } from "../constants";
import { getNode, getSuccessRateFromType } from "../utils";
import _ from "lodash";

const initialForm = {
  id: null,
  stepType: null,
  stepName: null,
  prevStep: null,
  prevStepHandleType: null,
  position: null,
  successRate: 50,
};

export const useNewStepStore = create((set, get) => {
  const { setOpenCreateNodeModal } = useUIStore.getState();
  return {
    formData: initialForm,
    isLocked: false,
    updateForm: (key, value) => {
      if (key === "stepType") {
        set({
          formData: {
            ...get().formData,
            successRate: getSuccessRateFromType(value),
          },
        });
      }
      set({
        formData: { ...get().formData, [key]: value },
      });
    },
    resetForm: () => {
      set({ formData: initialForm, isLocked: false });
      setOpenCreateNodeModal(false);
    },
    fromDragEdge: (prevStep, prevStepHandleType, position) => {
      set({
        isLocked: true,
        formData: { ...get().formData, prevStep, prevStepHandleType, position },
      });
      setOpenCreateNodeModal(true);
    },
    editNode: (nodeId) => {
      const node = getNode(nodeId);

      if (!node || node.type !== NODE_TYPE.ACTION) return;

      set({
        formData: {
          ...get().formData,
          stepName: node.data?.label,
          stepType: node.data?.stepType,
          successRate: node.data?.successRate,
          id: nodeId,
        },
      });
      setOpenCreateNodeModal(true);
    },
  };
});
