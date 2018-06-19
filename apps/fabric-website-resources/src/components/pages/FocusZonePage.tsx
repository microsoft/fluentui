import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { FocusZonePageProps } from 'office-ui-fabric-react/lib/components/FocusZone/FocusZone.doc';

export const FocusZonePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...FocusZonePageProps, ...props }} />
);
