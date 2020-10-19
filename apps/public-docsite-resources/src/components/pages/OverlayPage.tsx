import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { OverlayPageProps } from '@fluentui/react-examples/lib/react/Overlay/Overlay.doc';

export const OverlayPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Overlay.page.json')}
    {...{ ...OverlayPageProps, ...props }}
  />
);
