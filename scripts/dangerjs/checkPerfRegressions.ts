import * as _ from 'lodash';
import * as path from 'path';

import { DangerJS } from './types';
import config from '../config';

function linkToFlamegraph(value, filename) {
  // This as well as the whole flamegrill URL is hardcoded to only work with CircleCI.
  const build = process.env.CIRCLE_BUILD_NUM;
  const GITHUB_REPO_ID = '141743704';

  if (_.isUndefined(build) || _.isUndefined(filename)) {
    return value;
  }

  return `[${value}](https://${build}-${GITHUB_REPO_ID}-gh.circle-artifacts.com/0/artifacts/perf/${path.basename(filename)})`;
}

function fluentFabricComparison(perfCounts, danger, markdown, warn) {
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
        fluentFlamegraphFile: _.get(stats, 'processed.output.flamegraphFile')
      };
    }
  );

  const getStatus = fluentToFabric => (fluentToFabric > 1 ? '🔧' : fluentToFabric >= 0.7 ? '🎯' : '🦄');

  markdown(
    [
      '## Perf comparison',
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
          value.numTicks
        ].join(' | ')
      ),
      '>🔧 Needs work &nbsp; &nbsp; 🎯 On target &nbsp; &nbsp; 🦄 Amazing'
    ].join('\n')
  );
}
function currentToMasterComparison(perfCounts, danger, markdown, warn) {
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
          flamegraphFile: _.get(stats, 'processed.baseline.output.flamegraphFile')
        },
        isRegression: _.get(stats, 'analysis.regression.isRegression'),
        currentToBaseline: Math.round((currentTicks / baselineTicks) * 100) / 100
      };
    }
  );

  const regressions = _.sortBy(_.filter(results, 'isRegression'), stats => stats.currentToBaseline * -1);

  if (regressions.length > 0) {
    warn(`${regressions.length} perf regressions detected`);
    markdown(
      [
        '## Potential regressions comparing to master',
        '',
        'Scenario | Current PR Ticks | Baseline Ticks | Ratio',
        ':--- | ---:| ---:| ---:',
        ..._.map(regressions, (value, key) =>
          [
            value.name,
            linkToFlamegraph(value.numTicks, value.flamegraphFile),
            linkToFlamegraph(value.baseline.numTicks, value.baseline.flamegraphFile),
            `${value.currentToBaseline}:1`
          ].join(' | ')
        )
      ].join('\n')
    );
  }

  const noRegressions = _.sortBy(
    _.filter(results, stats => !stats.isRegression),
    stats => stats.currentToBaseline * -1
  );
  markdown(
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
          `${value.currentToBaseline}:1`
        ].join(' | ')
      ),
      '',
      '</details>'
    ].join('\n')
  );
}

export default ({ danger, markdown, warn }: DangerJS) => {
  let perfCounts;
  try {
    perfCounts = require(config.paths.packageDist('perf-test', 'perfCounts.json'));
  } catch {
    warn('No perf measurements available');
    return;
  }

  fluentFabricComparison(perfCounts, danger, markdown, warn);
  currentToMasterComparison(perfCounts, danger, markdown, warn);
};
