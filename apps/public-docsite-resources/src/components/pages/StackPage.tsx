import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { StackPageProps } from '@fluentui/react-examples/lib/react/Stack/Stack.doc';

export const StackPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Stack.page.json')}
    {...{ ...StackPageProps, ...props }}
  />
);
