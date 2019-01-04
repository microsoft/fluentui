const { clean } = require('./clean');
const { copy } = require('./copy');
const { jest } = require('./jest');
const { sass } = require('./sass');
const { ts } = require('./ts');
const { tslint } = require('./tslint');
const { webpack } = require('./webpack');
const { outdated, selfupdate } = require('./outdated');
const { apiExtractor, updateApi } = require('./apiExtractor');
const buildCodepenExamples = require('./build-codepen-examples');
const lintImports = require('./lint-imports');
const prettier = require('./prettier');

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
  updateApi,
  buildCodepenExamples,
  lintImports,
  prettier
};
