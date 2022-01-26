import pluginTester, { prettierFormatter } from 'babel-plugin-tester';
import * as path from 'path';

import { plugin } from './plugin';

const fixturesDir = path.join(__dirname, '..', '__fixtures__');

pluginTester({
  babelOptions: {
    parserOpts: {
      plugins: ['typescript'],
    },
  },
  formatResult: code =>
    prettierFormatter(code, {
      config: {
        ...require('../../../prettier.config.js'),
        parser: 'typescript',
      },
    }),

  fixtures: fixturesDir,
  tests: [
    {
      title: 'errors: throws on invalid argument type',
      fixture: path.resolve(fixturesDir, 'error-argument-type', 'fixture.js'),
      error: /function accepts only an object as a param/,
    },
    {
      title: 'errors: throws on invalid argument count',
      fixture: path.resolve(fixturesDir, 'error-argument-count', 'fixture.js'),
      error: /function accepts only a single param/,
    },
    {
      title: 'errors: throws on invalid config',
      fixture: path.resolve(fixturesDir, 'error-config-babel-options', 'fixture.ts'),
      pluginOptions: {
        babelOptions: {
          plugins: {},
        },
      },
      error: /Validation failed for passed config/,
    },
  ],

  plugin,
  pluginName: '@fluentui/babel-make-styles',
});
