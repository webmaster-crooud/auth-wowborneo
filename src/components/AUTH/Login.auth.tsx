"use client";
import { errorAtom, loadingAtom } from "@/stores/main.store";
import { LoginCredentialInterface } from "@/types/auth.type";
// import { api } from "@/utils/api";
import { fetchError } from "@/utils/fetchError";
import { IconLoader } from "@tabler/icons-react";
import { useAtom, useSetAtom } from "jotai";
import React, { useState } from "react";
import { InputForm } from "../ui/Form/Input.form";
import Link from "next/link";
import authService from "@/services/auth.service";

export function LoginAuthentication() {
	const setError = useSetAtom(errorAtom);
	const [loading, setLoading] = useAtom(loadingAtom);

	const [credential, setCredential] = useState<LoginCredentialInterface>({ email: "", password: "", role: "" });
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCredential((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading({ field: "login" });

		try {
			const { data } = await authService.login(credential);
			const { redirect } = data;
			console.log(redirect);

			window.location.href = redirect;
		} catch (err) {
			fetchError(err, setError);
		} finally {
			setLoading({ field: "" });
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-y-5 my-5">
			<InputForm value={credential.email} isRequired handleInputChange={handleInputChange} title="email" type="email" placeholder="Enter your email" />
			<InputForm value={credential.password} isRequired handleInputChange={handleInputChange} title="password" type="password" placeholder="********" />

			<div className="flex items-center justify-between gap-5 -mt-3 ps-3">
				<div className="flex items-center gap-2 justify-start">
					<input type="checkbox" />
					<label htmlFor="labelRememberMe" className="text-sm text-7e">
						Remember Me
					</label>
				</div>
				<Link href={"/forgot-password"} className="text-sm text-brown font-bold">
					Forgot password
				</Link>
			</div>

			<button type="submit" className="w-full bg-brown rounded-2xl text-white py-4 flex items-center justify-center gap-2 disabled:opacity-60" disabled={loading.field === "login"}>
				{loading.field === "login" ? (
					<>
						<IconLoader className="animate-spin" size={20} stroke={2} />
						<span>Loading...</span>
					</>
				) : (
					<span>Login</span>
				)}
			</button>
		</form>
	);
}
