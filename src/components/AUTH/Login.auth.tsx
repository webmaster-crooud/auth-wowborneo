"use client";
import AuthService from "@/services/auth.service";
import { errorAtom, loadingAtom } from "@/stores/main.store";
import { LoginCredentialInterface } from "@/types/auth.type";
// import { api } from "@/utils/api";
import { fetchError } from "@/utils/fetchError";
import { useAtom, useSetAtom } from "jotai";
import React, { useState } from "react";

export function LoginAuthentication() {
	const setError = useSetAtom(errorAtom);
	const [loading, setLoading] = useAtom(loadingAtom);

	const [credential, setCredential] = useState<LoginCredentialInterface>({ email: "", password: "" });
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCredential((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading({ field: "loading" });
		try {
			// await new Promise((resolve) => setTimeout(resolve, 1500));
			const response = await AuthService.login(credential, setError);
			console.log(response);
		} catch (error) {
			fetchError(error, setError);
		} finally {
			setLoading({ field: "" });
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="email" required name="email" placeholder="john.doe@mail.com" autoFocus value={credential.email} className="w-full inline-block mb-3 border border-black" onChange={handleInputChange} />
			<input type="password" required name="password" placeholder="john.doe@mail.com" value={credential.password} className="w-full inline-block mb-3 border border-black" onChange={handleInputChange} />
			<button type="submit">{loading.field === "register" ? "Loading" : "Simpan"}</button>
		</form>
	);
}
