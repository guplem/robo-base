import { useRoomStore } from '@/app/modules/room/store';
import React, { ChangeEvent, FormEvent, JSX, useState } from 'react';

export default function RoomCreator(): JSX.Element {
	const {
		join,
	}: {
		room: string | null;
		join: (_roomName: string) => void;
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
		</form>
	);
}
