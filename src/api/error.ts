import { RoboReply } from 'robo.js';

export default (reply: RoboReply): any => {
	reply.code(400).send('Demo error message');
};
