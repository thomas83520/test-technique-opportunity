import { create } from "zustand";

export const useExecutionStore = create((set, get) => {
  return {
    journals: [],
    events: [],
    isRunning: false,
    setIsRunning: (isRunning) => set({ isRunning }),
    addJournal: (id) => {
      const now = new Date();
      set({
        isRunning: true,
        journals: [
          {
            id,
            date: now,
            name: now.toString(),
          },
        ].concat(get().journals),
      });
    },
    addEvent: (event) => {
      set({ events: get().events.concat(event) });
    },
    resetJournals: () => set({ journals: [], events: [] }),
  };
});
