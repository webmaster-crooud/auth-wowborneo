import { ErrorState } from "@/types/main.type";
import { atom } from "jotai";

export const errorAtom = atom<ErrorState>({
	message: "",
	errors: [],
});
export const setErrorAtom = atom(null, (get, set, error: ErrorState) => {
	set(errorAtom, error);
});
