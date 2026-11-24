module.exports = [
  ...require('../scripts/projects-test/eslint.config'),
  {
    rules: {
      'import/no-extraneous-dependencies': ['error', { packageDir: ['.', '../'] }],
    },
  },
];
