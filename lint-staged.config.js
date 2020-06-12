// @ts-check

// https://www.npmjs.com/package/lint-staged
module.exports = {
  '*.{ts,tsx}': ['prettier --write', 'node ./scripts/lint-staged/tslint'],

  '*.{js,jsx,json,scss,css,html,htm,md,yml}': ['prettier --write'],

  'common/changes/*.json': 'node ./scripts/lint-staged/auto-convert-change-files',
};
