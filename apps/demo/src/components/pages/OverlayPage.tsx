import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { OverlayPageProps } from 'office-ui-fabric-react/lib/components/Overlay/Overlay.doc';

export const OverlayPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...OverlayPageProps, ...props }} />;
