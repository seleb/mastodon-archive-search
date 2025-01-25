export const tokenizer = {
	tokenize(text: string) {
		return text.split(/\s/).filter((i) => i);
	},
};
