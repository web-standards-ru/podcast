function stripHeadings(md) {
	md.core.ruler.push('strip_headings', (state) => {
		state.tokens.forEach((token) => {
			if (token.type === 'heading_open') {
				token.tag = 'p';
				token.type = 'paragraph_open';
			}

			if (token.type === 'heading_close') {
				token.tag = 'p';
				token.type = 'paragraph_close';
			}
		});
	});
}

export { stripHeadings };
