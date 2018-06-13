import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { FocusTrapZonePageProps } from 'office-ui-fabric-react/lib/components/FocusTrapZone/FocusTrapZone.doc';

export const FocusTrapZonePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...FocusTrapZonePageProps, ...props }} />
);
