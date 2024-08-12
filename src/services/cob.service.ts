import filterSheet, {FilterConfig} from "@/lib/filter_sheet";
import CobContencaoStrategy from "@/strategies/CobContencao.strategy";
import CobRegularStrategy from "@/strategies/CobRegular.strategy";
import CobReinicioStrategy from "@/strategies/CobReinicio.strategy";
import {ICob} from "@/strategies/types/ICob";
import dateStringToObject from "@/utils/dateStringToObject";
import getObjectKeys from "@/utils/getObjectKeys";

interface Patient {
	Paciente: string;
	Tipo: "MENSALIDADE" | "REINÍCIO" | "REINICIO PRE ATIVO" | "CONTENÇÃO (ATEND)";
	Recebido: number;
	Vencimento: string;
	Recebimento: string;
}

type CobTypeObj = {
	data: Patient[];
	amount: number;
	quantity: number;
	_name: string;
};

interface CobType {
	_total: CobTypeObj;
	prev_cob0: CobTypeObj;
	cob30: CobTypeObj;
	cob60: CobTypeObj;
	cob90: CobTypeObj;
	reinicio: CobTypeObj;
	contencao: CobTypeObj;
}

export type {Patient, CobType};

/* const getCobConfig = (
	cobArray: string[],
	idx: number,
	maxDateString: string
) => {
	const {month, year} = dateStringToObject(maxDateString);

	const regularCobConfig = {
		include: {mensalidade: true},
		rangeVencimento: {
			initialDate: `01/${month - idx}/${year}`,
			maxDate: `31/${month - idx}/${year}`,
		},
		maxRecebimentoDate: maxDateString,
	};

	if (idx < 4) return regularCobConfig;

	const specialCobConfig = {
		include: {
			reinicio: false,
			reinicioPreAtivo: false,
			contencao: false,
		},
		maxRecebimentoDate: maxDateString,
	};

	if (cobArray[idx] === "reinicio") {
		specialCobConfig.include.reinicio = true;
		specialCobConfig.include.reinicioPreAtivo = true;
	} else {
		specialCobConfig.include.contencao = true;
	}

	return specialCobConfig;
};

const getCobType = (patientList: Patient[], maxDateString: string): CobType => {
	const cobs: CobType = {
		_total: {data: [], amount: 0, quantity: 0},
		prev_cob0: {data: [], quantity: 0, amount: 0},
		cob30: {data: [], quantity: 0, amount: 0},
		cob60: {data: [], quantity: 0, amount: 0},
		cob90: {data: [], quantity: 0, amount: 0},
		reinicio: {data: [], quantity: 0, amount: 0},
		contencao: {data: [], quantity: 0, amount: 0},
	};

	const cobTypes = Object.keys(cobs).filter((prop) => prop !== "_total");

	cobTypes.forEach((cobType, idx) => {
		const cobFilterConfig = getCobConfig(cobTypes, idx, maxDateString);
		const cob = filterSheet(patientList, cobFilterConfig);

		const amount = cob.reduce((sum, patient) => sum + patient.Recebido, 0);

		cobs[cobType].quantity = cob.length;
		cobs[cobType].amount = amount;
		cobs[cobType].data = cob;

		cobs._total.amount += amount;
		cobs._total.quantity += cob.length;
		cobs._total.data.push(...cob);
	});

	return cobs;
};

const cobInit = (rawPatients: Patient[], maxDateString: string): CobType => {
	return getCobType(rawPatients, maxDateString);
}; */

/// classes implementation:

class CobService {
	private cobConfig: ICob | null = null;

	private cobs: CobType = {
		_total: {data: [], amount: 0, quantity: 0, _name: "Total"},
		prev_cob0: {data: [], quantity: 0, amount: 0, _name: "PREV & COB0"},
		cob30: {data: [], quantity: 0, amount: 0, _name: "COB30"},
		cob60: {data: [], quantity: 0, amount: 0, _name: "COB60"},
		cob90: {data: [], quantity: 0, amount: 0, _name: "COB90"},
		reinicio: {data: [], quantity: 0, amount: 0, _name: "Reinício"},
		contencao: {data: [], quantity: 0, amount: 0, _name: "Contenção"},
	};

	private getCobStrategyMap() {
		const strategyMap: Record<string, ICob> = {
			prev_cob0: new CobRegularStrategy(),
			cob30: new CobRegularStrategy(),
			cob60: new CobRegularStrategy(),
			cob90: new CobRegularStrategy(),
			reinicio: new CobReinicioStrategy(),
			contencao: new CobContencaoStrategy(),
		};

		return strategyMap;
	}

	private updateCob(
		data: Patient[],
		cobType: Exclude<keyof CobType, "_total">
	) {
		const amount = data.reduce((prev, curr) => prev + curr.Recebido, 0);

		this.cobs[cobType].quantity = data.length;
		this.cobs[cobType].amount = amount;
		this.cobs[cobType].data = data;

		this.cobs._total.amount += amount;
		this.cobs._total.quantity += data.length;
		this.cobs._total.data.push(...data);
	}

	private setCobStrategy(cobConfig: ICob) {
		this.cobConfig = cobConfig;
	}

	public getCobs(patientsJson: Patient[], maxDateString: string) {
		const cobTypes = getObjectKeys(this.cobs, "_total");

		cobTypes.forEach((cobType, idx) => {
			if (cobType === "_total") return;

			const cobStrategyMap = this.getCobStrategyMap();
			this.setCobStrategy(cobStrategyMap[cobType]);

			if (!this.cobConfig) {
				throw new Error("cobConfig is null");
			}

			const cobConfig = this.cobConfig.getConfig(maxDateString, idx);
			const cob = filterSheet(patientsJson, cobConfig);
			this.updateCob(cob, cobType);
		});
		return this.cobs;
	}
}

export default CobService;
