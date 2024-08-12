import {FilterConfig} from "@/lib/filter_sheet";
import {ICob} from "./types/ICob";

class CobContencaoStrategy implements ICob {
	getConfig(maxDateString: string) {
		const contencaoConfig: FilterConfig = {
			include: {contencao: true},
			maxRecebimentoDate: maxDateString,
		};
		return contencaoConfig;
	}
}

export default CobContencaoStrategy;
