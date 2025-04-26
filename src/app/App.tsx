import Counter from '@/app/modules/counter/Counter';
import RoomPicker from '@/app/modules/room/RoomPicker';
import React, { createContext, JSX, useState } from 'react';

const RoomContext: React.Context<string | null> = createContext<string | null>(null);

export default function App(): JSX.Element {
	const [room, setRoom] = useState<string | null>(null);

	return (
		<RoomContext.Provider value={room}>
			<div className='noisyBackground' style={{ backgroundColor: 'var(--background-for-noise)' }}>
				{!room ? <RoomPicker /> : <Counter />}
			</div>
		</RoomContext.Provider>
	);
}
