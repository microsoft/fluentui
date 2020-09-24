import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { PivotPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/Pivot/Pivot.doc';

export const PivotPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Pivot.page.json')}
    {...{ ...PivotPageProps, ...props }}
  />
);
