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

function CobTable({cobTypes}: {cobTypes: CobType | null}) {
	if (!cobTypes) return null;
	return (
		<div className="w-3/4 mx-auto mb-4 ">
			<Table>
				<TableCaption className="text-slate-600">
					Confira se o mês está correto.
					<br />
					<span className="text-slate-400">
						Essa ferramenta está em fase beta
					</span>
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
