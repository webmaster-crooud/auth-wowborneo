import { LoginCredentialInterface } from "@/types/auth.type";
import { SetStateAction } from "jotai";
import React from "react";
import { twMerge } from "tailwind-merge";

type propsRadioForm = {
	className?: string;
	credential: LoginCredentialInterface;
	setCredential: React.Dispatch<SetStateAction<LoginCredentialInterface>>;
	value: string;
};

export function RadioForm({ className, credential, setCredential, value }: propsRadioForm) {
	return (
		<button type="button" onClick={() => setCredential({ ...credential, role: value })} className={twMerge("border border-d6 rounded-2xl w-full text-black py-4 px-5 text-sm flex items-center justify-start gap-2", className)}>
			<div className={twMerge(`border border-9d rounded-full flex items-center justify-center w-4 h-4`, className)}>{credential.role === value && <div className="rounded-full w-2 h-2 bg-brown" />}</div>
			<span className="capitalize">{value}</span>
		</button>
	);
}
