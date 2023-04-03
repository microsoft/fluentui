import * as path from 'path';
import { scenarioIterations } from './scenarioIterations';
import { scenarioRenderTypes } from './scenarioRenderTypes';
import { scenarioNames } from './scenarioNames';

const projectRoot = path.join(__dirname, '../../');
const projectRootPath = 'apps/perf-test';
const outDir = path.join(projectRoot, './dist');
const tempDir = path.join(projectRoot, './logfiles');
const scenariosSrcDirPath = path.join(projectRoot, './src/scenarios');

export const config = {
  projectName: '@fluentui/react',
  projectRootPath,
  outDir,
  tempDir,
  scenarioIterations,
  scenarioRenderTypes,
  scenariosSrcDirPath,
  excludeScenarios: [
    // TeachingBubble perf test is hanging after puppeteer pin to v19. Disabling for now to unblock SWC migration work.
    'TeachingBubble',
  ],
};
