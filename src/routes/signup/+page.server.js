import { fail, redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const user = {
			username: data.get('name'),
			email: data.get('email'),
			password: data.get('password')
		};

		const body = await api.post('auth/signup', { user });

		if (body.errors) {
			return fail(401, body);
		}
		const value = btoa(JSON.stringify(body.data));
        console.log(value);
		cookies.set('jwt', value, { path: '/' });

		throw redirect(307, '/');
	}
};
