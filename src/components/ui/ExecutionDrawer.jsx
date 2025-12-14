import Drawer from "@mui/material/Drawer";
import { useUIStore } from "../../stores/uiStore";
import { Box } from "@mui/material";
import { useState } from "react";
import JournalHistory from "../drawer/journalHistory";
import Journals from "../drawer/journals";

export default function ExecutionDrawer() {
  const { openHistoryDrawer, setOpenHistoryDrawer } = useUIStore();
  const [selectedJournal, setSelectedJournal] = useState(null);

  return (
    <Drawer
      anchor={"right"}
      open={openHistoryDrawer}
      onClose={() => setOpenHistoryDrawer(false)}
    >
      <Box width={500}>
        {selectedJournal ? (
          <JournalHistory
            setSelectedJournal={setSelectedJournal}
            journalId={selectedJournal}
          />
        ) : (
          <Journals setSelectedJournal={setSelectedJournal} />
        )}
      </Box>
    </Drawer>
  );
}
