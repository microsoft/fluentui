import * as React from 'react';

import { DemoPage } from '../DemoPage';

import { PositioningContainerPageProps } from 'office-ui-fabric-react/lib/components/Coachmark/PositioningContainer/PositioningContainer.doc';

export const PositioningContainerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/PositioningContainer.page.json')}
    {...{ ...PositioningContainerPageProps, ...props }}
  />
);
