"use client";

import { IconArrowBack, IconLoader, IconLockAccess } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";

interface InputOTPInterface {
	codeOne: string;
	codeTwo: string;
	codeThree: string;
	codeFour: string;
	codeFive: string;
}

export function VerifyForgotPassword({ email }: { email: string }) {
	const [loading, setLoading] = useState<{ field: string }>({ field: "" });
	const router = useRouter();
	const [inputOtp, setInputOtp] = useState<InputOTPInterface>({
		codeOne: "",
		codeTwo: "",
		codeThree: "",
		codeFour: "",
		codeFive: "",
	});
	const [OTP, setOTP] = useState<string>("");

	const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

	const inputNames = ["codeOne", "codeTwo", "codeThree", "codeFour", "codeFive"];

	const handleChangeInputOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		// Validasi input harus angka atau string kosong
		if (value !== "" && !/^\d$/.test(value)) return;

		const currentIndex = inputNames.indexOf(name);
		if (currentIndex === -1) return;

		// Update state input
		setInputOtp((prev) => {
			const newState = { ...prev, [name]: value };
			const dataOTP = Object.values(newState).join("");
			setOTP(dataOTP);
			return newState;
		});

		// Handle focus
		if (value) {
			if (currentIndex < inputNames.length - 1) {
				inputRefs[currentIndex + 1].current?.focus();
			}
		} else {
			if (currentIndex > 0) {
				inputRefs[currentIndex - 1].current?.focus();
			}
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading({ field: "forgot" });
		console.log("Email:", email, "OTP:", OTP);
		// Tambahkan logika submit OTP disini
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-y-5 py-8">
			<div className="grid grid-cols-5 gap-5">
				{inputNames.map((name, index) => (
					<input key={name} ref={inputRefs[index]} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={1} name={name} value={inputOtp[name as keyof InputOTPInterface]} className="flex w-full items-center justify-center rounded-2xl p-3 text-center border-2 text-5xl font-bold border-d6 outline-none" onChange={handleChangeInputOTP} />
				))}
			</div>

			{/* Button */}
			<div className="flex items-center justify-center gap-5">
				<button type="button" onClick={() => router.push("/")} className="w-full bg-transparent border border-d6 text-black rounded-2xl py-4 flex items-center justify-center gap-2 disabled:opacity-60" disabled={loading.field === "forgot"}>
					<IconArrowBack size={20} stroke={1.3} />
					<span>Back</span>
				</button>
				<button type="submit" className="w-full bg-brown rounded-2xl text-white py-4 flex items-center justify-center gap-2 disabled:opacity-60" disabled={loading.field === "forgot"}>
					{loading.field === "forgot" ? (
						<>
							<IconLoader className="animate-spin" size={20} stroke={2} />
							<span>Continue To Confirm</span>
						</>
					) : (
						<>
							<span>Reset Password</span>
							<IconLockAccess size={20} stroke={2} />
						</>
					)}
				</button>
			</div>

			<p className="text-sm text-black">
				<b>Output</b> {OTP}
			</p>
		</form>
	);
}
