import React, { ChangeEvent, FormEvent, JSX, useState } from 'react';

export default function RoomPicker(): JSX.Element {
	// state for the text field
	const [roomName, setRoomName]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>('');

	// update state on input change
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setRoomName(event.target.value);
	};

	// on submit, prevent reload and log the entered room name
	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		console.log(roomName);
	};

	return (
		<div
			// Div (container) that centers its child at its center
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<div
				// The centered div (element)
				style={{
					overflowY: 'auto', // Allow scrolling if the content overflows
				}}
			>
				<h1>Room Picker</h1>
				<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
					<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '5px' }}>
						<label htmlFor='roomName'>Room Name</label>
						<input id='roomName' type='text' value={roomName} onChange={handleInputChange} />
					</div>
					<button type='submit' disabled={roomName === ''}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
