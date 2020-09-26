import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { FocusTrapZonePageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/FocusTrapZone/FocusTrapZone.doc';

export const FocusTrapZonePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/FocusTrapZone.page.json')}
    {...{ ...FocusTrapZonePageProps, ...props }}
  />
);
