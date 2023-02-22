import * as path from 'path';
import { scenarioIterations } from './scenarioIterations';
import { scenarioRenderTypes } from './scenarioRenderTypes';
import { scenarioNames } from './scenarioNames';

const projectRoot = path.join(__dirname, '../../');
const outDir = path.join(projectRoot, './dist');
const tempDir = path.join(projectRoot, './logfiles');
const scenariosSrcDirPath = path.join(projectRoot, './src/scenarios');

export const config = {
  scenariosProjectName: 'perf-test',
  projectName: '@fluentui/react',
  outDir,
  tempDir,
  scenariosSrcDirPath,
  scenarioIterations,
  scenarioRenderTypes,
  scenarioNames,
};
