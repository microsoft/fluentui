import * as path from 'path';
import { getPerfRegressions as perf } from '@fluentui/scripts-tasks';

import { scenarioIterations } from './scenarioIterations';
import { scenarioRenderTypes } from './scenarioRenderTypes';
import { scenarioNames } from './scenarioNames';

export function getPerfRegressions() {
  const outDir = path.join(__dirname, '../dist');
  const tempDir = path.join(__dirname, '../logfiles');
  const scenariosSrcDirPath = path.join(__dirname, '../src/scenarios');

  perf({
    scenariosProjectName: 'perf-test-react-components',
    projectName: '@fluentui/react-components',
    outDir,
    tempDir,
    scenariosSrcDirPath,
    scenarioIterations,
    scenarioRenderTypes,
    scenarioNames,
  });
}
