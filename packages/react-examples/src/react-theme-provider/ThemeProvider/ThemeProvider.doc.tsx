import * as React from 'react';
import { ThemeProviderBasicExample } from './ThemeProvider.Basic.Example';

import { IDocPageProps } from '@fluentui/react-internal/lib/common/DocPage.types';

const ThemeProviderBasicExampleCode = require('!raw-loader!@fluentui/react-examples/src/react-theme-provider/ThemeProvider/ThemeProvider.Basic.Example.tsx') as string;

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
