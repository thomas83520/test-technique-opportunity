import { create } from "zustand";

export const useUIStore = create((set) => ({
  openCreateNodeModal: false,
  setOpenCreateNodeModal: (openCreateNodeModal) =>
    set(() => ({ openCreateNodeModal })),
  openHistoryDrawer: false,
  setOpenHistoryDrawer: (openHistoryDrawer) => set({ openHistoryDrawer }),
}));
