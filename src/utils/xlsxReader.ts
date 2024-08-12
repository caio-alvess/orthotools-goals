import {read, utils} from "xlsx";

interface Patient {
	Paciente: string;
	Tipo: "MENSALIDADE" | "REINÍCIO" | "REINICIO PRE ATIVO" | "CONTENÇÃO (ATEND)";
	Recebido: number;
	Vencimento: "string";
	Recebimento: "string";
}

const xlsxReader = (xlsxFile: ArrayBuffer) => {
	return new Promise<Patient[]>((resolve, reject) => {
		const workbook = read(xlsxFile, {type: "buffer"});
		let jsonData: Patient[] = [];

		workbook.SheetNames.forEach((sheetName) => {
			const rowObject = utils.sheet_to_json(
				workbook.Sheets[sheetName]
			) as Patient[];
			jsonData = rowObject;
		});

		if (jsonData.length) {
			return resolve(jsonData);
		}

		return reject("unknown error");
	});
};
export default xlsxReader;
