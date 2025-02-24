import { Account } from "./account";

export interface RegisterInterface {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
}

export interface RegisterResponseInterface {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}

export interface LoginCredentialInterface {
	email: string;
	password: string;
	role: string;
}

export interface LoginReponseInterface {
	redirect: string;
	account: Account;
}
