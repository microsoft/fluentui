import * as React from 'react';
import { ActivityItemPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/ActivityItem/ActivityItem.doc';
import { DemoPage } from '../DemoPage';

export const ActivityItemPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/ActivityItem.page.json')}
    {...{ ...ActivityItemPageProps, ...props }}
  />
);
