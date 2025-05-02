export default async (): Promise<Response> => {
	return new Response(JSON.stringify(null), {
		status: 404,
	});
};
