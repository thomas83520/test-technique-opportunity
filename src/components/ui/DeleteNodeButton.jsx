import { Box, IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import useReactFlowStore from "../../stores/reactFlowStore";

export default function DeleteNodeButton({ nodeId, showButton = true }) {
  const { deleteNode } = useReactFlowStore();

  return (
    <Box
      display={showButton ? "block" : "none"}
      position="absolute"
      sx={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
    >
      <IconButton
        aria-label="delete"
        onClick={() => deleteNode(nodeId)}
        sx={{ p: 0, backgroundColor: "white" }}
      >
        <DeleteOutline color="error" fontSize={"small"} />
      </IconButton>
    </Box>
  );
}
