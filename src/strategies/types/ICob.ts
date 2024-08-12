import {FilterConfig} from "@/lib/filter_sheet";

interface ICob {
	getConfig: (maxDateString: string, idx?: number) => FilterConfig;
}

export type {ICob};
