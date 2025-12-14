import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function BaseSelect({
  label,
  value,
  onChange,
  options,
  name,
  disabled,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        value={value ?? ""}
        label={label}
        name={name}
        onChange={(event) => {
          onChange({ key: event.target.name, value: event.target.value });
        }}
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
