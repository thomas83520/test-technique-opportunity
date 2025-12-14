import { Box, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  //   border: "2px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  padding: 4,
};

export default function BaseModal({ open, onClose, children, title }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box textAlign="center">
          <Typography variant="h5">{title}</Typography>
        </Box>
        {children}
      </Box>
    </Modal>
  );
}
