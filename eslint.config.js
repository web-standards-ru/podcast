import globals from 'globals';
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
	js.configs.recommended,

	{
		languageOptions: {
			globals: {
				...globals.nodeBuiltin,
			},
		},
	},

	{
		plugins: {
			'@stylistic/js': stylisticJs,
		},
		rules: {
			'camelcase': ['error', { 'properties': 'never' }],
			'eqeqeq': 'error',
			'no-array-constructor': 'error',
			'no-empty': ['error', { 'allowEmptyCatch': true }],
			'no-const-assign': 'error',
			'no-duplicate-imports': 'error',
			'no-debugger': 'error',
			'no-invalid-regexp': 'error',
			'no-redeclare': ['error', { 'builtinGlobals': false }],
			'no-unneeded-ternary': 'error',

			'@stylistic/js/arrow-spacing': 'error',
			'@stylistic/js/block-spacing': ['error', 'always'],
			'@stylistic/js/brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
			'@stylistic/js/comma-dangle': ['error', {
				'arrays': 'always-multiline',
				'objects': 'always-multiline',
				'imports': 'never',
				'exports': 'never',
				'functions': 'never',
			}],
			'@stylistic/js/comma-spacing': ['error', { 'before': false, 'after': true }],
			'@stylistic/js/comma-style': ['error', 'last'],
			'@stylistic/js/dot-location': ['error', 'property'],
			'@stylistic/js/eol-last': 'error',
			'@stylistic/js/function-call-spacing': ['error', 'never'],
			'@stylistic/js/indent': ['error', 'tab', {
				'SwitchCase': 1,
				'ignoredNodes': ['TemplateLiteral *'],
			}],
			'@stylistic/js/keyword-spacing': 'error',
			'@stylistic/js/key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
			'@stylistic/js/linebreak-style': ['error', 'unix'],
			'@stylistic/js/no-multi-spaces': 'error',
			'@stylistic/js/no-whitespace-before-property': 'error',
			'@stylistic/js/padded-blocks': ['error', 'never'],
			'@stylistic/js/quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
			'@stylistic/js/rest-spread-spacing': ['error', 'never'],
			'@stylistic/js/semi': ['error', 'always'],
			'@stylistic/js/semi-spacing': ['error', { 'before': false, 'after': true }],
			'@stylistic/js/space-infix-ops': ['error', { 'int32Hint': false }],
			'@stylistic/js/space-before-function-paren': ['error', 'never'],
			'@stylistic/js/space-before-blocks': ['error', 'always'],
			'@stylistic/js/space-in-parens': ['error', 'never'],
			'@stylistic/js/spaced-comment': 'error',
			'@stylistic/js/template-curly-spacing': ['error', 'never'],
		},
	},
];
