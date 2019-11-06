const reqContext = require.context('./', false, /^\.\/(?!scenarioList)[^\.]*\.(j|t)sx?$/);

const scenarios: { [scenarioName: string]: string } = {};

reqContext.keys().forEach((key: string) => {
  const pathSplit = key.replace(/^\.\//, '').split(/\\\//);
  const basename = pathSplit[pathSplit.length - 1];
  const scenarioName = basename.indexOf('.') > -1 ? basename.split('.')[0] : basename;
  const scenarioModule = reqContext(key);

  scenarios[scenarioName] = scenarioModule.default || scenarioModule;
});

module.exports = scenarios;
