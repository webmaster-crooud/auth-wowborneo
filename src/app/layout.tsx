import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/main";
import { ErrorAlert } from "@/components/ui/Alert/Error.alert";

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
			<body className={`antialiased`}>
				<Providers>
					<ErrorAlert />
					{children}
				</Providers>
			</body>
		</html>
	);
}
