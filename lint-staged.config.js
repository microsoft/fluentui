// @ts-check

const { configHelpers } = require('./packages/eslint-plugin/src/index');
const { prettierExtensions } = require('./scripts/prettier/prettier-helpers');

// remove leading . for consistency with prettierExtensions
const eslintExtensions = configHelpers.extensions.map(ext => ext.slice(1));

const nonEslintPrettierExtensions = prettierExtensions.filter(ext => !eslintExtensions.includes(ext));

// https://www.npmjs.com/package/lint-staged
module.exports = {
  // Run eslint in fix mode followed by prettier
  // [`*.{${eslintExtensions.join(',')}}`]: ['node ./scripts/lint-staged/eslint', 'prettier --write'],
  //
  // Run prettier on non-eslintable files (ignores handled by .prettierignore)
  // [`*.{${nonEslintPrettierExtensions.join(',')}}`]: 'prettier --write',

  'common/changes/*.json': 'node ./scripts/lint-staged/auto-convert-change-files',

  // '**/tslint.json': 'node ./scripts/lint-staged/no-tslint-json',
  //
  // '**/package.json': 'node ./scripts/lint-staged/no-tslint-deps',
};
