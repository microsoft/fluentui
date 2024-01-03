import * as path from 'path';
import * as fs from 'fs';

import { stripIndents } from '@nx/devkit';

import { bundleSizeAuditor } from './cli';

describe(`bundleSizeAuditor`, () => {
  // don't spam testing output with logs from webpack etc
  const noop = () => {};
  jest.spyOn(console, 'log').mockImplementation(noop);
  jest.spyOn(console, 'warn').mockImplementation(noop);

  function setup() {
    const fixturesRoot = path.join(__dirname, '../__fixtures__');
    const rootDir = path.join(__dirname, '../temp/test');
    const projOneRoot = path.join(rootDir, 'proj-one');

    fs.rmSync(rootDir, { recursive: true, force: true });
    fs.cpSync(fixturesRoot, rootDir, { recursive: true });

    return {
      projOneRoot,
      rootDir,
    };
  }

  it(`should create fixtures, bundle them and collect size within bundlesize.json`, async () => {
    const { projOneRoot, rootDir } = setup();
    await bundleSizeAuditor({ rootDir: projOneRoot });

    const webpackBundleConfig = fs.readFileSync(
      path.join(projOneRoot, 'temp/fixtures/webpack.bundle-size-auditor.config.js'),
      'utf-8',
    );

    const fixtureFile = fs.readFileSync(path.join(projOneRoot, 'temp/fixtures/proj-one/hello.js'), 'utf-8');
    const bundleFile = fs.readFileSync(
      path.join(projOneRoot, 'temp/fixtures/build/fluentui-proj-one-hello.min.js'),
      'utf-8',
    );
    const bundlesizeJSON = JSON.parse(
      fs.readFileSync(path.join(projOneRoot, 'temp/fixtures/build/bundlesize.json'), 'utf-8'),
    );

    expect(stripIndents`${webpackBundleConfig}`).toEqual(
      stripIndents`
     const { createWebpackConfig } = require('@fluentui/scripts-bundle-size-auditor');

    module.exports = createWebpackConfig({
      "entries": {
        "fluentui-proj-one-hello": {
          "entryPath": "${rootDir}/proj-one/temp/fixtures/proj-one/hello.js",
          "includeStats": true
        }
      },
      "packageName": "@fluentui/proj-one",
      "bundleRootPath": "${rootDir}/proj-one/temp/fixtures/build",
      "transpileToEs5": true
    });
    `,
    );
    expect(fixtureFile).toEqual(`import * as p from '../../../lib-dist/hello'; console.log(p)`);
    expect(bundleFile).toEqual(
      `!function(){\"use strict\";var e={d:function(o,t){for(var n in t)e.o(t,n)&&!e.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:t[n]})},o:function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},r:function(e){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})}},o={};function t(e,o=\"hello\"){return o+e+\"!!!\"}e.r(o),e.d(o,{greet:function(){return t}}),console.log(o)}();`,
    );
    expect(bundlesizeJSON).toEqual({ sizes: { 'fluentui-proj-one-hello': 484 } });
  });

  it(`should create bundlesizes.json merge`, async () => {
    const { projOneRoot, rootDir } = setup();
    const distPathForBundlesizesJson = path.join(rootDir, 'dist_reports');

    await bundleSizeAuditor({ rootDir: projOneRoot, reportPath: path.join(distPathForBundlesizesJson, 'proj-one') });
    await bundleSizeAuditor({ rootDir: projOneRoot, createReport: true, reportPath: distPathForBundlesizesJson });

    expect(JSON.parse(fs.readFileSync(path.join(distPathForBundlesizesJson, 'bundlesizes.json'), 'utf-8'))).toEqual({
      sizes: { 'fluentui-proj-one-hello': 484 },
    });
  });
});
