// @ts-check
const { ESLintUtils } = require('@typescript-eslint/utils');
const path = require('path');
const rule = require('./index');

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.resolve(__dirname, './fixtures/ban-context-export/tsconfig.json'),
    tsconfigRootDir: path.resolve(__dirname, './fixtures/ban-context-export'),
  },
});

/**
 * @param {string} fixtureName
 */
function getParserOptions(fixtureName) {
  return {
    project: path.resolve(__dirname, `./fixtures/${fixtureName}/tsconfig.json`),
    tsconfigRootDir: path.resolve(__dirname, `./fixtures/${fixtureName}`),
  };
}

ruleTester.run('ban-context-export', rule, {
  valid: [
    {
      parserOptions: getParserOptions('internal-export'),
      code: `
          export { MyContext } from './context'
      `,
      filename: 'src/internal/index.ts',
    },
    {
      parserOptions: getParserOptions('not-a-context'),
      code: `
          export { MyContext } from './context'
      `,
      filename: 'src/index.ts',
    },
    {
      options: [{ exclude: ['**/special-path/**/*'] }],
      parserOptions: getParserOptions('exclude'),
      code: `
      import * as React from 'react';
      export const MyContext = React.createContext({});
      `,
      filename: 'special-path/src/index.ts',
    },
  ],
  invalid: [
    {
      errors: [{ messageId: 'nativeContext' }],
      parserOptions: getParserOptions('export-specifier'),
      code: `
          export { MyContext } from './context'
      `,
      filename: 'src/index.ts',
    },
    {
      errors: [{ messageId: 'contextSelector' }],
      parserOptions: getParserOptions('context-selector'),
      code: `
      export { MyContext } from './context'
      `,
      filename: 'src/index.ts',
    },
    {
      errors: [{ messageId: 'nativeContext' }],
      parserOptions: getParserOptions('named-export'),
      code: `
      import * as React from 'react';
      export const MyContext = React.createContext({});
      `,
      filename: 'src/index.ts',
    },
    {
      errors: [{ messageId: 'contextSelector' }],
      parserOptions: getParserOptions('named-export'),
      code: `
      import { createContext } from '@fluentui/react-context-selector';
      export const MyContext = createContext({});
      `,
      filename: 'src/index.ts',
    },
    {
      errors: [{ messageId: 'nativeContext' }],
      options: [{ exclude: ['**/wrong-path/**/*'] }],
      parserOptions: getParserOptions('exclude'),
      code: `
      import * as React from 'react';
      export const MyContext = React.createContext({});
      `,
      filename: 'special-path/src/index.ts',
    },
  ],
});
