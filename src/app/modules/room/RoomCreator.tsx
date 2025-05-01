import { ChangeEvent, FormEvent, JSX, useState } from 'react';

export default function RoomCreator(): JSX.Element {
	// state for the text field
	const [roomFieldValue, setRoomFieldValue] = useState<string>('');

	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	// on submit, prevent reload, log and set the entered room name
	const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		const response: Response = await fetch('/api/room', {
			method: 'POST',
			body: JSON.stringify({ name: roomFieldValue }),
		});
		if (!response.ok) {
			const data: Record<string, unknown> = await response.json();
			console.warn(`Room creation failed: ${data.error}`);
			setError(data.error as string);
			return;
		} else {
			console.log(`Room "${roomFieldValue}" created successfully`);
			setSuccess('Room created successfully!');
		}
	};

	return (
		<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<div className='wrapWithStretchedChildren' style={{ gap: '5px' }}>
				<label htmlFor='roomName'>New Room Name</label>
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
				Create
			</button>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{success && <p style={{ color: 'green' }}>{success}</p>}
		</form>
	);
}
