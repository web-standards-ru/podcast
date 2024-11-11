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
		let newTokens = [];
		let isListItemProcessing = false;

		state.tokens.forEach((token) => {
			if (token.type === 'bullet_list_open') {
				const listOpenToken = new state.Token('html_paragraph', 'p', 1);
				newTokens.push(listOpenToken);
				return;
			}

			if (token.type === 'bullet_list_close') {
				const listCloseToken = new state.Token('html_paragraph', 'p', -1);
				newTokens.push(listCloseToken);
				return;
			}

			if (token.type === 'list_item_open') {
				isListItemProcessing = true;
				return;
			}

			if (token.type === 'list_item_close') {
				isListItemProcessing = false;
				return;
			}

			if (token.type === 'inline' && isListItemProcessing) {
				const bulletToken = new state.Token('html_inline', '', 0);
				bulletToken.content = '• ';
				token.children.unshift(bulletToken);

				const breakToken = new state.Token('html_inline', '', 0);
				breakToken.content = '<br/>';
				token.children.push(breakToken);
			}

			newTokens.push(token);
		});

		state.tokens = newTokens;
	});
}

export { stripHeadings, stripLists };
