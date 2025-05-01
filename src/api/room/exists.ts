import { Flashcore, RoboReply, RoboRequest } from 'robo.js';

// Get count from built-in KV database
// https://docs.roboplay.dev/robojs/flashcore
export default async (request: RoboRequest, reply: RoboReply): Promise<void> => {
	if (request.method !== 'GET') {
		reply.code(405).send('Method not allowed');
		return;
	}

	const allRooms: string[] = (await Flashcore.get<string[]>('rooms')) ?? [];

	const found: boolean = allRooms.some((room) => room === request.query.roomName);

	reply.code(200).send(JSON.stringify({ found: found }));
};
