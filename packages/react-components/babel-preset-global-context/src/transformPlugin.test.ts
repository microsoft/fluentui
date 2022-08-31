import pluginTester, { prettierFormatter } from 'babel-plugin-tester';
import * as path from 'path';

import { transformPlugin } from './transformPlugin';

const fixturesDir = path.join(__dirname, '..', '__fixtures__');

pluginTester({
  babelOptions: {
    parserOpts: {
      plugins: ['typescript'],
    },
  },
  pluginOptions: {
    babelOptions: {
      presets: ['@babel/typescript'],
    },
  },
  formatResult: code =>
    prettierFormatter(code, {
      config: {
        ...require('../../../../prettier.config.js'),
        parser: 'typescript',
      },
    }),

  fixtures: fixturesDir,
  // tests: [{
  //   only: true,
  //   fixture: path.resolve(fixturesDir, 'native-and-context-selector/code.ts'),
  //   outputFixture: path.resolve(fixturesDir, 'native-and-context-selector/output.ts'),
  // }],

  plugin: transformPlugin,
  pluginName: '@global-context/babel-transform',
});
