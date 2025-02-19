"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
export function Steps() {
	const pathName = usePathname();
	return (
		<div className="absolute bottom-10 left-14 grid grid-cols-4 gap-2 mt-10 items-center justify-center w-7/12">
			<motion.div initial={{ x: "50rem", opacity: 0, scale: 0 }} animate={{ x: "0", opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 2.3 }} className="h-1.5 w-full rounded-full bg-brown" />
			<motion.div initial={{ x: "50rem", opacity: 0, scale: 0 }} animate={{ x: "0", opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 2.5 }} className={`h-1.5 w-full rounded-full ${pathName.startsWith("/forgot-password/verify") ? "bg-brown" : "bg-df"}`} />
			<motion.div initial={{ x: "50rem", opacity: 0, scale: 0 }} animate={{ x: "0", opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 2.7 }} className="h-1.5 w-full rounded-full bg-df" />
			<motion.div initial={{ x: "50rem", opacity: 0, scale: 0 }} animate={{ x: "0", opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 2.9 }} className="h-1.5 w-full rounded-full bg-df" />
		</div>
	);
}
