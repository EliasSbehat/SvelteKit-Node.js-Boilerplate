import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load () {
	console.log("call load");
	const datas = await Promise.all([
		api.get(`rental/get`),
	]);
	return {datas};
};

/** @type {import('./$types').Actions} */
export const actions = {
    createRental: async ({ params, request }) => {
		const data = await request.formData();
		await api.post(
			`rental/add`,
			{
				name: data.get("name"),
				flag: data.get("flag"),
				addr: data.get("location"),
				image: data.get("propertyImage"),
				id: data.get("id")
			}
		);
	},
	/**
	 * Modify game state in reaction to a guessed word. This logic always runs on
	 * the server, so that people can't cheat by peeking at the JavaScript
	 */
	delete: async ({ params, request }) => {
		const data = await request.formData();
		await api.post(
			`rental/remove`,
			{
				ids: data.get("data")
			}
		);
	}
};