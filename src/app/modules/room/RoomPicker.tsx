import { useRoomStore } from '@/app/modules/room/store';
import React, { ChangeEvent, FormEvent, JSX, useState } from 'react';

export default function RoomPicker(): JSX.Element {
	const {
		room,
		join,
		leave,
	}: {
		room: string | null;
		join: (_roomName: string) => void;
		leave: () => void;
	} = useRoomStore();

	// state for the text field
	const [roomFieldValue, setRoomFieldValue]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = useState<string>('');

	// on submit, prevent reload, log and set the entered room name
	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		join(roomFieldValue);
	};

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
				}}
			>
				{/* The centered elements */}
				<h1>Room already selected</h1>
				<p>The room you selected is: {room}</p>
				<button
					onClick={(): void => {
						leave();
						setRoomFieldValue('');
					}}
				>
					Leave Room
				</button>
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
			}}
		>
			<div
				// The centered div (element)
				style={{
					backgroundColor: 'var(--container)',
					borderRadius: '10px',
					padding: '20px',
				}}
			>
				<h1>Room Picker</h1>
				<form
					onSubmit={handleSubmit}
					style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
				>
					<div className='wrapWithStretchedChildren' style={{ gap: '5px' }}>
						<label htmlFor='roomName'>Room Name</label>
						<input
							id='roomName'
							type='text'
							value={roomFieldValue}
							onChange={(event: ChangeEvent<HTMLInputElement>): void =>
								setRoomFieldValue(event.target.value)
							}
							autoFocus
						/>
					</div>
					<button type='submit' disabled={roomFieldValue === ''}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
