"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuNavbarInterface {
	title: string;
	url: string;
}

const menuNavbar: MenuNavbarInterface[] = [
	{
		title: "Home",
		url: `${process.env.NEXT_PUBLIC_HOME}`,
	},
	{
		title: "River Cruise",
		url: "/river-cruise",
	},
	{
		title: "Boats",
		url: "/boats",
	},
	{
		title: "Explore",
		url: "/explore",
	},
];

export function MainNavbar() {
	const pathName = usePathname();
	return (
		<motion.nav initial={{ y: "-10rem", opacity: "0" }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 2.1 }} className="absolute w-full max-w-screen-2xl top-0 right-0 left-0 flex items-center justify-end px-12 py-6 bg-white/20 backdrop-blur-sm z-50 gap-3 shadow-md">
			{menuNavbar.map((menu, i) => (
				<Link className="font-bold text-sm hover:scale-110 duration-200 transition-all ease-in-out bg-transparent px-4 py-2 hover:bg-brown rounded-full hover:text-white" href={menu.url} key={i}>
					{menu.title}
				</Link>
			))}

			<div className="w-[1px] bg-7e h-10" />
			{pathName === "/login" ? (
				<Link className="font-bold text-sm hover:scale-110 duration-200 transition-all ease-in-out px-4 py-2 border-brown bg-brown/10 border hover:bg-brown rounded-full hover:text-white" href={"/"} key={0}>
					Agen / Admin
				</Link>
			) : (
				<Link className="font-bold text-sm hover:scale-110 duration-200 transition-all ease-in-out px-4 py-2 border-brown bg-brown/10 border hover:bg-brown rounded-full hover:text-white" href={"/login"} key={1}>
					Customer
				</Link>
			)}
		</motion.nav>
	);
}
