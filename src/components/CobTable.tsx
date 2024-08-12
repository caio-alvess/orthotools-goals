import {CobType} from "@/services/cob.service";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

import getObjectKeys from "@/utils/getObjectKeys";
import numberFormatter from "@/utils/numberFormatter";
import {Suspense} from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const generateRows = (cobTypes: CobType) => {
	const cobList = getObjectKeys(cobTypes);
	const result = cobList.map((cobType) => {
		if (cobType == "_total") return;

		const name = cobTypes[cobType]._name;
		const amount = numberFormatter(cobTypes[cobType].amount, "currency");
		const quantity = cobTypes[cobType].quantity;

		return (
			<TableRow key={cobType} className="hover:bg-slate-200 cursor-default">
				{[name, quantity, amount].map((cell, idx) => {
					return <TableCell key={name + idx}>{cell}</TableCell>;
				})}
			</TableRow>
		);
	});
	return result;
};

interface ICobTable {
	monthData: string | undefined;
	sheetFile: Blob | undefined;
}

const getCobTableJson = async (monthData: string, sheetFile: Blob) => {
	const url = "/api/xlsx";

	const fd = new FormData();
	fd.append("xlsx", sheetFile);
	fd.append("month", monthData);

	const rawRes = await fetch(url, {
		method: "post",
		body: fd,
	});
	const jsonRes = (await rawRes.json()) as CobType;
	return jsonRes;
};

/* async function CobTable2({monthData, sheetFile}: ICobTable) {
	if (!monthData || !sheetFile) return null;

	// const cobTypes = await getCobTableJson(monthData, sheetFile);

	return (
		<Suspense fallback={<LoadingSkeleton />}>
			<div className="w-3/4 mx-auto mb-8">
				<Table>
					<TableCaption className="text-red-700">
						*ferramenta em fase beta.
					</TableCaption>
					<TableHeader>
						<TableRow className="[&>*]:text-center [&>*]:text-slate-700">
							<TableHead>Tipo</TableHead>
							<TableHead>Quantidade</TableHead>
							<TableHead>Total (R$)</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>{generateRows(cobTypes)}</TableBody>
				</Table>
			</div>
		</Suspense>
	);
} */

function CobTable({cobTypes}: {cobTypes: CobType | null}) {
	if (!cobTypes) return null;
	return (
		<div className="w-3/4 mx-auto mb-8">
			<Table>
				<TableCaption className="text-red-700">
					*ferramenta em fase beta.
				</TableCaption>
				<TableHeader>
					<TableRow className="[&>*]:text-center [&>*]:text-slate-700">
						<TableHead>Tipo</TableHead>
						<TableHead>Quantidade</TableHead>
						<TableHead>Total (R$)</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>{generateRows(cobTypes)}</TableBody>
			</Table>
		</div>
	);
}

export default CobTable;
