import * as React from 'react';
import { AnnouncedBulkOperationsPageProps } from 'office-ui-fabric-react/lib/components/Announced/Announced.doc';
import { DemoPage } from '../../DemoPage';

export const AnnouncedBulkOperationsPage = (props: { isHeaderVisible: boolean }) => (
  <div>
    <DemoPage {...{ ...AnnouncedBulkOperationsPageProps, ...props }} />
  </div>
);
