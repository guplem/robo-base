import { useRoomStore } from '@/app/modules/room/store';
import { JSX, MouseEvent, useEffect, useState } from 'react';

export default function Counter(): JSX.Element {
	const { count, increment }: { count: number; increment: () => void } = useCounter();
	const {
		room,
		leave,
	}: {
		room: string | null;
		leave: () => void;
	} = useRoomStore();

	return (
		<div
			// Div (container) that centers its child at its center
			className='centeredChildren'
			style={{
				minHeight: '100vh',
				minWidth: '100vw',
				flexDirection: 'column',
			}}
		>
			<div
				// The centered div (element)
				style={{
					backgroundColor: 'var(--container)',
					borderRadius: '10px',
					padding: '20px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<h1>Current count</h1>
				<p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0' }}>{count}</p>
				<button style={{ marginTop: '10px' }} onClick={increment}>
					Increase
				</button>
			</div>
			<small style={{ marginTop: '5px' }}>
				<a
					href='#' // With this, the link will visually look like a link, but it won't redirect to anything
					onClick={(e: MouseEvent<HTMLAnchorElement>): void => {
						e.preventDefault();
						leave();
					}}
				>
					Leave Room
				</a>{' '}
				{room}
			</small>
		</div>
	);
}

// Simple custom hook to use included APIs for demo purposes
function useCounter(): { count: number; increment: () => void } {
	const [count, setCount] = useState<number>(0);

	useEffect(() => {
		const run = async (): Promise<void> => {
			const response: Response = await fetch('/api/get-count');
			const data: { count: number } = await response.json();
			setCount(data.count);
		};
		run();
	}, []);

	const increment = async (): Promise<void> => {
		const response: Response = await fetch('/api/set-count');
		const data: { count: number } = await response.json();
		setCount(data.count);
	};

	return { count, increment };
}
