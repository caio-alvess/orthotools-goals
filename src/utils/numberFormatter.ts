const numberFormatter = (
	num: number,
	type: "int" | "float" | "currency" | "string"
) => {
	const numsMap: Record<string, string | number> = {
		int: Math.round(num),
		float: num.toFixed(2),
		currency: num.toLocaleString("pt-br", {
			style: "currency",
			currency: "BRL",
		}),
		string: num < 10 ? `0${num}` : num.toString(),
	};

	return numsMap[type];
};

export default numberFormatter;
