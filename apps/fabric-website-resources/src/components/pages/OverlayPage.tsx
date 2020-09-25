import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { OverlayPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/Overlay/Overlay.doc';

export const OverlayPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Overlay.page.json')}
    {...{ ...OverlayPageProps, ...props }}
  />
);
