import { RoomStore, RoomStoreType } from '@/app/modules/room/store';
import React, { ChangeEvent, FormEvent, JSX, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RoomPickerProps extends React.HTMLAttributes<HTMLFormElement> {}

export default function RoomPicker({ style, ...props }: RoomPickerProps): JSX.Element {
	const { join }: RoomStoreType = RoomStore();

	// state for the text field
	const [roomFieldValue, setRoomFieldValue] = useState<string>('');

	const [error, setError] = useState<string | null>(null);

	// on submit, prevent reload, log and set the entered room name
	const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		const params: URLSearchParams = new URLSearchParams({ roomName: roomFieldValue });
		const response: Response = await fetch(`/api/room?${params.toString()}`, {
			method: 'HEAD',
		});
		if (!response.ok) {
			console.warn(`Room "${roomFieldValue}" does not exist`);
			setError(`Room "${roomFieldValue}" does not exist`);
			return;
		}

		setError(null);
		join(roomFieldValue);
	};
	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				...style,
			}}
			{...props}
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
				Join
			</button>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</form>
	);
}
