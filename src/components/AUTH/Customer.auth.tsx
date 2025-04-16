"use client";
import AuthService from "@/services/auth.service";
import { errorAtom, loadingAtom, notificationAtom } from "@/stores/main.store";
import { LoginCredentialInterface } from "@/types/auth.type";
// import { api } from "@/utils/api";
import { fetchError } from "@/utils/fetchError";
import { IconLoader } from "@tabler/icons-react";
import { useAtom, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { InputForm } from "../ui/Form/Input.form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function CustomerLoginAuthentication() {
	const setError = useSetAtom(errorAtom);
	const [loading, setLoading] = useAtom(loadingAtom);
	const sParams = useSearchParams();
	const setNotification = useSetAtom(notificationAtom);
	useEffect(() => {
		const notificationParam = sParams.get("notification");
		if (notificationParam) {
			setNotification({
				title: "Verifikasi Email Berhasil!",
				message: notificationParam,
			});
		}
	}, [setNotification, sParams]);

	const [credential, setCredential] = useState<LoginCredentialInterface>({ email: "", password: "", role: "" });
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
			const { data } = await AuthService.login(credential);
			const { redirect } = data;
			window.location.href = redirect;
		} catch (error) {
			fetchError(error, setError);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-y-5 py-8">
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
