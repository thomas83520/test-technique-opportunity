import { Box, Fab } from "@mui/material";
import React from "react";
import { useUIStore } from "../../stores/uiStore";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useReactFlowStore from "../../stores/reactFlowStore";
import HistoryIcon from "@mui/icons-material/History";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { runFlow } from "../../utils";
import { useExecutionStore } from "../../stores/executionStore";

export default function StepControllers() {
  const { setOpenCreateNodeModal, setOpenHistoryDrawer } = useUIStore();
  const { resetNodes } = useReactFlowStore();
  const { resetJournals } = useExecutionStore();

  return (
    <Box
      style={{ position: "absolute", bottom: 20, right: 20 }}
      display="flex"
      columnGap={2}
    >
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpenCreateNodeModal(true)}
      >
        <AddIcon />
      </Fab>
      <Fab color="success" aria-label="add" onClick={() => runFlow()}>
        <PlayArrowIcon />
      </Fab>
      <Fab
        color="secondary"
        aria-label="add"
        onClick={() => setOpenHistoryDrawer(true)}
      >
        <HistoryIcon />
      </Fab>
      <Fab
        color="error"
        aria-label="add"
        onClick={() => {
          resetNodes();
          resetJournals();
        }}
      >
        <DeleteForeverIcon />
      </Fab>
    </Box>
  );
}
