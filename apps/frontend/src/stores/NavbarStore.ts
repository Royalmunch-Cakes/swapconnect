import { create } from "zustand";

interface NavbarStoreState {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  toggleExpanded: () => void;
}

const useNavbarStore = create<NavbarStoreState>((set) => ({
  expanded: false,
  setExpanded: (expanded) => set({ expanded }),
  toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
}));

export default useNavbarStore;
