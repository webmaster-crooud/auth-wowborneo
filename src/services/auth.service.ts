/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/auth.service.ts

import { accessTokenAtom } from "@/stores/auth.store";
import { Account, LoginCredentials, RefreshTokenResponse } from "@/types/auth.DTO";
import { ApiSuccessResponse } from "@/types/main.type";
import { api } from "@/utils/api";
import { ApiError } from "@/utils/ApiError";
import { atomToStore } from "@/utils/auth";
interface LoginSuccessResponse {
	redirect: string;
	account: Account;
}

const authService = {
	async login(credentials: LoginCredentials): Promise<ApiSuccessResponse<LoginSuccessResponse>> {
		try {
			const { data } = await api.post<ApiSuccessResponse<LoginSuccessResponse>>("/auth", credentials);
			return data;
		} catch (error) {
			throw error;
		}
	},

	async logout(): Promise<void> {
		try {
			await api.delete("/auth");
		} catch (error) {
			throw error;
		}
	},

	async refreshToken(): Promise<ApiSuccessResponse<RefreshTokenResponse>> {
		try {
			const { data } = await api.patch<ApiSuccessResponse<RefreshTokenResponse>>(
				"/auth",
				{},
				{
					withCredentials: true,
				}
			);
			atomToStore(accessTokenAtom, data.data.accessToken);
			return data;
		} catch (error) {
			throw error;
		}
	},

	async getAccount(): Promise<ApiSuccessResponse<Account> | null> {
		try {
			const response = await api.get<ApiSuccessResponse<Account>>("/auth");
			if (!response) return null;
			else return response.data;
		} catch (error) {
			console.error("Error in getAccount:", error);

			if ((error as any).response?.status === 401) {
				throw new ApiError("Access token expired", 401);
			} else {
				throw new ApiError("Failed to fetch account", (error as any).response?.status || 500);
			}
		}
	},

	// Di auth.service.ts
	async clearSession() {
		// Hapus cookie
		document.cookie = "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		document.cookie = "connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

		// Hapus local storage
		localStorage.removeItem("refreshToken");

		// Reset state Jotai
		atomToStore(accessTokenAtom, null);
	},
};

export default authService;
