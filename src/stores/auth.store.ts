// src/stores/auth.store.ts
import { Account } from "@/types/auth.DTO";
import { atom } from "jotai";

export const accountAtom = atom<Account | null>(null);
export const isAuthenticatedAtom = atom((get) => !!get(accountAtom));
export const isLoadingAtom = atom<boolean>(true);
