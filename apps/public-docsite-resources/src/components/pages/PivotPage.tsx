import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { PivotPageProps } from '@fluentui/react-examples/lib/react/Pivot/Pivot.doc';

export const PivotPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/Pivot.page.json')}
    {...{ ...PivotPageProps, ...props }}
  />
);
