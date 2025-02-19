import { CustomerLoginAuthentication } from "@/components/AUTH/Customer.auth";
import { MainCard } from "@/components/ui/Card/Main.card";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
	return {
		title: "Customer Login Page | Wow Borneo",
	};
}

export default function CustomerLoginPage() {
	return (
		<MainCard titlePage="Sign In" description="Conditions: 25% non-refundable deposit on confirmed booking. Full payment 30 days before departure Booking changes">
			<CustomerLoginAuthentication />
		</MainCard>
	);
}
