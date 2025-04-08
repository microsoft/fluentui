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
      languageOptions: getLanguageOptions('internal-export'),
      code: `
          export { MyContext } from './context'
      `,
      filename: 'src/internal/index.ts',
    },
    {
      languageOptions: getLanguageOptions('not-a-context'),
      code: `
          export { MyContext } from './context'
      `,
      filename: 'src/index.ts',
    },
    {
      options: [{ exclude: ['**/special-path/**/*'] }],
      languageOptions: getLanguageOptions('exclude'),
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
      languageOptions: getLanguageOptions('export-specifier'),
      code: `
          export { MyContext } from './context'
      `,
      filename: 'src/index.ts',
    },
    {
      errors: [{ messageId: 'contextSelector' }],
      languageOptions: getLanguageOptions('context-selector'),
      code: `
      export { MyContext } from './context'
      `,
      filename: 'src/index.ts',
    },
    {
      errors: [{ messageId: 'nativeContext' }],
      languageOptions: getLanguageOptions('named-export'),
      code: `
      import * as React from 'react';
      export const MyContext = React.createContext({});
      `,
      filename: 'src/index.ts',
    },
    {
      errors: [{ messageId: 'contextSelector' }],
      languageOptions: getLanguageOptions('named-export'),
      code: `
      import { createContext } from '@proj/react-context-selector';
      export const MyContext = createContext({});
      `,
      filename: 'src/index.ts',
    },
    {
      errors: [{ messageId: 'nativeContext' }],
      options: [{ exclude: ['**/wrong-path/**/*'] }],
      languageOptions: getLanguageOptions('exclude'),
      code: `
      import * as React from 'react';
      export const MyContext = React.createContext({});
      `,
      filename: 'special-path/src/index.ts',
    },
  ],
});
