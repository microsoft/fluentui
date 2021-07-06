import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { FocusTrapZonePageProps } from '@fluentui/react-examples/lib/react/FocusTrapZone/FocusTrapZone.doc';

export const FocusTrapZonePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/FocusTrapZone.page.json')}
    {...{ ...FocusTrapZonePageProps, ...props }}
  />
);
