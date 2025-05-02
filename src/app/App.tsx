import CounterPage from '@/app/modules/counter/Page';
import RoomPage from '@/app/modules/room/Page';
import { RoomStore } from '@/app/modules/room/store';
import { JSX } from 'react';

// The
export default function App(): JSX.Element {
	const {
		room,
	}: {
		room: string | null;
	} = RoomStore();

	return (
		<div
			className='noisyBackground'
			style={{
				backgroundColor: 'var(--background-for-noise)',
				overflow: 'auto',
				minHeight: '100vh',
			}}
		>
			{!room ? <RoomPage /> : <CounterPage />}
		</div>
	);
}
