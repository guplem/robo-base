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
			style={{
				padding: '20px',
				height: '100vh',
				boxSizing: 'border-box', // include padding in the height calculations
				backgroundColor: '#f0f0f0',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
					backgroundColor: '#fff',
				}}
			>
				<div>
					<h1>Room Picker</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor='roomName'>Room Name</label>
						<input id='roomName' type='text' value={roomName} onChange={handleInputChange} />
						<button type='submit' disabled={roomName === ''}>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
