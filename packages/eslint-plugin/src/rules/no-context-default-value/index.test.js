const { ESLintUtils } = require('@typescript-eslint/utils');
const rule = require('./index');

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-context-default-value', rule, {
  valid: [
    {
      code: `
        import {createContext as createContext1} from 'react'
        import {createContext as createContext2} from '@fluentui/react-context-selector'
        const context1 = createContext1();
        const context2 = createContext2();
      `,
      options: [
        {
          imports: ['react', '@fluentui/react-context-selector'],
        },
      ],
    },
    {
      code: `
        import {createContext as createContext1} from 'react'
        import {createContext as createContext2} from '@fluentui/react-context-selector'
        const context1 = createContext1(undefined);
        const context2 = createContext2(undefined);
      `,
      options: [
        {
          imports: ['react', '@fluentui/react-context-selector'],
        },
      ],
    },
    {
      code: `
        import * as React from 'react'
        import * as ContextSelector from '@fluentui/react-context-selector'
        const context1 = React.createContext(undefined);
        const context2 = ContextSelector.createContext(undefined);
      `,
      options: [
        {
          imports: ['react', '@fluentui/react-context-selector'],
        },
      ],
    },
    {
      code: `
        import React from 'react'
        import ContextSelector from '@fluentui/react-context-selector'
        const context1 = React.createContext(undefined);
        const context2 = ContextSelector.createContext(undefined);
      `,
      options: [
        {
          imports: ['react', '@fluentui/react-context-selector'],
        },
      ],
    },
  ],
  invalid: [
    {
      code: `
        import {createContext as createContext1} from 'react'
        import {createContext as createContext2} from '@fluentui/react-context-selector'
        const context1 = createContext1(null);
        const context2 = createContext2(null);
      `,
      options: [
        {
          imports: ['react', '@fluentui/react-context-selector'],
        },
      ],
      errors: [{ messageId: 'invalidDefaultValue' }, { messageId: 'invalidDefaultValue' }],
    },
    {
      code: `
        import {createContext as createContext1} from 'react'
        import {createContext as createContext2} from '@fluentui/react-context-selector'
        const context1 = createContext1({});
        const context2 = createContext2({});
      `,
      options: [
        {
          imports: ['react', '@fluentui/react-context-selector'],
        },
      ],
      errors: [{ messageId: 'invalidDefaultValue' }, { messageId: 'invalidDefaultValue' }],
    },
    {
      code: `
        import {createContext as createContext1} from 'react'
        import {createContext as createContext2} from '@fluentui/react-context-selector'
        const context1 = createContext1(defaultValue);
        const context2 = createContext2(defaultValue);
      `,
      options: [
        {
          imports: ['react', '@fluentui/react-context-selector'],
        },
      ],
      errors: [{ messageId: 'invalidDefaultValue' }, { messageId: 'invalidDefaultValue' }],
    },
    {
      code: `
        import * as React from 'react'
        import * as ContextSelector from '@fluentui/react-context-selector'
        const context1 = React.createContext(defaultValue);
        const context2 = ContextSelector.createContext(defaultValue);
      `,
      options: [
        {
          imports: ['react', '@fluentui/react-context-selector'],
        },
      ],
      errors: [{ messageId: 'invalidDefaultValue' }, { messageId: 'invalidDefaultValue' }],
    },
    {
      code: `
        import React from 'react'
        import ContextSelector from '@fluentui/react-context-selector'
        const context1 = React.createContext(defaultValue);
        const context2 = ContextSelector.createContext(defaultValue);
      `,
      options: [
        {
          imports: ['react', '@fluentui/react-context-selector'],
        },
      ],
      errors: [{ messageId: 'invalidDefaultValue' }, { messageId: 'invalidDefaultValue' }],
    },
  ],
});
