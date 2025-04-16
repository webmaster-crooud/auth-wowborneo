import { useParams, useRouter, useSearchParams } from "next/navigation";

export function CheckRequest() {
	const { email } = useParams();
	const router = useRouter();
	const decodeEmail: string = email ? decodeURIComponent(String(email)) : "";
	if (!decodeEmail || !decodeEmail.includes("@")) {
		router.push("/register");
	}

	const sParams = useSearchParams();
	const token = sParams.get("token");
	const notification = sParams.get("notification");

	return { decodeEmail, token, notification };
}
