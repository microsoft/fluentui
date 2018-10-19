import * as React from 'react';
import { DemoPage } from '../../../../../apps/fabric-website-resources/src/components/DemoPage';
import { AnnouncedBulkLongRunningPageProps } from './Announced.doc';

export const AnnouncedBulkLongRunningPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...AnnouncedBulkLongRunningPageProps, ...props }} />
);
