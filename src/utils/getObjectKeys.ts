function getObjectKeys<T extends Object>(o: T, exceptions?: string | string[]) {
	const objectList = Object.keys(o) as Array<keyof T>;

	if (!exceptions) return objectList;

	const exceptionsArray = Array.isArray(exceptions) ? exceptions : [exceptions];
	return objectList.filter((prop) => !exceptionsArray.includes(prop as string));
}

export default getObjectKeys;
