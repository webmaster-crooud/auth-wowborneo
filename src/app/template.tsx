"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { AnimatePresence } from "framer-motion";
import { LoadingComponent } from "@/components/ui/Loading";
import { MainNavbar } from "@/components/Navbar/Main.navbar";
import { usePathname } from "next/navigation";

export default function RootTemplate({ children }: { children: React.ReactNode }) {
	const pathName = usePathname();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulasikan preloading asset/data
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, []);
	return (
		<Suspense fallback={<Loading />}>
			<AnimatePresence>{isLoading && <LoadingComponent key="loading" />}</AnimatePresence>

			<main className="max-w-screen-2xl overflow-x-hidden mx-auto min-h-screen relative bg-f5 grid grid-cols-2">
				<div className="w-full h-full relative flex items-center justify-center px-14">
					<div className="flex flex-col gap-y-7 w-full">
						<Image src={"/icon.svg"} width={300} height={300} priority style={{ width: "180px", height: "auto" }} alt="Logo Wow Borneo" className="mx-auto" />

						{children}
					</div>
				</div>
				<div className={`h-full w-full ${pathName === "/" ? "bg-[url('/photos/customer-authentication.jpg')]" : "bg-[url('/photos/authentication.jpg')]"} bg-center bg-brown bg-no-repeat bg-cover relative`}>
					<MainNavbar />
				</div>
			</main>
		</Suspense>
	);
}
