import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/main";

export const metadata: Metadata = {
	title: "Wow Borneo | Authenticatin",
	description: "Authentication by Crooud SEO",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Providers>
				<body className={`antialiased`}>{children}</body>
			</Providers>
		</html>
	);
}
