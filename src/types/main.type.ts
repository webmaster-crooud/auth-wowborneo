export interface ErrorState {
	message: string;
	errors?: {
		field: string | undefined;
		message: string;
	}[];
}

export interface ApiErrorResponse {
	success: false;
	message: string;
	errors: Array<{ field?: string; message: string }>;
	stack?: string; // Hanya ada di development
}
