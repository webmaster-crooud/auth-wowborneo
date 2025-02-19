import { ForgotPassword } from "@/components/AUTH/ForgotPasword";
import { MainCard } from "@/components/ui/Card/Main.card";
import { Steps } from "@/components/ui/Steps";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
	return {
		title: "Forgot Password",
	};
}

export default function ForgotPasswordPage() {
	return (
		<>
			<MainCard titlePage="Forgot Password">
				<ForgotPassword />
			</MainCard>
			<Steps />
		</>
	);
}
