// @ts-check

const { configHelpers } = require('./packages/eslint-plugin/src/index');

const eslintGlob = `*.{${configHelpers.extensions.join(',')}}`;

// https://www.npmjs.com/package/lint-staged
module.exports = {
  // Run eslint in fix mode followed by prettier (must be done in sequence, separate from other
  // prettier formatting, since both commands can modify files)
  [eslintGlob]: ['node ./scripts/lint-staged/eslint', 'prettier --write'],

  // Run prettier on non-eslintable files (ignores handled by .prettierignore)
  [`!(${eslintGlob})`]: 'prettier --write',

  'common/changes/*.json': 'node ./scripts/lint-staged/auto-convert-change-files',

  '**/tslint.json': 'node ./scripts/lint-staged/no-tslint-json',

  '**/package.json': 'node ./scripts/lint-staged/no-tslint-deps',

  'packages/!(react-examples)/!(fluentui)/**/(docs|examples)/*.{ts,tsx,scss,md}':
    'node ./scripts/lint-staged/no-old-example-paths',
  'packages/!(react-examples)/!(fluentui)/**/*.doc.ts*': 'node ./scripts/lint-staged/no-old-example-paths',
  'packages/{react,react-cards,react-focus}/src/components/__snapshots__/*':
    'node ./scripts/lint-staged/no-old-snapshot-paths',
};
