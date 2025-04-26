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
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'red',
				minHeight: '100vh',
			}}
		>
			<div
				style={{
					backgroundColor: 'green',
					maxHeight: '100vh',
				}}
			>
				{/* The actual contents: */}
				<div>
					<h1>Room Picker</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor='roomName'>Room Name</label>
						<input id='roomName' type='text' value={roomName} onChange={handleInputChange} />
						<button type='submit' disabled={roomName === ''}>
							Submit
						</button>
					</form>
					{/* In the future, this content under the orm will be generated dynamically, and sometimes it won't fit */}
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					<p>Enter a room name to join or create a new room.</p>
					{/* <p>
						{' '}
						a room name to join or create a new room. Enter a room name to join or create a new room. a room name to
						join or create a new room. a room name to join or create a new room. a room name to join or create a new
						room. a room name to join or create a new room.
					</p> */}
				</div>
			</div>
		</div>
	);
}
