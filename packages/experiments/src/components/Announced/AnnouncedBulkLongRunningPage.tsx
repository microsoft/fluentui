import * as React from 'react';
import { DemoPage } from '../../../../../apps/fabric-website-resources/src/components/DemoPage';
import { AnnouncedBulkLongRunningPageProps } from '@uifabric/experiments/lib/components/Announced/Announced.doc';

export const AnnouncedBulkLongRunningPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...AnnouncedBulkLongRunningPageProps, ...props }} />
);