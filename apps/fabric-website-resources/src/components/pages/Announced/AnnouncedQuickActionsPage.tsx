import * as React from 'react';
import { AnnouncedQuickActionsPageProps } from 'office-ui-fabric-react/lib/components/Announced/Announced.doc';
import { DemoPage } from '../../DemoPage';

export const AnnouncedQuickActionsPage = (props: { isHeaderVisible: boolean }) => (
  <div>
    <DemoPage {...{ ...AnnouncedQuickActionsPageProps, ...props }} />
  </div>
);
