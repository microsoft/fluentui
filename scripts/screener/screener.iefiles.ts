const glob = require('glob');
const config = require('../config').default;
const files = glob.sync(config.paths.docs('**/*.steps.ts'));
console.log(files);
const ieSteps = files.filter(file => require(file).steps?.browsers?.includes('ie11'));
const ieExcludeSteps = files.filter(file => !require(file).steps?.browsers?.includes('ie11'));
const ieRegexes = ieSteps.map(file => new RegExp(file.replace(/\.steps\.ts/, '.tsx')));
export const ieExcludeRegexes = ieExcludeSteps.map(file => new RegExp(file.replace(/\.steps\.ts/, '.tsx')));

export default ieRegexes;
