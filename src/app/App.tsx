import React, { createContext, JSX, useState } from 'react'
import Counter from './modules/counter/Counter'
import RoomPicker from './modules/room/RoomPicker'

const RoomContext: React.Context<string | null> = createContext<string | null>(null)

export default function App(): JSX.Element {
	const [room, setRoom] = useState<string | null>(null)

	return <RoomContext.Provider value={room}>{!room ? <RoomPicker /> : <Counter />}</RoomContext.Provider>
}
