const fluent = reuqire('@fluentui/eslint-plugin');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(...fluent.configs['flat/react'], {
  files: ['**/*.{ts,tsx}'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: ['.', '../../../../'],
      },
    ],
  },
});
