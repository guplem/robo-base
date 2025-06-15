import RoomCreator from '@/app/modules/room/creator';
import RoomPicker from '@/app/modules/room/picker';
import { RoomStore, RoomStoreType } from '@/app/modules/room/store';
import { UserStore } from '@/app/modules/user/store';
import React, { JSX, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RoomPageProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function RoomPage({ style, ...props }: RoomPageProps): JSX.Element {
	const [joiningRoom, setJoiningRoom] = useState(true);

	const { room, leave }: RoomStoreType = RoomStore();
	// This should not be possible, but just in case
	if (room) {
		return (
			<div
				// Div (container) that centers its child at its center
				className='centeredChildren'
				style={{
					minHeight: '100vh',
					minWidth: '100vw',
					flexDirection: 'column',
					...style,
				}}
				{...props}
			>
				<div
					// The centered div (element)
					style={{
						backgroundColor: 'var(--container)',
						borderRadius: '10px',
						padding: '20px',
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
					}}
				>
					<h1>Room already selected</h1>
					<p>The room you selected is: {room}</p>
					<button
						onClick={(): void => {
							leave();
						}}
					>
						Leave Room
					</button>
				</div>
			</div>
		);
	}
	// Show the room picker form
	return (
		<div
			// Div (container) that centers its child at its center
			className='centeredChildren'
			style={{
				minHeight: '100vh',
				minWidth: '100vw',
				flexDirection: 'column',
				...style,
			}}
			{...props}
		>
			<div
				// The centered div (element)
				style={{
					backgroundColor: 'var(--container)',
					borderRadius: '10px',
					padding: '20px',
				}}
			>
				<h1>Room Menu</h1>
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
					<button disabled={joiningRoom} onClick={() => setJoiningRoom(true)}>
						Join
					</button>
					<button disabled={!joiningRoom} onClick={() => setJoiningRoom(false)}>
						Create
					</button>
				</div>
				<div style={{ marginTop: '10px' }}>{joiningRoom ? <RoomPicker /> : <RoomCreator />}</div>
			</div>
			<p>User ID: {UserStore.getState().id}</p>
			{/* <button
				onClick={(): void => {
					UserStore.getState().setId();
				}}
			>
				Regenerate User ID
			</button> */}
		</div>
	);
}
