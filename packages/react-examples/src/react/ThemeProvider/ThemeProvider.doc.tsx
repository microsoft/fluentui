import * as React from 'react';
import { ThemeProviderBasicExample } from './ThemeProvider.Basic.Example';
import { ThemeProviderNestedExample } from './ThemeProvider.Nested.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

const ThemeProviderBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ThemeProvider/ThemeProvider.Basic.Example.tsx') as string;
const ThemeProviderNestedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ThemeProvider/ThemeProvider.Nested.Example.tsx') as string;

export const ThemeProviderPageProps: IDocPageProps = {
  title: 'ThemeProvider',
  componentName: 'ThemeProvider',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/ThemeProvider',
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
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ThemeProvider/docs/ThemeProviderOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/ThemeProvider/docs/ThemeProviderBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
