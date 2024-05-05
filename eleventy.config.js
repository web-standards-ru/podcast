import fs from 'node:fs';
import yaml from 'js-yaml';
import htmlmin from 'html-minifier-terser';
import markdownIt from 'markdown-it';
import minifyXml from 'minify-xml';

const markdown = markdownIt({ html: true });

export default (config) => {
	config.addDataExtension('yml', (contents) => {
		return yaml.load(contents);
	});

	config.addFilter('length', (path) => {
		const stats = fs.statSync(path);

		return stats.size;
	});

	config.addFilter('duration', (time) => {
		if (typeof time === 'number') {
			return Math.round(time / 1000);
		}

		return time.split(':').reduceRight((acc, item, index, items) => {
			return acc += parseFloat(item) * Math.pow(60, items.length - 1 - index);
		}, 0);
	});

	config.addFilter('markdown', (value) => {
		return markdown.renderInline(value);
	});

	config.addFilter('htmlmin', async value => {
		return await htmlmin.minify(
			value, {
				collapseWhitespace: true,
				removeEmptyElements: true,
			}
		);
	});

	config.addTransform('xmlmin', (content, outputPath) => {
		if (outputPath && outputPath.endsWith('.xml')) {
			return minifyXml(content, {
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
		},
	};
};
