import { DEPLOYHOST, DEPLOYURL, EnvVariablesByProject, SYSTEM_PULLREQUEST_TARGETBRANCH } from './env';
export { getPerfRegressions } from './perf-test';
export {
  RenderTypes as AllRenderTypes,
  RenderTypesDefault as DefaultRenderTypes,
  ScenarioIterations,
  ScenarioRenderTypes,
  ScenarioNames,
  PerfRegressionConfig,
} from './settings';
export const perfTestEnv = { EnvVariablesByProject, DEPLOYHOST, DEPLOYURL, SYSTEM_PULLREQUEST_TARGETBRANCH };
