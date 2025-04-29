import { create, StoreApi, UseBoundStore } from 'zustand';

type Store = {
	room: string | null;
	join: (_roomName: string) => void;
	leave: () => void;
};

export const useRoomStore: UseBoundStore<StoreApi<Store>> = create<Store>()((set) => ({
	room: null,
	join: (roomName: string) => set((_state) => ({ room: roomName })),
	leave: () => set((_state) => ({ room: null })),
}));
