import * as React from 'react';
import { ActivityItemPageProps } from '@fluentui/react-examples/lib/react/ActivityItem/ActivityItem.doc';
import { DemoPage } from '../DemoPage';

export const ActivityItemPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/ActivityItem.page.json')}
    {...{ ...ActivityItemPageProps, ...props }}
  />
);
