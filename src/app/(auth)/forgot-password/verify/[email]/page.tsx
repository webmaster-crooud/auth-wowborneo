"use client";
import { VerifyForgotPassword } from "@/components/AUTH/ForgotPasword/Verify";
import { MainCard } from "@/components/ui/Card/Main.card";
import { Steps } from "@/components/ui/Steps";
import { redirect, useParams } from "next/navigation";

export default function VerifyForgotPasswordPage() {
	const { email } = useParams();
	let decodeEmail;
	if (!email) {
		redirect("/register");
	} else {
		decodeEmail = decodeURIComponent(String(email));
		if (!decodeEmail.includes("@")) {
			redirect("/register");
		}
	}
	return (
		<>
			<MainCard
				titlePage="Forgot Password"
				description={
					<>
						We sent a code to <b className="text-black">{decodeEmail}</b>
					</>
				}
			>
				<VerifyForgotPassword email={decodeEmail} />
			</MainCard>
			<Steps />
		</>
	);
}
