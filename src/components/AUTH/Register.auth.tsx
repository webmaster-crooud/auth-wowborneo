"use client";

import { errorAtom, loadingAtom } from "@/stores/main.store";
import { RegisterInterface } from "@/types/auth.type";
import { api } from "@/utils/api";
import { fetchError } from "@/utils/fetchError";
import { useAtom, useSetAtom } from "jotai";
import React, { useState } from "react";
import { InputForm } from "../ui/Form/Input.form";
import { IconLoader3 } from "@tabler/icons-react";
import { ApiSuccessResponse } from "@/types/main.type";

export const RegisterAuthentication = () => {
	const setError = useSetAtom(errorAtom);
	const [dataRegister, setDataRegister] = useState<RegisterInterface>({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
	const [loading, setLoading] = useAtom(loadingAtom);

	// console.log(localStorage.getItem("refreshToken"));
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDataRegister((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading({ field: "register" });
		try {
			const response: ApiSuccessResponse<{ data: { email: string } }> = await api.post(`${process.env.NEXT_PUBLIC_API}/auth/register`, dataRegister, {
				headers: { "Content-Type": "application/json" },
			});
			const { email } = response.data.data;
			if (email) {
				window.location.href = `/verify/${email}?notification=Berhasil mendaftar akun member, silahkan melanjutkan proses verifikasi.`;
			} else {
				console.error("Email tidak ditemukan dalam response:", email);
			}
		} catch (error) {
			fetchError(error, setError);
		} finally {
			setLoading({ field: "" });
		}
	};
	return (
		<>
			<form className="px-0 grid grid-cols-2 gap-x-5 gap-y-6 w-full my-5" onSubmit={handleSubmit}>
				<InputForm handleInputChange={handleInputChange} className="w-full" title="firstName" type="text" value={dataRegister.firstName} isRequired placeholder="John" label="First Name" />
				<InputForm handleInputChange={handleInputChange} className="w-full" title="lastName" type="text" label="Last Name" value={dataRegister.lastName} placeholder="Doe" />
				<InputForm handleInputChange={handleInputChange} className="w-full" isRequired title="email" type="email" value={dataRegister.email} placeholder="john.doe@example.com" />
				<InputForm handleInputChange={handleInputChange} className="w-full" isRequired title="phone" type="text" value={dataRegister.phone} placeholder="XXXX-XXXX-XXXX" />
				<InputForm handleInputChange={handleInputChange} className="w-full" isRequired title="password" type="password" value={dataRegister.password} placeholder="********" />
				<InputForm handleInputChange={handleInputChange} className="w-full" isRequired title="confirmPassword" label="Confirmation Password" type="password" value={dataRegister.confirmPassword} placeholder="********" />

				<button type="submit" onClick={() => handleSubmit} className="w-full bg-brown rounded-2xl text-white py-4 col-span-2 flex items-center justify-center gap-2 disabled:opacity-60" disabled={loading.field === "register"}>
					{loading.field === "register" ? (
						<>
							<IconLoader3 className="animate-spin" size={20} stroke={2} />
							<span>Loading...</span>
						</>
					) : (
						<span>Register</span>
					)}
				</button>
			</form>
		</>
	);
};
