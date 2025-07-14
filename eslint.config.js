import { defineConfig } from "eslint/config";
import js from '@eslint/js';
import markdown from "@eslint/markdown";
import globals from 'globals';

export default defineConfig([
	{
		files: ['**/*.js'],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
		languageOptions: {
			globals: {
				...globals.nodeBuiltin,
			},
		},
	},
	{
		files: ['src/episodes/*/index.md'],
		plugins: {
			markdown
		},
		extends: ["markdown/recommended"],
		rules: {
			"markdown/no-html": "error",
			"markdown/no-bare-urls": "error"
		}
	},
]);
