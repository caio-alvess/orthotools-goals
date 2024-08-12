import React from "react";
import {Skeleton} from "./ui/skeleton";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

const CellSkeleton = () => {
	return <Skeleton className="w-44 h-4 mx-auto bg-slate-200" />;
};

const generateRows = (quantity: number) => {
	const rows = [];

	for (let i = 0; i < quantity; i++) {
		rows.push(
			<TableRow key={i}>
				<TableCell>
					<CellSkeleton />
				</TableCell>
				<TableCell>
					<CellSkeleton />
				</TableCell>
				<TableCell>
					<CellSkeleton />
				</TableCell>
			</TableRow>
		);
	}
	return rows;
};

function LoadingSkeleton() {
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
				<TableBody>{generateRows(7)}</TableBody>
			</Table>
		</div>
	);
}

export default LoadingSkeleton;
