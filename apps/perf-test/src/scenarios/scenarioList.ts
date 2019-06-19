const reqContext = require.context('./', false, /^(?!scenarioList)/);

reqContext.keys().forEach((key: string) => {
  const pathSplit = key.split(/\\\//);
  const basename = pathSplit[pathSplit.length - 1];
  const scenarioName = basename.indexOf('.') > -1 ? basename.split('.')[1] : basename;
  module.exports[scenarioName] = reqContext(key);
});
