import { RegisterAuthentication } from "@/components/AUTH/Register.auth";
import { MainCard } from "@/components/ui/Card/Main.card";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
	return {
		title: "Register | Wow Borneo",
	};
};

export default function RegisterPage() {
	return (
		<MainCard titlePage="Sign Up" description="Conditions: 25% non-refundable deposit on confirmed booking. Full payment 30 days before departure Booking changes">
			<RegisterAuthentication />
		</MainCard>
	);
}
