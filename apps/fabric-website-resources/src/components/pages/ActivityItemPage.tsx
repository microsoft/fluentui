import * as React from 'react';
import { ActivityItemPageProps } from 'office-ui-fabric-react/lib/components/ActivityItem/ActivityItem.doc';
import { DemoPage } from '../DemoPage';

export const ActivityItemPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...ActivityItemPageProps, ...props }} />
);
