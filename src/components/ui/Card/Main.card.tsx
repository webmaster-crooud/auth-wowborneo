"use client";
import React from "react";
import { motion } from "framer-motion";

type propsMainCard = {
	children: React.ReactNode;
	titlePage: string;
	description?: React.ReactNode;
};
export function MainCard({ children, titlePage, description }: propsMainCard) {
	return (
		<motion.div initial={{ x: "100rem", scale: 0 }} animate={{ x: "0", scale: 1 }} transition={{ duration: 0.5, delay: 2.3 }} exit={{ x: "-10rem" }} className="px-10 py-5 bg-white rounded-2xl w-full">
			<h1 className="text-center font-bold text-[40px]">{titlePage}</h1>
			{description && <p className="text-center leading-7 w-10/12 mx-auto text-sm text-[#959393] mt-5">{description}</p>}
			{children}
		</motion.div>
	);
}
