import { WritableAtom } from "jotai";
import { getDefaultStore } from "jotai";
export function atomToStore<T>(atom: WritableAtom<T, [T], unknown>, newValue?: T): T {
	const store = getDefaultStore();
	if (arguments.length === 2) {
		store.set(atom, newValue as T);
	}
	return store.get(atom);
}
