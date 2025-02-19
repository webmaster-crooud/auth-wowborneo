"use client";
import { openSans } from "@/utils/fonts";
import { IconLoader3 } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function LoadingComponent() {
	return (
		<motion.div
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{
				y: "-100rem", // pindah ke atas
				display: "hidden",
				transition: { duration: 0.5 },
			}}
			className={`w-full absolute top-0 left-0 right-0 h-screen bg-white z-50 flex items-center justify-center ${openSans.className}`}
		>
			<IconLoader3 className="animate-spin" size={20} stroke={2} />
			<span className="font-bold text-lg text-black ml-2">Loading...</span>
		</motion.div>
	);
}
