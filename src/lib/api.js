import { error } from '@sveltejs/kit';

const base = 'http://localhost:4000/api';

async function send({ method, path, data="" }) {
	const opts = { method, headers: {} };
	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}
	const res = await fetch(`${base}/${path}`, opts);
	if (res.ok || res.status === 422) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	throw error(res.status);
}

export function post(path, data) {
	return send({ method: 'POST', path, data });
}

export function get(path) {
	return send({ method: 'POST', path });
}