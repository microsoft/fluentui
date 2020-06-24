const glob = require('glob');
const config = require('../config').default;
const files = glob.sync(config.paths.docs('**/*.steps.ts'));
const ieSteps = files.filter(file => require(file).default.browsers?.includes('ie11'));
const ieExcludeSteps = files.filter(file => !require(file).default.browsers?.includes('ie11'));
const ieRegexes = new RegExp(
  ieSteps.map(file => `(${file.replace(/\.steps\.ts/, '.tsx').replace(/.+\//, '')})`).join('|'),
);
export const ieExcludeRegexes = ieExcludeSteps.map(
  file => new RegExp(file.replace(/\.steps\.ts/, '.tsx').replace(/.+\//, '')),
);
export default [ieRegexes];
