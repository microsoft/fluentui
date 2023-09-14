import * as path from 'path';
import { scenarioIterations } from './scenarioIterations';
import { scenarioRenderTypes } from './scenarioRenderTypes';
import { scenarioNames } from './scenarioNames';

const projectRoot = path.join(__dirname, '../../');
const projectRootPath = 'apps/perf-test-react-components';
const outDir = path.join(projectRoot, './dist');
const tempDir = path.join(projectRoot, './logfiles');
const scenariosSrcDirPath = path.join(projectRoot, './src/scenarios');

export const config = {
  projectName: '@fluentui/react-components',
  projectRootPath,
  outDir,
  tempDir,
  scenariosSrcDirPath,
  scenarioIterations,
  scenarioRenderTypes,
  scenarioNames,
};
