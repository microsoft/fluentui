import type { Scenarios } from './types';

/**
 *
 * //TODO this uses proprietary webpack require.context which is not future-proof - use standard ESM
 */
export function loadScenarios(context: __WebpackModuleApi.RequireContext): Scenarios {
  const scenarios: Scenarios = {};

  context.keys().forEach((key: string) => {
    const pathSplit = key.replace(/^\.\//, '').split(/\\\//);
    const basename = pathSplit[pathSplit.length - 1];
    const scenarioName = basename.indexOf('.') > -1 ? basename.split('.')[0] : basename;
    const scenarioModule = context(key);

    scenarios[scenarioName] = scenarioModule.default || scenarioModule;
  });

  return scenarios;
}
