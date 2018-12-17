const { clean } = require('./clean');
const { copy } = require('./copy');
const { jest } = require('./jest');
const { sass } = require('./sass');
const { ts } = require('./ts');
const { tslint } = require('./tslint');
const { webpack } = require('./webpack');
const { outdated, selfupdate } = require('./outdated');
const { apiExtractor } = require('./apiExtractor');
const buildCodepenExamples = require('../tasks/build-codepen-examples');
const lintImports = require('../tasks/lint-imports');

exports.rig = {
  clean,
  copy,
  jest,
  sass,
  ts,
  tslint,
  webpack,
  outdated,
  selfupdate,
  apiExtractor,
  buildCodepenExamples,
  lintImports
};
