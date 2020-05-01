import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { ProgressIndicatorPageProps } from 'office-ui-fabric-react/lib/components/ProgressIndicator/ProgressIndicator.doc';

export const ProgressIndicatorPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/ProgressIndicator.page.json')}
    {...{ ...ProgressIndicatorPageProps, ...props }}
  />
);
