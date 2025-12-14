import { Box, Button } from "@mui/material";
import useReactFlowStore from "../../stores/reactFlowStore";
import { exportFlow } from "../../utils";
import { useRef } from "react";

export default function ImportExport() {
  const { nodes, edges, setNodes, setEdges } = useReactFlowStore();

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          if (jsonData.nodes) {
            setNodes(jsonData.nodes);
          }
          if (jsonData.edges) {
            setEdges(jsonData.edges);
          }
        } catch (err) {
          console.error("Error parsing JSON:", err);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid JSON file.");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 5,
        left: 20,
        display: "flex",
        columnGap: 2,
      }}
      zIndex={1000}
    >
      <Button
        variant="contained"
        onClick={() => {
          exportFlow({ nodes, edges });
        }}
      >
        Export
      </Button>
      <div>
        <input
          accept=".json"
          style={{ display: "none" }}
          id="json-upload"
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <label htmlFor="json-upload">
          <Button color="secondary" variant="contained" component="span">
            Import
          </Button>
        </label>
      </div>
    </Box>
  );
}
