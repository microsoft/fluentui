import * as path from 'path';
import type { PerfRegressionConfig } from '@fluentui/scripts-tasks';

export const config: PerfRegressionConfig = {
  projectRootPath: 'packages/fluentui/perf-test-northstar',
  projectName: '@fluentui/react-northstar',
  outDir: path.join(__dirname, '../dist'),
  tempDir: path.join(__dirname, '../logfiles'),
  scenariosSrcDirPath: '../dist/stories.js',
};
