const fs = require('node:fs');
const yaml = require('js-yaml');
const htmlmin = require('html-minifier-terser');
const markdown = require('markdown-it')({ html: true });
const xml = require('minify-xml');

module.exports = (config) => {
	config.addDataExtension('yml', (contents) => {
		return yaml.load(contents);
	});

	config.addFilter('length', (path) => {
		const stats = fs.statSync(path);

		return stats.size;
	});

	config.addFilter('duration', (time) => {
		return time.split(':').reduceRight((acc, item, index, items) => {
			return acc += parseFloat(item) * Math.pow(60, items.length - 1 - index);
		}, 0);
	});

	config.addFilter('markdown', (value) => {
		return markdown.renderInline(value);
	});

	config.addFilter('htmlmin', async (value) => {
		return await htmlmin.minify(
			value, {
				collapseWhitespace: true,
				removeEmptyElements: true,
			}
		);
	});

	config.addTransform('xmlmin', (content, outputPath) => {
		if (outputPath && outputPath.endsWith('.xml')) {
			return xml.minify(content, {
				shortenNamespaces: false,
			});
		}

		return content;
	});

	config.ignores.add('src/template');

	return {
		dir: {
			input: 'src',
			output: 'dist',
			data: 'data',
		}
	};
};
