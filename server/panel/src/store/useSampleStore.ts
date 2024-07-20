import { create } from 'zustand';

export interface T_User {
    id: number;
    name: string;
    isOnline: boolean;
}

export type T_UserState = {
    data: T_User[],
    selectedUser: T_User;
}

export type T_UsersActions = {
    setData: (val: T_UserState['data']) => void
    setSelectedUser: (val: T_UserState['selectedUser']) => void,
}

export const useUsersStore = create<T_UserState & T_UsersActions>(set => ({
    data: [],
    selectedUser: null,
    setData: (val) => set({ data: val }),
    setSelectedUser: (val) => set({ selectedUser: val }),
})); 