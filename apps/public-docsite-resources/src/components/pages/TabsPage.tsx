import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { TabsPageProps } from '@fluentui/react-examples/lib/react-tabs/Tabs/Tabs.doc';

export const TabsPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/Tabs.page.json')}
    {...{ ...TabsPageProps, ...props }}
  />
);
