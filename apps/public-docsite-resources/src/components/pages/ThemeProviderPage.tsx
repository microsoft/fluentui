import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ThemeProviderPageProps } from '@fluentui/react-examples/lib/react/ThemeProvider/ThemeProvider.doc';

export const ThemeProviderPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/references/ThemeProvider.page.json')}
    {...{ ...ThemeProviderPageProps, ...props }}
  />
);
