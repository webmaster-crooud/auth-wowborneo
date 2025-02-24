"use client";

import { MainCard } from "@/components/ui/Card/Main.card";
import { errorAtom, loadingAtom, notificationAtom } from "@/stores/main.store";
import { ApiSuccessResponse } from "@/types/main.type";
import { api } from "@/utils/api";
import { fetchError } from "@/utils/fetchError";
import { IconArrowBack, IconLoader, IconLoader3, IconLockAccess, IconMailFast, IconWebhook } from "@tabler/icons-react";
import { useAtom, useSetAtom } from "jotai";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface InputOTPInterface {
	codeOne: string;
	codeTwo: string;
	codeThree: string;
	codeFour: string;
	codeFive: string;
}

export default function VerifyEmailPage() {
	const { email } = useParams();
	const router = useRouter();
	const decodeEmail: string = email ? decodeURIComponent(String(email)) : "";
	if (!decodeEmail || !decodeEmail.includes("@")) {
		router.push("/register");
	}

	const [OTP, setOTP] = useState<string>("");
	const setError = useSetAtom(errorAtom);
	const [loading, setLoading] = useAtom(loadingAtom);
	const sParams = useSearchParams();
	const setNotification = useSetAtom(notificationAtom);
	const [resendDisabled, setResendDisabled] = useState<boolean>(false);
	const [countdown, setCountdown] = useState<number>(300); // 5 minutes in seconds

	const pathname = usePathname();
	useEffect(() => {
		const notificationParam = sParams.get("notification");
		if (notificationParam) {
			setNotification({
				title: "Successfully Register New Member!",
				message: notificationParam,
			});
		}
	}, [setNotification, sParams]);

	const [inputOtp, setInputOtp] = useState<InputOTPInterface>({
		codeOne: "",
		codeTwo: "",
		codeThree: "",
		codeFour: "",
		codeFive: "",
	});

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading({ field: "verify" });
		try {
			const response = await api.post(
				`${process.env.NEXT_PUBLIC_API}/auth/verify?token=${OTP}`,
				{},
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			const { redirect } = response.data.data;
			if (redirect !== "") {
				window.location.href = `${redirect}`;
			}
		} catch (error) {
			fetchError(error, setError);
		} finally {
			setLoading({ field: "" });
		}
	};

	const formatCountdown = (count: number) => {
		const minutes = Math.floor(count / 60);
		const seconds = count % 60;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	const handleResendEmail = async () => {
		setLoading({ field: "resend" });
		try {
			const response = await api.patch<ApiSuccessResponse<{ data: { message: string }; message: string }>>(`${process.env.NEXT_PUBLIC_API}/auth/verify/resend/${decodeEmail}`, {
				headers: { "Content-Type": "application/json" },
			});

			const { message } = response.data.data;
			if (message !== "") {
				setResendDisabled(true);
				const intervalId = setInterval(() => {
					setCountdown((prev) => {
						if (prev <= 1) {
							clearInterval(intervalId);
							setResendDisabled(false);
							return 300;
						}
						return prev - 1;
					});
				}, 1000);
				setNotification({
					title: "Berhasil Mengirim Kode OTP",
					message: message,
				});
			}
		} catch (error) {
			fetchError(error, setError);
		} finally {
			setLoading({ field: "" });
		}
	};

	return (
		<>
			<MainCard
				titlePage="Verification Email Register"
				description={
					<>
						We sent a code to <b className="text-black">{decodeEmail}</b>
					</>
				}
			>
				<form onSubmit={handleSubmit} className="flex flex-col gap-y-5 py-8">
					<div className="grid grid-cols-5 gap-5">
						{inputNames.map((name, index) => (
							<input key={name} ref={inputRefs[index]} type="text" autoComplete="off" inputMode="numeric" pattern="[0-9]*" maxLength={1} name={name} value={inputOtp[name as keyof InputOTPInterface]} className="flex w-full items-center justify-center rounded-2xl p-3 text-center border-2 text-5xl font-bold border-d6 outline-none" onChange={handleChangeInputOTP} />
						))}
					</div>
					<button type="button" onClick={handleResendEmail} className="text-orange-600 font-semibold text-start flex items-center justify-start gap-2" disabled={resendDisabled}>
						{loading?.field === "resend" ? <IconLoader3 className="animate-spin" stroke={2} size={20} /> : resendDisabled ? <IconWebhook className="animate-spin" stroke={2} size={20} /> : <IconMailFast stroke={2} size={25} />}
						<span className="font-medium">{resendDisabled ? `Menunggu (${formatCountdown(countdown)})` : "Kirim Ulang OTP"}</span>
					</button>

					{/* Button */}
					<div className="flex items-center justify-center gap-5">
						<button type="button" onClick={() => router.push("/")} className="w-full bg-transparent border border-d6 text-black rounded-2xl py-4 flex items-center justify-center gap-2 disabled:opacity-60" disabled={loading.field === "verify"}>
							<IconArrowBack size={20} stroke={1.3} />
							<span>Back</span>
						</button>

						<button type="submit" className="w-full bg-brown rounded-2xl text-white py-4 flex items-center justify-center gap-2 disabled:opacity-60" disabled={loading.field === "verify"}>
							{loading.field === "verify" ? (
								<>
									<IconLoader className="animate-spin" size={20} stroke={2} />
									<span>Continue To Confirm</span>
								</>
							) : (
								<>
									<span>{pathname.startsWith("/verify") ? "Confirmation" : "Reset Password"}</span>
									<IconLockAccess size={20} stroke={2} />
								</>
							)}
						</button>
					</div>
				</form>
			</MainCard>
		</>
	);
}
