import fs from 'fs';
import { task, series } from 'gulp';
import { log, PluginError } from 'gulp-util';
import _ from 'lodash';
import webpack, { Configuration } from 'webpack';
import stableStringify from 'json-stable-stringify-without-jsonify';
import { argv } from 'yargs';
import requestHttp from 'request-promise-native';

import config from '../config';

const { paths } = config;

const UNRELEASED_VERSION_STRING = 'Unreleased';
const SEMVER_MATCHER = /(\d+)\.(\d+)\.(\d+)/;

const semverCmp = (a: { key: string }, b: { key: string }) => {
  const left = a.key;
  const right = b.key;

  // Unreleased first
  if (left === UNRELEASED_VERSION_STRING) {
    return -1;
  }
  if (right === UNRELEASED_VERSION_STRING) {
    return 1;
  }

  // x.y.z semver DESC
  const leftMatch = left.match(SEMVER_MATCHER);
  const rightMatch = right.match(SEMVER_MATCHER);
  if (leftMatch && rightMatch) {
    for (let i = 1; i <= 3; i++) {
      const partOfLeft = Number(leftMatch[i]);
      const partOfRight = Number(rightMatch[i]);
      if (partOfLeft > partOfRight) {
        return -1;
      }
      if (partOfRight > partOfLeft) {
        return 1;
      }
    }
  }

  // rest ASC
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }

  return 0;
};

function webpackAsync(webpackConfig: Configuration): Promise<any> {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      const statsJson = stats?.toJson();
      const { errors = [], warnings = [] } = statsJson || {};

      if (err) {
        log('Webpack compiler encountered a fatal error.');
        reject(new PluginError('webpack', err.toString()));
      }
      if (errors.length > 0) {
        log('Webpack compiler encountered errors.');
        reject(new PluginError('webpack', errors.toString()));
      }
      if (warnings.length > 0) {
        log('Webpack compiler encountered warnings.');
        reject(new PluginError('webpack', warnings.toString()));
      }

      resolve(statsJson);
    });
  });
}

async function compileOneByOne(allConfigs: any[]) {
  let assets: any[] = [];
  for (const webpackConfig of allConfigs) {
    log('Compiling', webpackConfig.output.filename);
    try {
      const result = await webpackAsync(webpackConfig);
      assets = [...assets, ...result.assets];
      log('Done', result.assets[0].name); // All builds should produce just single asset
    } catch (err) {
      log('Error', webpackConfig.output.filename);
      throw err;
    }
  }
  return assets;
}

function updateStatsFile(filePath: string, currentBundleStats: any) {
  const stats = fs.existsSync(filePath) ? require(filePath) : {};

  stats[UNRELEASED_VERSION_STRING] = {
    bundles: currentBundleStats,
  };

  fs.writeFileSync(
    filePath,
    stableStringify(stats, {
      cmp: semverCmp,
      space: 2,
    }),
  );
}

function writeCurrentStats(filePath: string, currentBundleStats: any) {
  const statsData = _.chain(currentBundleStats)
    .keyBy('name')
    .mapValues(result => ({ size: result.size }))
    .value();

  fs.writeFileSync(filePath, JSON.stringify(statsData, null, 2));
}

const currentStatsFilePath = paths.docsSrc('currentBundleStats.json');

task('stats:build:bundle', async () => {
  process.env.NODE_ENV = 'build';
  const webpackStatsConfig = require('../webpack/webpack.config.stats').default;

  const assets = await compileOneByOne(webpackStatsConfig);
  const results = _(assets)
    .map(({ name, size }) => ({ name, size }))
    .sortBy('name')
    .value();

  updateStatsFile(paths.docsSrc('bundleStats.json'), results);
  writeCurrentStats(currentStatsFilePath, results);
});

task('stats', series('stats:build:bundle'));

function readSummaryPerfStats() {
  return _.chain(require(paths.perfDist('result.json')))
    .mapKeys((value, key) => _.camelCase(String(key))) // mongodb does not allow dots in keys
    .mapValues(result => ({
      actualTime: _.omit(result.actualTime, 'values'),
      renderComponentTime: {
        ..._.omit(result.renderComponentTime, 'values'),
        componentCount: result.componentCount.median,
      },
    }))
    .value();
}

function readFlamegrillStats() {
  return require(paths.packageDist('@fluentui/perf-test', 'perfCounts.json'));
}

// 1. iterate over all perf-test results
// 2. the ones which have filename are docsite perf examples
//    -> use camelCase name (docsite perf examples convention)
//    -> and merge yarn perf (summaryPerf) and yarn perf:test (flamegrill) data
// 3. the others are perf-test only examples -> store
function mergePerfStats(summaryPerfStats: any, perfTestStats: any[]) {
  return _.transform(
    perfTestStats,
    (result, value, key: string) => {
      const flamegrill = _.pick(value, ['profile.metrics', 'analysis', 'extended']);
      if (value.extended.filename) {
        const docsiteFilename = _.camelCase(value.extended.filename);
        result[docsiteFilename] = {
          ...summaryPerfStats[docsiteFilename],
          flamegrill,
        };
      } else {
        result[key.replace(/\./g, '_')] = { flamegrill }; // mongodb does not allow dots in keys
      }
    },
    {} as Record<string, any>,
  );
}

function readCurrentBundleStats() {
  return _.mapKeys(require(currentStatsFilePath), (value, key) => _.camelCase(key)); // mongodb does not allow dots in keys
}

task('stats:save', async () => {
  if (!process.env.STATS_URI) {
    // eslint-disable-next-line no-throw-literal
    throw 'Cannot save stats because STATS_URI is not set';
  }

  const commandLineArgs = _.pickBy(
    _.pick(argv, ['sha', 'branch', 'tag', 'pr', 'build']),
    val => val !== '', // ignore empty strings
  );
  const bundleStats = readCurrentBundleStats();
  const perfStats = readSummaryPerfStats();
  const flamegrillStats = readFlamegrillStats();

  const mergedPerfStats = mergePerfStats(perfStats, flamegrillStats);

  const prSuffix =
    process.env.BUILD_SOURCEBRANCH && process.env.BUILD_SOURCEBRANCH.replace(/^refs\//, '').replace(/\/merge/, '');
  const prUrl = `${process.env.BUILD_REPOSITORY_URI}/${prSuffix}`;

  const statsPayload = {
    sha: process.env.BUILD_SOURCEVERSION,
    branch: process.env.BUILD_SOURCEBRANCHNAME,
    pr: prUrl, // optional
    build: process.env.BUILD_BUILDID,
    ...commandLineArgs, // allow command line overwrites
    bundleSize: bundleStats,
    performance: mergedPerfStats,
    ts: new Date(),
  };

  // payload sanity check
  _.forEach(
    ['sha', 'branch', 'build', 'bundleSize', 'performance'],
    (fieldName: 'sha' | 'branch' | 'build' | 'bundleSize' | 'performance') => {
      if (statsPayload[fieldName] === undefined) {
        // eslint-disable-next-line no-throw-literal
        throw `Required field '${fieldName}' not set in stats payload`;
      }
    },
  );

  const options = {
    method: 'POST',
    uri: process.env.STATS_URI,
    body: statsPayload,
    json: true,
  };

  const response = await requestHttp(options);
  console.log(response);
});
