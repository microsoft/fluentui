import * as React from 'react';

import { DemoPage } from '../DemoPage';

import { MarqueeSelectionPageProps } from 'office-ui-fabric-react/lib/components/MarqueeSelection/MarqueeSelection.doc';

export const MarqueeSelectionPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/MarqueeSelection.page.json')}
    {...{ ...MarqueeSelectionPageProps, ...props }}
  />
);
