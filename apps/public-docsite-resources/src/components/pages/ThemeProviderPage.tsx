import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ThemeProviderPageProps } from '@fluentui/react-examples/lib/react-theme-provider/ThemeProvider/ThemeProvider.doc';

export const ThemeProviderPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/references/ThemeProvider.page.json')}
    {...{ ...ThemeProviderPageProps, ...props }}
  />
);
