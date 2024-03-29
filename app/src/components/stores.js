import { writable } from 'svelte/store'

export const count = writable(0)
function increment() {
    
    count.update((n) => n + 1);
}

export const language = writable("en");
export const CodeSystem = writable("none")
export const Tabname = writable("Taxonomy")

export const OpenTab = writable(1)
export const Resuoces = writable()
export const SearchObj = writable({})
export const Arguments = writable([])
export const Concept = writable({})
export const schpanel = writable("invisible");
export const Openkey = writable("")
export async function getJonResource(path) {
    const res = await fetch(path);
    if (res.ok) {
        return await res.json()
    } else {
        // Sometimes the API will fail!
        throw new Error('Request failed');
    }
}

//検索履歴
const store = new Map();

export function getHistry(userid) {
	if (!store.has(userid)) {
		createHistry({ userid, description: 'Get Histry of store Map Database' });
	}

	return Array.from(store.get(userid).values());
}

export function createHistry({ userid, description }) {
	if (!store.has(userid)) {
		store.set(userid, new Map());
	}

	const history = store.get(userid);

	const id = crypto.randomUUID();

	history.set(id, {
		id,
		description,
		done: false
	});

	return {
		id
	};
}

export function toggleHistry({ userid, id, done }) {
	const history = store.get(userid);
	history.get(id).done = done;
}

export function deleteHistry({ userid, id }) {
	const history = store.get(userid);
	history.delete(id);
}