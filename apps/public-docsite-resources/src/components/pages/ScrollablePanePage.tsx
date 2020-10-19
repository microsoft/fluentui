import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { ScrollablePanePageProps } from '@fluentui/react-examples/lib/react/ScrollablePane/ScrollablePane.doc';

export const ScrollablePanePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/ScrollablePane.page.json')}
    {...{ ...ScrollablePanePageProps, ...props }}
  />
);
