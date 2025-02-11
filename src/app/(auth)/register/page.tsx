import { RegisterAuthentication } from "@/components/AUTH/Register.auth";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
	return {
		title: "Register | Wow Borneo",
	};
};

export default function RegisterPage() {
	return <RegisterAuthentication />;
}
