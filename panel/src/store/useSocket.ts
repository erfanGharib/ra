import { create } from 'zustand';
import { websocketUrl } from '../global/baseurl';

export interface T_SocketState {
    client: WebSocket
}

export type T_SocketActions = {
    connect: () => void;
}

export const useSocketStore = create<T_SocketState & T_SocketActions>(set => ({
    connect: () => set({ client: new WebSocket(websocketUrl) }),
    client: null
})); 