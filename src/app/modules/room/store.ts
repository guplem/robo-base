import { create, StoreApi, UseBoundStore } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
	room: string | null;
	join: (_roomName: string) => void;
	leave: () => void;
};

export const useRoomStore: UseBoundStore<StoreApi<Store>> = create<Store>()(
	persist<Store>(
		(set): Store => ({
			room: null,
			join: (roomName: string): void => set({ room: roomName }),
			leave: (): void => set({ room: null }),
		}),
		// PERSISTANCE CONFIGURATION
		{ name: 'roomStore' },
	),
);
