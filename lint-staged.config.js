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
};
