import {Patient} from "@/services/cob.service";
import compareDates from "@/utils/compareDates";
import dateStringToObject from "@/utils/dateStringToObject";

const getDates = (pacient: Patient) => {
	const vencimento = dateStringToObject(pacient.Vencimento);
	const recebimento = dateStringToObject(pacient.Recebimento);
	return [vencimento, recebimento];
};

const filterBy = (pacient: Patient) => {
	const currentMonth = new Date().getMonth();
	const [vencimento, recebimento] = getDates(pacient);

	// alterar para mes que o usuario definir, util para acessar planilhas antigas
	if (vencimento.month > currentMonth) {
		return false;
	}

	if (compareDates(pacient.Recebimento, pacient.Vencimento).isLesserOrEqual) {
		return "prev";
	}
};
