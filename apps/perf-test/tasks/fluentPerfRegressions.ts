import * as _ from 'lodash';
import * as path from 'path';

import config from '@uifabric/build/config';

// TODO: check false positive potential regression reports in fluent ui repo and fix

type Reporter = {
  markdown: (markdown: string) => void;
  warn: (message: string) => void;
};

export function getFluentPerfRegressions() {
  const output: string[] = [];

  const markdown = (text: string) => {
    output.push(text);
  };

  const warn = (text: string) => {
    output.push(`:warning: ${text}\n`);
  };

  checkPerfRegressions({ markdown, warn });

  return output.join('\n');
}

function linkToFlamegraph(value: string, filename: string) {
  const urlForDeployPath = process.env.BUILD_SOURCEBRANCH
    ? `http://fabricweb.z5.web.core.windows.net/pr-deploy-site/${process.env.BUILD_SOURCEBRANCH}/perf-test/fluentui`
    : 'file://' + config.paths.packageDist('perf-test');

  return `[${value}](${urlForDeployPath}/${path.basename(filename)})`;
}

function fluentFabricComparison(perfCounts: any, reporter: Reporter) {
  const results = _.mapValues(
    _.pickBy(perfCounts, (value, key) => key.endsWith('.Fluent')),
    stats => {
      const fluentTpi = _.get(stats, 'extended.tpi');
      const fabricTpi = _.get(stats, 'extended.fabricTpi');
      return {
        numTicks: stats.analysis.numTicks,
        iterations: stats.extended.iterations,
        fluentTpi,
        fabricTpi,
        fluentToFabric: Math.round((fluentTpi / fabricTpi) * 100) / 100,
        fluentFlamegraphFile: _.get(stats, 'processed.output.flamegraphFile'),
      };
    },
  );

  const getStatus: (arg: number) => string = fluentToFabric =>
    fluentToFabric > 1 ? '🔧' : fluentToFabric >= 0.7 ? '🎯' : '🦄';

  reporter.markdown(
    [
      '<details><summary>Perf comparison</summary>',
      '',
      'Status | Scenario | Fluent TPI | Fabric TPI | Ratio | Iterations | Ticks',
      ':---: | :--- | ---:| ---:| ---:| ---:| ---:',
      ..._.map(results, (value, key) =>
        [
          getStatus(value.fluentToFabric),
          key,
          linkToFlamegraph(value.fluentTpi, value.fluentFlamegraphFile),
          value.fabricTpi,
          `${value.fluentToFabric}:1`,
          value.iterations,
          value.numTicks,
        ].join(' | '),
      ),
      '>🔧 Needs work &nbsp; &nbsp; 🎯 On target &nbsp; &nbsp; 🦄 Amazing',
      '',
      '</details>',
    ].join('\n'),
  );
}

function reportResults(perfCounts: any, reporter: Reporter) {
  const results = _.map(
    _.pickBy(perfCounts, value => _.has(value, 'analysis.regression')),
    (stats, name) => {
      const currentTicks = _.get(stats, 'analysis.numTicks');
      const baselineTicks = _.get(stats, 'analysis.baseline.numTicks');

      return {
        name,
        numTicks: currentTicks,
        flamegraphFile: _.get(stats, 'processed.output.flamegraphFile'),
        baseline: {
          numTicks: baselineTicks,
          flamegraphFile: _.get(stats, 'processed.baseline.output.flamegraphFile'),
        },
        isRegression: _.get(stats, 'analysis.regression.isRegression'),
        regressionFile: _.get(stats, 'analysis.regression.regressionFile'),
        currentToBaseline: Math.round((currentTicks / baselineTicks) * 100) / 100,
      };
    },
  );

  const regressions = _.sortBy(_.filter(results, 'isRegression'), stats => stats.currentToBaseline * -1);

  if (regressions.length > 0) {
    reporter.warn(`${regressions.length} potential perf regressions detected`);
    reporter.markdown(
      [
        '### Potential regressions comparing to master',
        '',
        'Scenario | Current PR Ticks | Baseline Ticks | Ratio | Regression Analysis',
        ':--- | ---:| ---:| ---: | ---: ',
        ..._.map(regressions, (value, key) =>
          [
            value.name,
            linkToFlamegraph(value.numTicks, value.flamegraphFile),
            linkToFlamegraph(value.baseline.numTicks, value.baseline.flamegraphFile),
            `${value.currentToBaseline}:1`,
            linkToFlamegraph('analysis', value.regressionFile),
          ].join(' | '),
        ),
      ].join('\n'),
    );
  }

  fluentFabricComparison(perfCounts, reporter);

  const noRegressions = _.sortBy(
    _.filter(results, stats => !stats.isRegression),
    stats => stats.currentToBaseline * -1,
  );
  reporter.markdown(
    [
      '<details><summary>Perf tests with no regressions</summary>',
      '',
      'Scenario | Current PR Ticks | Baseline Ticks | Ratio',
      ':--- | ---:| ---:| ---:',
      ..._.map(noRegressions, (value, key) =>
        [
          value.name,
          linkToFlamegraph(value.numTicks, value.flamegraphFile),
          linkToFlamegraph(value.baseline.numTicks, value.baseline.flamegraphFile),
          `${value.currentToBaseline}:1`,
        ].join(' | '),
      ),
      '',
      '</details>',
    ].join('\n'),
  );
}

const checkPerfRegressions = (reporter: Reporter) => {
  let perfCounts;

  reporter.markdown('## Perf Analysis (Fluent)');

  try {
    perfCounts = require(config.paths.packageDist('perf-test', 'perfCounts.json'));
  } catch {
    reporter.warn('No perf measurements available');
    return;
  }

  reportResults(perfCounts, reporter);
};
