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
      title: 'errors: throws on invalid slot',
      fixture: path.resolve(fixturesDir, 'error-style-method', 'fixture.js'),
      error: /Object methods are not supported for defining styles/,
    },
    {
      title: 'errors: throws on invalid property',
      fixture: path.resolve(fixturesDir, 'error-style-property', 'fixture.js'),
      error: /Object methods are not supported for defining styles/,
    },
  ],

  plugin,
  pluginName: '@fluentui/babel-make-styles',
});
