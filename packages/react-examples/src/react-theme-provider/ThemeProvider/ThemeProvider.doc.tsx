import * as React from 'react';
import { ThemeProviderBasicExample } from './ThemeProvider.Basic.Example';
import { ThemeProviderNestedExample } from './ThemeProvider.Nested.Example';
import { ThemeProviderStylesheetExample } from './ThemeProvider.Stylesheet.Example';

import { IDocPageProps } from '@fluentui/react-internal/lib/common/DocPage.types';

const ThemeProviderBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-theme-provider/ThemeProvider/ThemeProvider.Basic.Example.tsx') as string;
const ThemeProviderNestedExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-theme-provider/ThemeProvider/ThemeProvider.Nested.Example.tsx') as string;
const ThemeProviderStylesheetExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-theme-provider/ThemeProvider/ThemeProvider.Stylesheet.Example.tsx') as string;

export const ThemeProviderPageProps: IDocPageProps = {
  title: 'ThemeProvider',
  componentName: 'ThemeProvider',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-theme-provider/src/ThemeProvider',
  examples: [
    {
      title: 'Basic ThemeProvider',
      code: ThemeProviderBasicExampleCode,
      view: <ThemeProviderBasicExample />,
    },
    {
      title: 'Nested ThemeProviders',
      code: ThemeProviderNestedExampleCode,
      view: <ThemeProviderNestedExample />,
    },
    {
      title: 'Registering stylesheets',
      code: ThemeProviderStylesheetExampleCode,
      view: <ThemeProviderStylesheetExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-theme-provider/ThemeProvider/docs/ThemeProviderOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/react-examples/src/react-theme-provider/ThemeProvider/docs/ThemeProviderBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
