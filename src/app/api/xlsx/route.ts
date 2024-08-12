import CobService from "@/services/cob.service";
import FileInputService from "@/services/fileinput.service";
import xlsxReader from "@/utils/xlsxReader";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
	const fileService = new FileInputService();
	const data = await request.formData();
	const sheet = data.get("xlsx") as Blob;
	const monthInput = data.get("month")?.toString();
	const sheetArrayBuffer = await fileService.convertToArrayBuffer(sheet);

	if (!(sheetArrayBuffer instanceof ArrayBuffer) || !monthInput) {
		return NextResponse.json(
			{error: "Planilha ou mês inválido"},
			{status: 400}
		);
	}

	try {
		const maxDateString = fileService.formatMonthString(monthInput);
		const json = await xlsxReader(sheetArrayBuffer);
		const cobs = new CobService().getCobs(json, maxDateString);
		return NextResponse.json({data: cobs, aRes: json}, {status: 200});
	} catch (error) {
		return NextResponse.json({error}, {status: 500});
	}

	// const patients = await inputService(sheet as File, monthInput.toString());
}
