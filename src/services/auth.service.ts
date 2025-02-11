import { LoginCredentialInterface, LoginReponseInterface } from "@/types/auth.type";
import { ErrorState } from "@/types/main.type";
import { api } from "@/utils/api";
import { fetchError } from "@/utils/fetchError";

import { SetStateAction } from "jotai";

const AuthService = {
	async login(credentials: LoginCredentialInterface, setError: React.Dispatch<SetStateAction<ErrorState>>): Promise<LoginReponseInterface | unknown> {
		try {
			const { data } = await api.post<LoginReponseInterface>(`/auth`, credentials);

			return data;
		} catch (error) {
			fetchError(error, setError);
		}
	},
};

export default AuthService;
