import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import type { Server } from 'http';
import { series, task } from 'gulp';
import { colors, log } from 'gulp-util';
import _ from 'lodash';
import ProgressBar from 'progress';
import del from 'del';
import { argv } from 'yargs';
import markdownTable from 'markdown-table';

import { webpackPlugin, createChrome, createElectron, config } from '@fluentui/scripts-gulp';
import type { Browser } from '@fluentui/scripts-gulp';

import type {
  MeasuredValues,
  PerExamplePerfMeasures,
  ProfilerMeasure,
  ProfilerMeasureCycle,
  ReducedMeasures,
} from '../types';

import { packageDist } from './shared';

const DEFAULT_RUN_TIMES = 10;
let server: Server;

const floor = (value: number) => _.floor(value, 2);

const computeMeasureMedian = (measures: number[]) => {
  const values = _.sortBy(measures);

  const lowMiddle = Math.floor((values.length - 1) / 2);
  const highMiddle = Math.ceil((values.length - 1) / 2);

  return (values[lowMiddle] + values[highMiddle]) / 2;
};

const reduceMeasures = (measures: ProfilerMeasure[], key: MeasuredValues): ReducedMeasures => {
  if (measures.length === 0) {
    throw new Error('`measures` are empty');
  }

  let min = measures[0][key];
  let max = measures[0][key];
  let sum = measures[0][key];

  for (let i = 1; i < measures.length; i++) {
    if (measures[i][key] < min) {
      min = measures[i][key];
    }
    if (measures[i][key] > max) {
      max = measures[i][key];
    }

    sum += measures[i][key];
  }

  return {
    avg: floor(sum / measures.length),
    median: floor(computeMeasureMedian(_.map(measures, measure => measure[key]))),
    min: floor(min),
    max: floor(max),
    values: _.map(measures, measure => ({
      exampleIndex: measure.exampleIndex,
      value: measure[key],
    })),
  };
};

const sumByExample = (measures: ProfilerMeasureCycle[]): PerExamplePerfMeasures => {
  const perExampleMeasures = _.reduce(
    measures,
    (result, cycle: ProfilerMeasureCycle) => {
      _.forEach(cycle, (value: ProfilerMeasure, exampleName: string) => {
        result[exampleName] = [...(result[exampleName] || []), value];
      });

      return result;
    },
    {} as Record<string, ProfilerMeasure[]>,
  );

  return _.mapValues(perExampleMeasures, (profilerMeasures: ProfilerMeasure[]) => ({
    actualTime: reduceMeasures(profilerMeasures, 'actualTime'),
    renderComponentTime: reduceMeasures(profilerMeasures, 'renderComponentTime'),
    componentCount: reduceMeasures(profilerMeasures, 'componentCount'),
  }));
};

const createMarkdownTable = (perExamplePerfMeasures: PerExamplePerfMeasures) => {
  const fieldsMapping = {
    min: 'actualTime.min',
    avg: 'actualTime.avg',
    median: 'actualTime.median',
    max: 'actualTime.max',
    'renderComponent.min': 'renderComponentTime.min',
    'renderComponent.avg': 'renderComponentTime.avg',
    'renderComponent.median': 'renderComponentTime.median',
    'renderComponent.max': 'renderComponentTime.max',
    components: 'componentCount.median',
  };

  const fieldLabels = _.keys(fieldsMapping);
  const fieldValues = _.map(perExamplePerfMeasures, (value, exampleName) => {
    return [exampleName, ..._.map(_.values(fieldsMapping), measure => _.get(value, measure))];
  });

  return markdownTable([
    ['Example', ...fieldLabels],
    ..._.sortBy(fieldValues, row => -row[fieldLabels.indexOf('median') + 1]), // +1 is for exampleName
  ]);
};

async function runMeasures(
  browser: Browser,
  url: string,
  filter: string,
  mode: string,
  times: number,
): Promise<ProfilerMeasureCycle[]> {
  const codeToExecute = `window.runMeasures("${filter}")`;

  // Hides progress bar on CI
  const bar = process.env.TF_BUILD ? { tick: _.noop } : new ProgressBar(':bar :current/:total', { total: times });
  const measures: ProfilerMeasureCycle[] = [];

  // "new-page" allows to execute test suites always on a new page
  // "same-page" allows to execute test suites always on a same page (better for caching scenarios)

  if (mode === 'new-page') {
    for (let i = 0; i < times; i++) {
      const page = await browser.openPage(url);

      const measuresFromStep = await page.executeJavaScript<ProfilerMeasureCycle>(codeToExecute);
      measures.push(measuresFromStep);
      bar.tick();

      await page.close();
    }
  } else if (mode === 'same-page') {
    const page = await browser.openPage(url);

    // Empty run to skip slow first run
    await page.executeJavaScript<ProfilerMeasureCycle>(codeToExecute);

    for (let i = 0; i < times; i++) {
      const measuresFromStep = await page.executeJavaScript<ProfilerMeasureCycle>(codeToExecute);

      measures.push(measuresFromStep);
      bar.tick();
    }

    await page.close();
  } else {
    throw new Error(`Mode "${mode}" is not supported`);
  }

  return measures;
}

task('perf:clean', () => del(packageDist, { force: true }));

task('perf:build', cb => {
  webpackPlugin(require('./webpack.config').webpackConfig, cb);
});

task('perf:run', async () => {
  const filter = (argv.filter as string) || '';
  const mode = (argv.mode as string) || 'new-page';
  const times = (argv.times as number) || DEFAULT_RUN_TIMES;

  const browserName: 'chrome' | 'electron' = (argv.browser as 'chrome' | 'electron') || 'chrome';
  let browser: Browser;

  if (browserName === 'electron') {
    if (typeof argv.electronPath === 'undefined') {
      throw new Error(
        `To run perf tests with Electron, please provide a path to Electron's binary via "--electronPath" argument`,
      );
    }

    browser = await createElectron(argv.electronPath as string);
  } else {
    browser = await createChrome();
  }

  let measures: ProfilerMeasureCycle[];

  try {
    measures = await runMeasures(browser, `http://${config.server_host}:${config.perf_port}`, filter, mode, times);
  } finally {
    await browser.close();
  }

  const resultsFile = path.join(packageDist, 'result.json');
  const perExamplePerfMeasures = sumByExample(measures);

  fs.writeFileSync(resultsFile, JSON.stringify(perExamplePerfMeasures, null, 2));

  log(colors.green('Results are written to "%s"'), resultsFile);
  console.log('\n# Measures\n');
  console.log(createMarkdownTable(perExamplePerfMeasures));
});

task('perf:serve', cb => {
  server = express()
    .use(express.static(packageDist))
    .listen(config.perf_port, config.server_host, () => {
      log(colors.yellow('Server running at http://%s:%d'), config.server_host, config.perf_port);
      cb();
    });
});

task('perf:serve:stop', cb => {
  if (server) {
    server.close(cb);
  }
});

task('perf', series('perf:clean', 'perf:build', 'perf:serve', 'perf:run', 'perf:serve:stop'));
task('perf:debug', series('perf:clean', 'perf:build', 'perf:serve'));
