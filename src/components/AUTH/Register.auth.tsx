"use client";

import { errorAtom, loadingAtom } from "@/stores/main.store";
import { RegisterInterface, RegisterResponseInterface } from "@/types/auth.type";
import { api } from "@/utils/api";
import { fetchError } from "@/utils/fetchError";
import { useAtom, useSetAtom } from "jotai";
import React, { useState } from "react";

export const RegisterAuthentication = () => {
	const setError = useSetAtom(errorAtom);
	const [dataRegister, setDataRegister] = useState<RegisterInterface>({ firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" });
	const [loading, setLoading] = useAtom(loadingAtom);
	console.log(dataRegister);

	// console.log(localStorage.getItem("refreshToken"));
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDataRegister((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading({ field: "register" });
		try {
			const { data } = await api.post<RegisterResponseInterface>("/auth/register", dataRegister);
			console.log(data);
		} catch (error) {
			fetchError(error, setError);
		} finally {
			setLoading({ field: "" });
		}
	};
	return (
		<>
			<form className="p-5" onSubmit={handleSubmit}>
				<input type="email" required name="email" placeholder="john.doe@mail.com" autoFocus value={dataRegister.email} className="w-full inline-block mb-3 border border-black" onChange={handleInputChange} />
				<input type="text" required name="firstName" placeholder="john.doe@mail.com" value={dataRegister.firstName} className="w-full inline-block mb-3 border border-black" onChange={handleInputChange} />
				<input type="text" required name="lastName" placeholder="john.doe@mail.com" value={dataRegister.lastName} className="w-full inline-block mb-3 border border-black" onChange={handleInputChange} />
				<input type="text" required name="phone" placeholder="john.doe@mail.com" value={dataRegister.phone} className="w-full inline-block mb-3 border border-black" onChange={handleInputChange} />
				<input type="password" required name="password" placeholder="john.doe@mail.com" value={dataRegister.password} className="w-full inline-block mb-3 border border-black" onChange={handleInputChange} />
				<input type="password" required name="confirmPassword" placeholder="john.doe@mail.com" value={dataRegister.confirmPassword} className="w-full inline-block mb-3 border border-black" onChange={handleInputChange} />
				<button type="submit">{loading.field === "register" ? "Loading" : "Simpan"}</button>
			</form>
		</>
	);
};
