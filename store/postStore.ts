import { create } from "zustand"

export interface IData {
  id: string,
  title: string,
  caption: string,
  image: string,
  rate: string,
  user: {
    id: string,
    username: string,
    image: string
  },
  createdAt: string
}

interface IDataStore {
  setData: (data: IData[]) => void,
  data: IData[] | null,
}

export const useDataStore = create<IDataStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}))