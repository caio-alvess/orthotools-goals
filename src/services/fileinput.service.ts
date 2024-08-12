import inputReader from "@/utils/inputReader";
import isXlsxFile from "@/utils/isXlsxFile";
import fileToBlob from "@/lib/fileToBlob";

interface IFileInput {
	getValidFile(e: React.ChangeEvent<HTMLInputElement>): Promise<false | Blob>;
	formatMonthString(monthInput: string): string | false;
}

class FileInputService implements IFileInput {
	private testVality(blobFile: Blob, fileName: string) {
		const isValid = blobFile && isXlsxFile(fileName);
		if (!isValid) throw new Error("invalid sheet");
		else return true;
	}

	async getValidFile(e: React.ChangeEvent<HTMLInputElement>) {
		try {
			const file = inputReader(e);
			const fileBlob = await fileToBlob(file);

			if (this.testVality(fileBlob, file.name)) {
				return fileBlob;
			}
			throw new TypeError("invalid file");
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	formatMonthString(monthInput: string) {
		const [year, month] = monthInput.split("-");
		const maxDateString = `31/${month}/${year}`;
		return maxDateString;
	}

	async convertToArrayBuffer(file?: Blob) {
		if (file) {
			const newArrayBuffer = await file.arrayBuffer();
			return newArrayBuffer;
		} else {
			throw new TypeError("file is undefined");
		}
	}
}

export default FileInputService;
