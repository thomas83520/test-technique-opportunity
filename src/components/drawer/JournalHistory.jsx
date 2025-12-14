import React from "react";
import { useExecutionStore } from "../../stores/executionStore";
import _ from "lodash";
import { Box, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function JournalHistory({ setSelectedJournal, journalId }) {
  const { journals, events } = useExecutionStore();

  const journal = _.find(journals, (journal) => journal.id === journalId);

  return (
    <Box my={1}>
      <Box
        display={"flex"}
        alignItems={"center"}
        columnGap={2}
        px={2}
        pb={2}
        onClick={() => setSelectedJournal(null)}
      >
        <ArrowBack />
        <Typography>Retour</Typography>
      </Box>
      <Typography variant="h5" textAlign="center">
        Journal du {journal?.name.split("GMT")[0]}
      </Typography>
      <Box display="flex" flexDirection={"column"} rowGap={4} my={1}>
        {events
          .filter((event) => event.journalId === journalId)
          .map((event) => (
            <Box
              sx={{
                cursor: "pointer",
                px: 2,
                display: "flex",
                alignItems: "center",
              }}
              key={event.id}
            >
              <Typography>- {event.text}</Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
