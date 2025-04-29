import Counter from '@/app/modules/counter/Counter';
import RoomPicker from '@/app/modules/room/RoomPicker';
import { useRoomStore } from '@/app/modules/room/store';
import { JSX } from 'react';

// The
export default function App(): JSX.Element {
	const {
		room,
	}: {
		room: string | null;
	} = useRoomStore();

	return (
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
	);
}
