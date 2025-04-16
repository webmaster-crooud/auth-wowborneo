"use client";

import { MainCard } from "@/components/ui/Card/Main.card";
import { InputForm } from "@/components/ui/Form/Input.form";
import { errorAtom, loadingAtom, notificationAtom } from "@/stores/main.store";
import { api } from "@/utils/api";
import { CheckRequest } from "@/utils/CheckRequest";
import { fetchError } from "@/utils/fetchError";
import { IconLoader3 } from "@tabler/icons-react";
import { useAtom, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";

export default function ResetPasswordPage() {
	const { decodeEmail, notification, token } = CheckRequest();
	const setNotification = useSetAtom(notificationAtom);
	useEffect(() => {
		if (notification) {
			setNotification({
				title: "Reset Password",
				message: notification,
			});
		}
	}, [notification, setNotification]);

	const setError = useSetAtom(errorAtom);
	const [loading, setLoading] = useAtom(loadingAtom);
	const [body, setBody] = useState<{ password: string; confirmPassword: string }>({ password: "", confirmPassword: "" });
	console.log(decodeEmail, token);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setBody((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setLoading({ field: "changePassword" });
			const { data } = await api.patch(`${process.env.NEXT_PUBLIC_API}/auth/change-password`, {
				email: decodeEmail,
				token,
				password: body.password,
				confirmPassword: body.confirmPassword,
			});
			const { redirect } = data.data;
			window.location.href = redirect;
		} catch (error) {
			fetchError(error, setError);
		} finally {
			setLoading({ field: "" });
		}
	};

	return (
		<MainCard titlePage="Change Password" description="Change your password, and make sure isn't like with your old password">
			<form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
				<InputForm title="password" type="password" value={body.password} isRequired placeholder="********" handleInputChange={handleChangeInput} />
				<InputForm title="confirmPassword" label="Confirm Password" type="password" value={body.confirmPassword} isRequired placeholder="********" handleInputChange={handleChangeInput} />

				<button type="submit" className="w-full bg-brown rounded-2xl text-white py-4 col-span-2 flex items-center justify-center gap-2 disabled:opacity-60" disabled={loading.field === "changePassword"}>
					{loading.field === "changePassword" ? (
						<>
							<IconLoader3 className="animate-spin" size={20} stroke={2} />
							<span>Loading...</span>
						</>
					) : (
						<span>Register</span>
					)}
				</button>
			</form>
		</MainCard>
	);
}
