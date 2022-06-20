// @ts-nocheck
const { ESLintUtils } = require('@typescript-eslint/experimental-utils');
const rule = require('./index');

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-restricted-imports', rule, {
  valid: [
    {
      code: `
        import { webLightTheme } from '@fluentui/react-components';
      `,
      options: [
        {
          paths: [
            {
              forbidden: ['@fluentui/react-theme'],
            },
          ],
        },
      ],
    },
    {
      code: `
        import { webDarkTheme } from '@fluentui/react-components';
      `,
      options: [
        {
          paths: [
            {
              forbidden: ['@fluentui/react-theme'],
              preferred: '@fluentui/react-components',
            },
          ],
        },
      ],
    },
    {
      code: `
        import type { TypographyStyle } from '@fluentui/react-components';
      `,
      options: [
        {
          paths: [
            {
              forbidden: ['@fluentui/react-theme'],
              preferred: '@fluentui/react-components',
            },
          ],
        },
      ],
    },
    {
      code: `
        import type { TypographyStyle, SpinnerProps } from '@fluentui/react-components';
        import { makeStyles } from '@fluentui/react-components';
      `,
      options: [
        {
          paths: [
            {
              forbidden: ['@fluentui/react-theme', '@fluentui/react-spinner'],
              preferred: '@fluentui/react-components',
            },
            {
              forbidden: ['@griffel/react'],
              preferred: '@fluentui/react-components',
            },
          ],
        },
      ],
    },
  ],
  invalid: [
    {
      code: `
        import { webDarkTheme } from '@fluentui/react-theme';
      `,
      errors: [{ messageId: 'restrictedImport' }],
      options: [
        {
          paths: [
            {
              forbidden: ['@fluentui/react-theme'],
            },
          ],
        },
      ],
    },
    {
      code: `
        import { webDarkTheme } from '@fluentui/react-theme';
      `,
      errors: [{ messageId: 'restrictedImport' }],
      options: [
        {
          paths: [
            {
              forbidden: ['@fluentui/react-theme'],
              preferred: '@fluentui/react-components',
            },
          ],
        },
      ],
      output: `
        import { webDarkTheme } from '@fluentui/react-components';
      `,
    },
    {
      code: `
        import type { SpinnerProps, TypographyStyle } from '@fluentui/react-components';
        import { makeStyles } from '@griffel/react';
      `,
      errors: [{ messageId: 'restrictedImport' }],
      options: [
        {
          paths: [
            {
              forbidden: ['@fluentui/react-spinner', '@fluentui/react-theme'],
              preferred: '@fluentui/react-components',
            },
            {
              forbidden: ['@griffel/react'],
              preferred: '@fluentui/react-components',
            },
          ],
        },
      ],
      output: `
        import type { SpinnerProps, TypographyStyle } from '@fluentui/react-components';
        import { makeStyles } from '@fluentui/react-components';
      `,
    },
  ],
});
