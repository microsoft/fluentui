import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { ScrollablePanePageProps } from 'office-ui-fabric-react/lib/packages/react-fundamentals/components/ScrollablePane/ScrollablePane.doc';

export const ScrollablePanePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/ScrollablePane.page.json')}
    {...{ ...ScrollablePanePageProps, ...props }}
  />
);
