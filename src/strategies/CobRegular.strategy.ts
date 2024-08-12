import dateStringToObject from "@/utils/dateStringToObject";
import {ICob} from "./types/ICob";
import {FilterConfig} from "@/lib/filter_sheet";

class CobRegularStrategy implements ICob {
	private convertDatestring(maxDateString: string) {
		const dateObject = dateStringToObject(maxDateString);
		return dateObject;
	}

	private configOptions(
		maxDateString: string,
		dateStrObj: {day: number; month: number; year: number},
		idx: number
	) {
		const {month, year} = dateStrObj;

		const cobConfig: FilterConfig = {
			include: {mensalidade: true},
			rangeVencimento: {
				initialDate: `01/${month - idx}/${year}`,
				maxDate: `31/${month - idx}/${year}`,
			},
			maxRecebimentoDate: maxDateString,
		};
		return cobConfig;
	}

	getConfig(maxDateString: string, idx?: number) {
		if (idx == undefined) throw new TypeError("idx is not defined");

		const dateStrObj = this.convertDatestring(maxDateString);
		return this.configOptions(maxDateString, dateStrObj, idx);
	}
}

export default CobRegularStrategy;
