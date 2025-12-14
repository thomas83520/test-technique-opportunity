import React from "react";
import { useExecutionStore } from "../../stores/executionStore";
import { Box, Typography } from "@mui/material";
import { ArrowForward, ArrowRight } from "@mui/icons-material";

export default function Journals({ setSelectedJournal }) {
  const { journals } = useExecutionStore();

  return (
    <Box my={1}>
      <Typography variant="h5" textAlign="center">
        Historique des éxécutions
      </Typography>
      <Box display="flex" flexDirection={"column"} rowGap={4} my={1}>
        {journals.map((journal) => (
          <Box
            sx={{
              cursor: "pointer",
              px: 2,
              display: "flex",
              alignItems: "center",
              border: "1px solid lightgrey",
              justifyContent: "space-between",
            }}
            key={journal.id}
            onClick={() => setSelectedJournal(journal.id)}
          >
            <Typography>- {journal.name.split("GMT")[0]}</Typography>
            <ArrowForward />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
