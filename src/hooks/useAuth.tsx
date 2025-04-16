// src/hooks/useAuth.ts
import { accountAtom, isAuthenticatedAtom, isLoadingAtom } from "@/stores/auth.store";
import { useAtom } from "jotai";

export const useAuth = () => {
	const [account] = useAtom(accountAtom);
	const [isAuthenticated] = useAtom(isAuthenticatedAtom);
	const [isLoading] = useAtom(isLoadingAtom);

	return {
		account,
		isAuthenticated,
		isLoading,
	};
};
