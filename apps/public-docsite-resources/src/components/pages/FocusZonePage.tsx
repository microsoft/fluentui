import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { FocusZonePageProps } from '@fluentui/react-examples/lib/react-focus/FocusZone/FocusZone.doc';

export const FocusZonePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/FocusZone.page.json')}
    {...{ ...FocusZonePageProps, ...props }}
  />
);
