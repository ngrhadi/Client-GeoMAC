import { createContext, useContext } from 'react';
import { create, useStore } from 'zustand';

interface UsersInformation {
  id: string;
  setCurrentID: (id: string) => void;
  users: {
    userName: string;
    email: string;
    company: string;
  };
  isLoggedIn: boolean;
  setUsers: () => void;
  userCount: object[];
  setUserCount: () => void;
}

export const usersStore = () =>
  create<UsersInformation>((set, get) => ({
    id: '',
    setCurrentID: (value: string) => set({ id: value }),
    users: {
      userName: '',
      email: '',
      company: '',
    },
    isLoggedIn: false,
    setUsers: () =>
      set((state) => ({
        users: { ...state.users, isLoggedIn: true },
      })),
    userCount: [],
    setUserCount: () =>
      set({
        userCount: [{ users: get().users, userName: get().id }],
        id: '',
        users: {
          userName: '',
          email: '',
          company: '',
        },
      }),
  }));

export const UserContext = createContext<ReturnType<typeof usersStore> | null>(
  null
);

export const useContextUser = () =>
  useStore(useContext(UserContext)!, (state) => state.users);
export const useCurrentUser = () =>
  useStore(useContext(UserContext)!, (state) => state.users.userName);
export const useUserCount = () =>
  useStore(useContext(UserContext)!, (state) => state.userCount.length);
export const useIdUser = () =>
  useStore(useContext(UserContext)!, (state) => state.id);
export const useIdUsers = () =>
  useStore(useContext(UserContext)!, (state) => state.setCurrentID);
