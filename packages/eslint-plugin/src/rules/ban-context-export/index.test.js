// @ts-check
const { RuleTester } = require('@typescript-eslint/rule-tester');
const path = require('path');
const rule = require('./index');

const ruleTester = new RuleTester();

/**
 * @param {string} fixtureName
 */
function getLanguageOptions(fixtureName) {
  return {
    parserOptions: {
      parser: '@typescript-eslint/parser',
      project: path.resolve(__dirname, `./fixtures/${fixtureName}/tsconfig.json`),
      tsconfigRootDir: path.resolve(__dirname, `./fixtures/${fixtureName}`),
    },
  };
}

ruleTester.run('ban-context-export', rule, {
  valid: [
    {
      languageOptions: getParserOptions('internal-export'),
      code: `
          export { MyContext } from './context'
      `,
      filename: 'src/internal/index.ts',
    },
    {
      languageOptions: getParserOptions('not-a-context'),
      code: `
          export { MyContext } from './context'
      `,
      filename: 'src/index.ts',
    },
    {
      options: [{ exclude: ['**/special-path/**/*'] }],
      languageOptions: getParserOptions('exclude'),
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
      languageOptions: getParserOptions('export-specifier'),
      code: `
          export { MyContext } from './context'
      `,
      filename: 'src/index.ts',
    },
    {
      errors: [{ messageId: 'contextSelector' }],
      languageOptions: getParserOptions('context-selector'),
      code: `
      export { MyContext } from './context'
      `,
      filename: 'src/index.ts',
    },
    {
      errors: [{ messageId: 'nativeContext' }],
      languageOptions: getParserOptions('named-export'),
      code: `
      import * as React from 'react';
      export const MyContext = React.createContext({});
      `,
      filename: 'src/index.ts',
    },
    {
      errors: [{ messageId: 'contextSelector' }],
      languageOptions: getParserOptions('named-export'),
      code: `
      import { createContext } from '@proj/react-context-selector';
      export const MyContext = createContext({});
      `,
      filename: 'src/index.ts',
    },
    {
      errors: [{ messageId: 'nativeContext' }],
      options: [{ exclude: ['**/wrong-path/**/*'] }],
      languageOptions: getParserOptions('exclude'),
      code: `
      import * as React from 'react';
      export const MyContext = React.createContext({});
      `,
      filename: 'special-path/src/index.ts',
    },
  ],
});
