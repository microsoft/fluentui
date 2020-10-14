import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { FocusZonePageProps } from '@fluentui/react-examples/lib/react-focus/FocusZone/FocusZone.doc';

export const FocusZonePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react-focus/FocusZone.page.json')}
    {...{ ...FocusZonePageProps, ...props }}
  />
);
