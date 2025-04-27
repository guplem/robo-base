import { RoomContext } from '@/app/contexts/room';
import Counter from '@/app/modules/counter/Counter';
import RoomPicker from '@/app/modules/room/RoomPicker';
import React, { JSX, useState } from 'react';
import { getState, setState } from 'robo.js';

export default function App(): JSX.Element {
	// Retrieve initial room from persistent state (RoboJS) or default to null
	const initialRoom: string | null = (getState('room') as string | null) ?? null;

	// Initialize React state for the current room selection
	const [room, setRoomLocal]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] =
		useState<string | null>(initialRoom);

	// Custom setter function that updates both RoboJS state and React state
	const setRoom: React.Dispatch<React.SetStateAction<string | null>> = (
		value: string | null | ((_prev: string | null) => string | null),
	): void => {
		if (typeof value === 'function') {
			// If updater function provided, compute new room value then persist it
			setRoomLocal((_prev: string | null) => {
				const newRoomValue: string | null = (value as (_prev: string | null) => string | null)(
					_prev,
				);
				setState('room', newRoomValue);
				return newRoomValue;
			});
		} else {
			// If direct value provided, persist and update state
			setState('room', value);
			setRoomLocal(value);
		}
	};

	return (
		// Provide room context to child components
		<RoomContext.Provider value={[room, setRoom]}>
			{/* Main container with noisy background styling */}
			<div
				className='noisyBackground'
				style={{
					backgroundColor: 'var(--background-for-noise)',
					overflow: 'auto',
					minHeight: '100vh',
				}}
			>
				{/* Show RoomPicker when no room is selected, otherwise show Counter */}
				{!room ? <RoomPicker /> : <Counter />}
			</div>
		</RoomContext.Provider>
	);
}
