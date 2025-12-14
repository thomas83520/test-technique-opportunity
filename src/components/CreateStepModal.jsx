import { Box, Button, Modal, Select, Slider, Typography } from "@mui/material";
import React from "react";
import { useUIStore } from "../stores/uiStore";
import BaseModal from "./ui/BaseModal";
import BaseSelect from "./ui/BaseSelect";
import { HADNLE_TYPE, NODE_TYPE, STEP_TYPE } from "../constants";
import { capitalizeFirstLetter } from "../utils";
import useReactFlowStore from "../stores/reactFlowStore";
import BaseTextField from "./ui/BaseTextField";
import { useNewStepStore } from "../stores/newStepStore";

export default function CreateStepModal() {
  const { openCreateNodeModal } = useUIStore();
  const { nodes, createNode, updateNode } = useReactFlowStore();
  const { formData, updateForm, isLocked, resetForm } = useNewStepStore();

  const getStepTypes = () => {
    const baseList = Object.values(STEP_TYPE).map((type) => ({
      value: type,
      label: capitalizeFirstLetter(type),
    }));

    if (formData.prevStep)
      return baseList.filter((item) => item.value !== STEP_TYPE.START);

    if (formData.id) {
      return baseList.filter(
        (item) => ![STEP_TYPE.END, STEP_TYPE.START].includes(item.value)
      );
    }

    return baseList;
  };

  const handleOnChange = ({ key, value }) => {
    updateForm(key, value);
  };

  const getPrevNodeOptions = () => {
    if (nodes.length > 0) {
      return nodes
        .filter((node) => node.type !== "end")
        .map((node) => ({
          value: node.id,
          label: node.data?.label
            ? `${node.data?.label}-${node.id}`
            : `${node.type}-${node.id}`,
        }));
    }
    return [];
  };

  const isPrevStepAction = (prevStep) => {
    const prevNode = nodes.find((node) => node.id === prevStep);
    return prevNode?.type === NODE_TYPE.ACTION;
  };

  const currentStepIsAction = () =>
    ![STEP_TYPE.START, STEP_TYPE.END].includes(formData.stepType);

  return (
    <BaseModal
      open={openCreateNodeModal}
      onClose={() => {
        resetForm();
      }}
      title={formData.id ? "Modifier une étape" : "Créer une étape"}
    >
      <Box display={"flex"} flexDirection={"column"} rowGap={2} my={2}>
        <BaseSelect
          label={"Type de l'étape"}
          name="stepType"
          value={formData.stepType}
          onChange={handleOnChange}
          options={getStepTypes()}
        />
        {formData.stepType && currentStepIsAction() && (
          <BaseTextField
            label="Nom de l'étape"
            name="stepName"
            value={formData.stepName}
            onChange={handleOnChange}
          />
        )}
        {formData.stepType &&
          formData.stepType !== STEP_TYPE.START &&
          !formData.id && (
            <BaseSelect
              label="Connecter à l'étape"
              name="prevStep"
              value={formData.prevStep}
              onChange={handleOnChange}
              options={getPrevNodeOptions()}
              disabled={isLocked}
            />
          )}
        {formData.prevStep &&
          isPrevStepAction(formData.prevStep) &&
          !formData.id && (
            <BaseSelect
              label="Conditions de connexion"
              name="prevStepHandleType"
              value={formData.prevStepHandleType}
              onChange={handleOnChange}
              options={Object.values(HADNLE_TYPE).map((handleType) => ({
                value: handleType,
                label: capitalizeFirstLetter(handleType),
              }))}
              disabled={isLocked}
            />
          )}
        {formData.stepType && currentStepIsAction() && (
          <Box>
            <Typography>
              Chance de réussite - {formData.successRate}%
            </Typography>
            <Slider
              step={1}
              name="successRate"
              value={formData.successRate}
              onChange={(event) =>
                handleOnChange({
                  key: event.target.name,
                  value: event.target.value,
                })
              }
              disabled={formData.stepType !== STEP_TYPE.CUSTOM}
            />
          </Box>
        )}
        <Button
          variant="outlined"
          onClick={() => (formData.id ? updateNode(formData.id) : createNode())}
        >
          {formData.id ? "Modifier une étape" : "Créer une étape"}
        </Button>
      </Box>
    </BaseModal>
  );
}
