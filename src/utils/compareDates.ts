const convertDate = (dateString: string) => {
	const [day, month, year] = dateString.split("/");
	return `${year}-${month}-${day}`;
};

const compareDates = (firstDate: string, secondDate: string) => {
	const firstTimestamp = new Date(convertDate(firstDate)).getTime();
	const secondTimestamp = new Date(convertDate(secondDate)).getTime();

	return {
		isGreater: firstTimestamp > secondTimestamp,
		isLesser: firstTimestamp < secondTimestamp,
		isGreaterOrEqual: firstTimestamp >= secondTimestamp,
		isLesserOrEqual: firstTimestamp <= secondTimestamp,
		isEqual: firstTimestamp === secondTimestamp,
	};
};

export default compareDates;
