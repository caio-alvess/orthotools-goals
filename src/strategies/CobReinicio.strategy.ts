import {FilterConfig} from "@/lib/filter_sheet";
import {ICob} from "./types/ICob";

class CobReinicioStrategy implements ICob {
	getConfig(maxDateString: string) {
		const reinicioConfig: FilterConfig = {
			include: {reinicio: true, reinicioPreAtivo: true},
			maxRecebimentoDate: maxDateString,
		};
		return reinicioConfig;
	}
}

export default CobReinicioStrategy;
