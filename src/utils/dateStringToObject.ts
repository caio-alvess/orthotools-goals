interface Config {
	asString?: boolean;
}

const dateStringToObject = (dateString: string, config?: Config) => {
	if (!dateString.includes("/")) {
		throw new Error(`Date don't includes "/"`);
	}
	const [day, month, year] = dateString.trim().split("/");

	if (!(day.length === 2 && month.length === 2 && year.length === 4)) {
		throw new TypeError("wrong date formats");
	}

	return {day: Number(day), month: Number(month), year: Number(year)};
};

export default dateStringToObject;
