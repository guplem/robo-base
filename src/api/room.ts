import { Flashcore, logger, RoboReply, RoboRequest } from 'robo.js';

const roomsDatabaseKey: string = 'rooms';

export default async (request: RoboRequest, reply: RoboReply): Promise<void> => {
	if (request.method == 'HEAD') {
		await exists(request, reply);
		return;
	}

	if (request.method == 'POST') {
		await create(request, reply);
		return;
	}

	reply.code(405).send(`Method ${request.method} not allowed`);
};

const exists = async (request: RoboRequest, reply: RoboReply): Promise<void> => {
	const allRooms: string[] = (await Flashcore.get<string[]>(roomsDatabaseKey)) ?? [];
	const roomName: string | undefined = request.params.roomName as string | undefined;
	const found: boolean = allRooms.some((room) => room === roomName);

	// Because the HTTP method is HEAD, only status codes can be returned, no body
	if (found) {
		reply.code(200);
	} else {
		reply.code(404);
	}
};

const create = async (request: RoboRequest, reply: RoboReply): Promise<any> => {
	logger.info('Logger Creating room...');
	const body: Record<string, unknown> = request.body as Record<string, unknown>;
	logger.info('Body:', body);
	--- WTF why is there no body? ---
	const providedName: string | undefined = body.roomName as string | undefined;
	logger.info('providedName:', providedName);

	// Check the room name validity
	if (providedName === undefined || providedName === '') {
		reply.code(422).send('Room name is required');
		return;
	}
	if (providedName.length < 3) {
		reply.code(422).send('Room name must be at least 3 characters long');
		return;
	}
	if (providedName.length > 20) {
		reply.code(422).send('Room name must be at most 20 characters long');
		return;
	}
	if (!/^[a-zA-Z0-9_ ]+$/.test(providedName as string)) {
		reply.code(422).send('Room name can only contain letters, numbers, spaces and underscores');
		return;
	}

	// Check if the room name already exists
	const allRooms: string[] = (await Flashcore.get<string[]>(roomsDatabaseKey)) ?? [];
	logger.info(`All rooms: ${JSON.stringify(allRooms)}`);
	const found: boolean = allRooms.some((room) => room === request.query.roomName);
	if (found) {
		reply.code(409).send('Room already exists');
		return;
	}
	logger.info(`Room name "${providedName}" is valid. Ready to be created.`);

	await Flashcore.set<string[]>(roomsDatabaseKey, [...allRooms, providedName]);
	reply.code(200);
};
