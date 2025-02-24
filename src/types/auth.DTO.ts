export interface Account {
	email: string;
	user: {
		firstName: string;
		lastName: string;
	};
	role: {
		name: "member" | "staff" | "owner" | "developer";
	};
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface LoginSuccessResponse {
	redirect: string;
}

export interface RefreshTokenResponse {
	accessToken: string;
}
