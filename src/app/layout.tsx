import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/main";
import { ErrorAlert } from "@/components/ui/Alert/Error.alert";
import { openSans } from "@/utils/fonts";
import { NotificationAlert } from "@/components/ui/Alert/Notification.alert";
import { AuthProvider } from "@/providers/Auth.provider";

export const metadata: Metadata = {
	title: "Wow Borneo | Authenticatin",
	description: "Authentication by Crooud SEO",
	icons: {
		icon: "/icon.svg",
	},
	authors: {
		name: "Mikael Aditya Nugroho",
		url: "https://mikaelan.vercel.app",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased ${openSans.className}`}>
				<Providers>
					<ErrorAlert />
					<NotificationAlert />
					<AuthProvider>{children}</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
