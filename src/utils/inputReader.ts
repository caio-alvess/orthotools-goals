import React from "react";

const inputReader = (e: React.ChangeEvent<HTMLInputElement>) => {
	if (!e.currentTarget.files) throw new TypeError("file is undefined");

	let file = e.currentTarget.files[0];
	return file;
};

export default inputReader;
