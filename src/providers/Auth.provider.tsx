"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { accountAtom, isLoadingAtom } from "@/stores/auth.store";
import authService from "@/services/auth.service";
import { ApiError } from "@/utils/ApiError";
import { usePathname, useRouter } from "next/navigation";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const setAccount = useSetAtom(accountAtom);
	const setIsLoading = useSetAtom(isLoadingAtom);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const initializeAuth = async () => {
			setIsLoading(true);

			try {
				// 1. Cek cookie accessToken atau session langsung
				const hasAccessToken = document.cookie.includes("accessToken");
				const hasSession = document.cookie.includes("connect.sid");

				// Jika tidak ada session sama sekali
				if (!hasAccessToken && !hasSession) {
					setAccount(null);
					return;
				}

				// 2. Coba ambil data akun
				const data = await authService.getAccount();
				setAccount(data?.data || null);
			} catch (error) {
				const apiError = error as ApiError;

				// 3. Handle 401 Unauthorized
				if (apiError.statusCode === 401) {
					try {
						// 4. Coba refresh token
						await authService.refreshToken();

						// 5. Retry get account setelah refresh
						const newResponse = await authService.getAccount();
						setAccount(newResponse?.data || null);
					} catch {
						// 6. Bersihkan session jika gagal refresh
						authService.clearSession();
						setAccount(null);

						// 7. Redirect hanya jika di protected route
						const isProtectedRoute = !pathname.startsWith("/auth");
						if (isProtectedRoute) {
							router.push(process.env.NEXT_PUBLIC_HOME!);
						}
					}
				} else {
					setAccount(null);
				}
			} finally {
				setIsLoading(false);
			}
		};

		initializeAuth();
	}, [setAccount, setIsLoading, router, pathname]);

	return children;
};
