const fileToBlob = (file: File) => {
	return new Promise<Blob>((resolve, reject) => {
		console.log("inside the function");
		const fr = new FileReader();
		if (!file) {
			return reject("file is undefined");
		}

		fr.onload = (rawRes) => {
			const sheet = rawRes.target?.result;

			console.log(sheet instanceof ArrayBuffer);

			if (sheet instanceof ArrayBuffer) {
				const blob = new Blob([new Uint8Array(sheet)], {
					type: file.type,
				});
				resolve(blob);
			}
		};
		fr.onerror = reject;
		fr.readAsArrayBuffer(file);
	});
};

export default fileToBlob;
