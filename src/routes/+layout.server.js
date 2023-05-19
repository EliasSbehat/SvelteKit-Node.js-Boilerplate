
/** @type {import('./$types').PageServerLoad} */
export async function load({cookies}) {
    console.log(cookies.get('jwt'));
	return {
        jwt: cookies.get('jwt')
    };
}