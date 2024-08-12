"use client";
import React, {Suspense, useState} from "react";
import {Button} from "../components/ui/button";
import MonthSelect from "@/components/MonthSelect";
import FileInputService from "@/services/fileinput.service";
import {CobType} from "@/services/cob.service";
import FileInput from "@/components/FileInput";
import {useToast} from "@/components/ui/use-toast";

const CobTable = React.lazy(() => import("@/components/CobTable"));

function SheetInput() {
	const [sheetFile, setSheetFile] = useState<Blob>();
	const [monthData, setMonthData] = useState<string>();
	const [patients, setPatients] = useState<CobType | null>(null);
	const {toast} = useToast();

	const setError = (errorMessage: string) => {
		return toast({
			title: "Erro",
			description: errorMessage,
			className: "bg-red-600",
			variant: "destructive",
		});
	};

	const sheetInputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const sheetFileInpt = await new FileInputService().getValidFile(e);

		sheetFileInpt
			? setSheetFile(sheetFileInpt)
			: setError("Por favor, selecione uma planilha válida");
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!sheetFile) {
			setError("Por favor, selecione uma planilha válida");
			return;
		}

		if (!monthData) {
			setError("Por favor, selecione um mês válido");
			return;
		}

		const fd = new FormData(e.currentTarget);
		fd.append("xlsx", sheetFile);
		fd.append("month", monthData);

		try {
			const rawRes = await fetch("/api/xlsx", {
				method: "post",
				body: fd,
			});

			if (rawRes.ok) {
				const jsonRes = await rawRes.json();
				setPatients(jsonRes.data);
			} else {
				if (rawRes.status == 400) throw new Error("Planilha ou mês inválido");
				if (rawRes.status == 500)
					throw new Error("Erro interno, tente novamente mais tarde");
			}
		} catch (error) {
			setError("Erro interno, tente novamente mais tarde.");
		}
	};

	return (
		<>
			<h2 className="font-bold mb-8 mt-8">Contas a Receber</h2>
			<form onSubmit={handleSubmit}>
				<MonthSelect monthData={setMonthData} />
				<FileInput sheetInputHandler={sheetInputHandler} />
				<CobTable cobTypes={patients} />

				<Button
					variant={"default"}
					type="submit"
					className="mb-4"
					// disabled={!sheetFile}
				>
					Enviar planilha
				</Button>
			</form>
		</>
	);
}

export default SheetInput;
