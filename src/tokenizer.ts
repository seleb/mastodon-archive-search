export const tokenizer = {
	tokenize(text: string) {
		return text
			.replaceAll('&#39;', "'")
			.replaceAll('&apos;', "'")
			.replaceAll('&quot;', '"')
			.replaceAll('&amp;', '&')
			.replaceAll('&lt;', '<')
			.replaceAll('&gt;', '>')
			.split(/\s/)
			.filter((i) => i);
	},
};
