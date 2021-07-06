import * as React from 'react';
import { AnnouncedBulkOperationsPageProps } from '@fluentui/react-examples/lib/react/Announced/Announced.doc';
import { DemoPage } from '../../DemoPage';

export const AnnouncedBulkOperationsPage = (props: { isHeaderVisible: boolean }) => (
  <div>
    <DemoPage {...{ ...AnnouncedBulkOperationsPageProps, ...props }} />
  </div>
);
