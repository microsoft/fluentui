/**
 * You don't have to add scenarios to this structure unless
 * you want their render types to differ from the default (mount only).
 *
 * Note:
 * You should not need to have virtual-rerender tests in most cases because mount test provides enough coverage.
 * It is mostly usefual for cases where component has memoization logics. And in case of re-rendering,
 * memoization logic help avoid certain code paths.
 */

// A high number of iterations are needed to get visualization of lower level calls that are infrequently hit by ticks.
// Wiki: https://github.com/microsoft/fluentui/wiki/Perf-Testing
export const IterationsDefault = 5000;

export const RenderTypes = ['mount', 'virtual-rerender', 'virtual-rerender-with-unmount'];
export const RenderTypesDefault = ['mount'];

export type ScenarioNames = { [scenarioName: string]: string };

export type ScenarioRenderTypes = { [scenarioName: string]: string[] };

export type ScenarioIterations = { [scenarioName: string]: number };

export type PerfRegressionConfig = {
  /**
   * path from workspace root -> example `apps/my-app`
   */
  projectRootPath: string;
  /**
   * name used within package.json#name
   */
  projectName: string;
  outDir: string;
  tempDir: string;
  scenariosSrcDirPath: string;
  scenarioNames?: ScenarioNames;
  scenarioIterations?: ScenarioIterations;
  scenarioRenderTypes?: ScenarioRenderTypes;
  /**
   * array of scenario names to be excluded.
   * NOTE: array item needs to match scenario filename without extension. So to exclude `Foo.tsx` , you need to define `['Foo']` etc.
   */
  excludeScenarios?: string[];
};
