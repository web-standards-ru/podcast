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

function stripLists(md) {
	md.core.ruler.push('strip_lists', (state) => {
		state.tokens.forEach((token) => {
			if (token.type === 'bullet_list_open') {
				token.tag = 'p';
				token.type = 'paragraph_open';
			}

			if (token.type === 'bullet_list_close') {
				token.tag = 'p';
				token.type = 'paragraph_close';
			}

			if (token.type === 'list_item_open') {
				token.hidden = true;
			}

			if (token.type === 'list_item_close') {
				token.hidden = true;
			}
		});
	});
}

export { stripHeadings, stripLists };
