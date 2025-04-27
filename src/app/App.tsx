import { RoomContext } from '@/app/contexts/room';
import Counter from '@/app/modules/counter/Counter';
import RoomPicker from '@/app/modules/room/RoomPicker';
import { JSX, useState } from 'react';

// The
export default function App(): JSX.Element {
	const [room, setRoom] = useState<string | null>(null);

	return (
		<RoomContext.Provider value={[room, setRoom]}>
			<div
				className='noisyBackground'
				style={{
					backgroundColor: 'var(--background-for-noise)',
					overflow: 'auto',
					minHeight: '100vh',
				}}
			>
				{!room ? <RoomPicker /> : <Counter />}
			</div>
		</RoomContext.Provider>
	);
}
