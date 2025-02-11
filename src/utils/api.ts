import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { ApiError } from "./ApiError";
import { ApiErrorResponse } from "../types/main.type";

const BASE_URL = process.env.NEXT_PUBLIC_API; // Sesuaikan dengan base URL backend Anda

// Buat instance axios
const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true, // Sertakan cookie untuk session management
});

// Interceptor untuk menambahkan CSRF token ke setiap request
let csrfToken: string | null = null;

api.interceptors.request.use(async (config) => {
	if (!csrfToken) {
		const csrfResponse = await axios.get<{ csrfToken: string }>(`${BASE_URL}/csrf-token`, {
			withCredentials: true,
		});
		csrfToken = csrfResponse.data.csrfToken;
	}
	config.headers["X-CSRF-Token"] = csrfToken;
	return config;
});

// Error handler untuk response
api.interceptors.response.use(
	(response) => response,
	(error: AxiosError<ApiErrorResponse>) => {
		if (error.response) {
			const { data, status } = error.response;

			// Jika ada validation errors
			if (data.errors && data.errors.length > 0) {
				throw new ApiError(data.message, status, data.errors);
			} else {
				// Jika tidak ada validation errors, anggap sebagai error umum
				throw new ApiError(data.message, status);
			}
		} else {
			throw new Error("Network Error");
		}
	}
);

// Variabel untuk mengelola refresh token
let isRefreshing = false;
let failedRequests: ((token?: string) => void)[] = [];

// Interceptor untuk refresh token secara otomatis
api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<ApiErrorResponse>) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean;
		};

		// Jika error 401 dan belum pernah mencoba refresh
		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				// Tambahkan request ke antrian
				return new Promise((resolve) => {
					failedRequests.push(() => {
						resolve(api(originalRequest));
					});
				});
			}

			isRefreshing = true;
			originalRequest._retry = true;

			try {
				// Lakukan refresh token
				await api.patch("/auth", {}, { withCredentials: true });
				isRefreshing = false;

				// Jalankan kembali request yang gagal
				failedRequests.forEach((cb) => cb());
				failedRequests = [];

				// Ulang request original
				return api(originalRequest);
			} catch (refreshError) {
				isRefreshing = false;
				failedRequests = [];

				// Redirect ke halaman login jika refresh gagal
				window.location.href = process.env.NEXT_PUBLIC_BASE_URL + "/login";
				return Promise.reject(refreshError);
			}
		}

		// Jika bukan error 401, lempar error seperti biasa
		return Promise.reject(error);
	}
);

export { api };
