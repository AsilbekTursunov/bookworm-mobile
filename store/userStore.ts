import { create } from 'zustand'

interface IUser {
  email: string,
  id: string,
  image: string,
  username: string,
  createdAt?: string

}
interface IUserStore {
  isSignedIn: boolean,
  user: IUser | null
  setUserData: (user: IUser | null) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  isSignedIn: false,
  user: null,
  setUserData: (user) => set({ isSignedIn: user?.email != '' ? true : false, user, })
}))