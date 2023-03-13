import { create } from "zustand";

type PkData = {
  pkData: string;
  detailId: string;
  setPkData: (pkData: string) => void;
  setDetail: (detId: string) => void;
};

const useStore = create<PkData>((set) => ({
  pkData: "red",
  detailId: "1",
  setPkData: (pkData) => set({ pkData }),
  setDetail: (detId) => set({ detailId: detId }),
}));

export default useStore;
