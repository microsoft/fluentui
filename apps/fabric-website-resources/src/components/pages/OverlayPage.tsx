import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { OverlayPageProps } from 'office-ui-fabric-react/lib/packages/react-surfaces/components/Overlay/Overlay.doc';

export const OverlayPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Overlay.page.json')}
    {...{ ...OverlayPageProps, ...props }}
  />
);
