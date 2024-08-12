const isXlsxFile = (filename: string) => {
	const ext = filename.substring(
		filename.lastIndexOf(".") + 1,
		filename.length
	);
	return ext === "xlsx";
};

export default isXlsxFile;
