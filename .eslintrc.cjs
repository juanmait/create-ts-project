/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    root: true,
    // add this if you're in a monorepo and don't want a specific member to inherit eslint rules from
    // other configs that exists higher on the file system's tree.

    extends: '@cubostuff/eslint-config-ts',
    parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
};
