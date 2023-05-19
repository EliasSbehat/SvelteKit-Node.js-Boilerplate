
/** @type {import('./$types').PageServerLoad} */
export async function load({cookies}) {
    console.log(cookies.get('jwt'));
	return {
        jwt: cookies.get('jwt')
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
	logout: async ({ cookies, locals }) => {
		cookies.delete('jwt', { path: '/' });
	}
};