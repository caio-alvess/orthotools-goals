import {Patient} from "@/services/cob.service";
import compareDates from "../utils/compareDates";

type FilterOpt = "mensalidade" | "reinicio" | "reinicioPreAtivo" | "contencao";
type PacientType =
	| "MENSALIDADE"
	| "REINÍCIO"
	| "REINICIO PRE ATIVO"
	| "CONTENÇÃO (ATEND)";

const filterTranslator = (type: FilterOpt) => {
	const options = {
		mensalidade: "MENSALIDADE",
		reinicio: "REINÍCIO",
		reinicioPreAtivo: "REINICIO PRE ATIVO",
		contencao: "CONTENÇÃO (ATEND)",
	};
	return options[type];
};

interface IncludeOpt {
	mensalidade?: boolean;
	reinicioPreAtivo?: boolean;
	reinicio?: boolean;
	contencao?: boolean;
}
interface FilterConfig {
	include: IncludeOpt;
	rangeVencimento?: {
		initialDate: string;
		maxDate: string;
	};
	special?: {
		prevOnly: boolean;
	};
	maxRecebimentoDate: string;
}

export type {FilterConfig};

const allowedTypes = (include: IncludeOpt) => {
	const userInclude = Object.getOwnPropertyNames(include) as FilterOpt[];
	return userInclude
		.filter((type) => include[type] == true)
		.map((type) => filterTranslator(type)) as PacientType[];
};

interface IVerify {
	initialDate: string;
	maxDate: string;
}

const verifyVencimento = (
	patientVencimento: string,
	rangeVencimento: IVerify
) => {
	const {initialDate, maxDate} = rangeVencimento;

	const isInRange =
		compareDates(patientVencimento, initialDate).isGreaterOrEqual &&
		compareDates(patientVencimento, maxDate).isLesserOrEqual;

	return isInRange;
};

const filterSheet = (patients: Patient[], config: FilterConfig) => {
	const filteredSheet = patients.filter((patient) => {
		// 1. É pago
		if (!patient.Recebimento || !patient.Recebido) return false;

		if (config.special?.prevOnly) {
			return compareDates(patient.Vencimento, patient.Recebimento)
				.isGreaterOrEqual;
		}

		// 2. É o tipo de mensalidade que o user escolheu
		if (!allowedTypes(config.include).includes(patient.Tipo)) return false;

		// 3. Mes recebimento maior que mês limite
		if (
			compareDates(patient.Recebimento, config.maxRecebimentoDate).isGreater
		) {
			return false;
		}

		if (config.rangeVencimento) {
			const isInRange = verifyVencimento(
				patient.Vencimento,
				config.rangeVencimento
			);
			if (!isInRange) return false;
		}

		return true;
	});
	return filteredSheet;
};

export default filterSheet;
