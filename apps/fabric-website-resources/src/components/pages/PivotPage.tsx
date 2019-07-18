import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { PivotPageProps } from 'office-ui-fabric-react/lib/packages/react-fundamentals/components/Pivot/Pivot.doc';

export const PivotPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Pivot.page.json')}
    {...{ ...PivotPageProps, ...props }}
  />
);
