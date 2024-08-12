"use client";

import {SetStateAction, useState} from "react";
import {Label} from "./ui/label";
import numberFormatter from "@/utils/numberFormatter";

interface IMonthSelect {
	monthData: React.Dispatch<SetStateAction<string | undefined>>;
}

const getDefaultMonth = () => {
	const date = new Date();
	const defaultMonth = numberFormatter(date.getMonth() + 1, "string");
	const defaultYear = date.getFullYear();

	return `${defaultYear}-${defaultMonth}`;
};

function MonthSelect({monthData}: IMonthSelect) {
	const [defaultMonth, setDefaultMonth] = useState(getDefaultMonth());
	monthData(defaultMonth);

	if (!monthData) return null;

	return (
		<>
			<Label
				className="opacity-90 sm:w-3/4 md:w-1/4 mx-auto block text-center"
				htmlFor="month"
			>
				Mês da planilha
			</Label>

			<div>
				<input
					type="month"
					className="mt-2 mb-6 border-slate-200 border p-2 rounded-md"
					value={defaultMonth}
					onChange={(e) => {
						setDefaultMonth(e.currentTarget.value);
						monthData(e.currentTarget.value);
					}}
				/>
			</div>
		</>
	);
}

export default MonthSelect;
