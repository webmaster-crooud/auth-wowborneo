import type { Config } from "tailwindcss";

export default {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				f5: "#F5F5F5",
				brown: "#CD5A05",
				d6: "#D6D6E0",
				"9d": "#9D9FBA",
				"7e": "#7E7E7F",
				df: "#DFDFDF",
			},
		},
	},
	plugins: [],
} satisfies Config;
