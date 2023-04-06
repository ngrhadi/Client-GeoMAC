import { createContext, useContext } from 'react';
import { create, useStore } from 'zustand';

interface UsersInformation {
  id: string;
  setCurrentID: (id: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  users: {
    userName: string;
    email: string;
    company: string;
  };
  isLoggedIn: boolean;
  setUsers: () => void;
  userCount: object[];
  setUserCount: () => void;
  token: string;
  setToken: (token: string) => void;
}

export const usersStore = () =>
  create<UsersInformation>((set, get) => ({
    id: '',
    setCurrentID: (value: string) => set({ id: value }),
    userName: '',
    setUserName: (value: string) => set({ userName: value }),
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
    token: '',
    setToken: (value: string) => set({ token: value }),
  }));

export const UserContext = createContext<ReturnType<typeof usersStore> | null>(
  null
);

export const useContextUser = () =>
  useStore(useContext(UserContext)!, (state) => state.users);
export const useUserSetter = () =>
  useStore(useContext(UserContext)!, (state) => state.setUsers);
export const useCurrentUser = () =>
  useStore(useContext(UserContext)!, (state) => state.users.userName);
export const useUserCount = () =>
  useStore(useContext(UserContext)!, (state) => state.userCount.length);
export const useIdUser = () =>
  useStore(useContext(UserContext)!, (state) => state.id);
export const useIdUsers = () =>
  useStore(useContext(UserContext)!, (state) => state.setCurrentID);
export const useTokenUser = () =>
  useStore(useContext(UserContext)!, (state) => state.setToken);
export const useToken = () =>
  useStore(useContext(UserContext)!, (state) => state.token);
export const useUserNameCtx = () =>
  useStore(useContext(UserContext)!, (state) => state.setUserName);
export const useNameCtx = () =>
  useStore(useContext(UserContext)!, (state) => state.userName);
