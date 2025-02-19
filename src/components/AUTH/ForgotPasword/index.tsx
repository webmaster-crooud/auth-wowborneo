"use client";
import { InputForm } from "@/components/ui/Form/Input.form";
import { errorAtom } from "@/stores/main.store";
import { fetchError } from "@/utils/fetchError";
import { IconArrowBack, IconLoader, IconLockAccess } from "@tabler/icons-react";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function ForgotPassword() {
	const [loading, setLoading] = useState<{ field: string }>({ field: "" });
	const router = useRouter();
	const [email, setEmail] = useState<string>("");
	const setError = useSetAtom(errorAtom);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading({ field: "forgot" });
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			router.push(`/forgot-password/verify/${email}`);
		} catch (error) {
			fetchError(error, setError);
		} finally {
		}
	};
	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-y-5 py-8">
			<InputForm value={email} isRequired handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} title="email" type="email" placeholder="Enter your email" />

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
		</form>
	);
}
