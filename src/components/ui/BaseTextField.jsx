import { Box, TextField } from "@mui/material";
import React from "react";

export default function BaseTextField({ name, label, value, onChange }) {
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { width: "100%" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label={label}
        variant="outlined"
        name={name}
        value={value ?? ""}
        onChange={(event) =>
          onChange({ key: event.target.name, value: event.target.value })
        }
      />
    </Box>
  );
}
