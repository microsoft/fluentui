import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { CalloutPageProps } from 'office-ui-fabric-react/lib/components/Callout/Callout.doc';

export const CalloutPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Callout.page.json')}
    {...{ ...CalloutPageProps, ...props }}
  />
);
