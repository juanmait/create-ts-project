import eslintConfigTs from '@cubostuff/eslint-config-ts';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
    {
        ignores: ['build/**'],
    },
    ...eslintConfigTs,
    {
        rules: {
            '@typescript-eslint/consistent-type-imports': 'error',
        },
    },
];
