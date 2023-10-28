//global store by using zustand to track whether we have clicked on this or not.
import { create } from "zustand";

interface SettingStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSetting = create<SettingStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
