import pluginTester, { prettierFormatter } from 'babel-plugin-tester';
import * as path from 'path';

import { plugin } from './plugin';

pluginTester({
  babelOptions: {
    parserOpts: {
      plugins: ['typescript'],
    },
  },

  fixtures: path.join(__dirname, '..', '__fixtures__'),
  plugin,

  formatResult: code =>
    prettierFormatter(code, {
      config: {
        ...require('../../../prettier.config.js'),
        parser: 'typescript',
        arrowParens: 'avoid',
      },
    }),
});
