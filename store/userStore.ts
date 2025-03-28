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
  user: IUser
  setUserData: ({ email, username, id, image, createdAt }: IUser) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  isSignedIn: false,
  user: {
    email: '',
    id: '',
    image: '',
    username: '',
    createdAt: ''
  },
  setUserData: (user) => set({ isSignedIn: user.email != '' ? true : false, user, })
}))