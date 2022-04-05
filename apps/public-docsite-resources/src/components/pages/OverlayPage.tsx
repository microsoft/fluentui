import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { OverlayPageProps } from '@fluentui/react-examples/lib/react/Overlay/Overlay.doc';

export const OverlayPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Overlay.page.json')} {...{ ...OverlayPageProps, ...props }} />
);
