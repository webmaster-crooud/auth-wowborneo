import { IconStarFilled } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";

type propsInputForm = {
	className?: string;
	value: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	title: string;
	type: "text" | "email" | "password" | "number";
	isRequired?: boolean;
	placeholder?: string;
};

export function InputForm({ className, value, handleInputChange, title, type, isRequired = false, placeholder }: propsInputForm) {
	return (
		<div>
			<label className="font-bold text-xl mb-3 flex items-center justify-start gap-1 capitalize" htmlFor={`label${title}`}>
				{title} {isRequired && <IconStarFilled size={7} stroke={2} className="text-red-500" />}
			</label>
			<input type={type} value={String(value)} name={title} required={isRequired} onChange={handleInputChange} placeholder={placeholder} className={twMerge("border outline-brown/60 border-d6 rounded-2xl w-full text-black py-4 px-6 text-sm", className)} />
		</div>
	);
}
