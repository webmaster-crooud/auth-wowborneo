import { LoginAuthentication } from "@/components/AUTH/Login.auth";
import { MainCard } from "@/components/ui/Card/Main.card";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
	return {
		title: "Dashboard Login Page",
	};
}

export default function RootLoginPage() {
	return (
		<MainCard titlePage="Sign In" description="Conditions: 25% non-refundable deposit on confirmed booking. Full payment 30 days before departure Booking changes">
			<LoginAuthentication />
		</MainCard>
	);
}
