export interface AccountFormInterface {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	photo: File | null;
}

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

export interface AccountResponse {
	email: string;
	status: "ACTIVED" | "BLOCKED" | "DISABLED" | "DELETED";
	role: {
		id: number;
		name: string;
	};
	user: User;
	createdAt: Date;
	updatedAt: Date;
}

export interface User {
	firstName: string;
	lastName: string;
	phone: string;
	status: string;
	photo: File | null;
}

export interface MessageResponse {
	message: string;
}
