import { writable } from 'svelte/store'

export const count = writable(0)
function increment() {
    
    count.update((n) => n + 1);
}

export const language = writable("en");

export const CodeSystem = writable("none")
export const Tabname = writable("Taxonomy")

export const Resuoces = writable()

export async function getJonResource(path) {
    const res = await fetch(path);
    if (res.ok) {
        return await res.json()
    } else {
        // Sometimes the API will fail!
        throw new Error('Request failed');
    }
}