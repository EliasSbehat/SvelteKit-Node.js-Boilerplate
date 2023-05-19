import { fail, redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({cookies}) {
	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	signin: async ({ cookies, request }) => {
		const data = await request.formData();
		const user = {
			username: data.get('name'),
			password: data.get('password')
		};

		const body = await api.post('auth/signin', { user });

		if (body.errors) {
            return fail(401, body);
        }
        console.log(body);
        if (body.state=="success") {
            const value = btoa(JSON.stringify(body));
            console.log(value);
            cookies.set('jwt', value, { path: '/' });
        }
        cookies.get('jwt')
		throw redirect(307, '/');
	},
	logout: async ({ cookies, locals }) => {
		cookies.delete('jwt', { path: '/' });
	}
};
