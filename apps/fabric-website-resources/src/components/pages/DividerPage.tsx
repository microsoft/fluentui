import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { DividerPageProps } from 'office-ui-fabric-react/lib/packages/react-fundamentals/components/Divider/Divider.doc';

export const DividerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Divider.page.json')}
    {...{ ...DividerPageProps, ...props }}
  />
);
