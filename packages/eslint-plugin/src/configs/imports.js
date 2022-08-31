module.exports = {
  rules: {
    /**
     * core eslint rules
     * @see https://eslint.org/docs/rules
     */
    // handles only member sort, rest is handled via import/order
    'sort-imports': ['warn', { ignoreDeclarationSort: true }],

    /**
     * import plugin rules
     * @see https://github.com/import-js/eslint-plugin-import
     */
    'import/no-duplicates': 'warn',
    'import/first': 'warn',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
  },
};
