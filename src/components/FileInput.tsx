import {Label} from "@radix-ui/react-label";
import React from "react";
import {Input} from "./ui/input";

type SheetHandler = (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;

function FileInput({sheetInputHandler}: {sheetInputHandler: SheetHandler}) {
	return (
		<>
			<Label
				className="opacity-90 sm:w-3/4 md:w-1/4 mx-auto block text-center"
				htmlFor="sheetFile"
			>
				Sua planilha
			</Label>

			<Input
				type="file"
				id="sheetFile"
				accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
				className="mt-2 mb-6 w-3/4 sm:w-2/4 md:w-1/4 mx-auto hover:opacity-80 hover:cursor-pointer transition-all"
				onChange={sheetInputHandler}
			/>
		</>
	);
}

export default FileInput;
