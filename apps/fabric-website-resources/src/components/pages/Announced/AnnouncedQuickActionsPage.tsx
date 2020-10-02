import * as React from 'react';
import { AnnouncedQuickActionsPageProps } from '@fluentui/react-examples/lib/react/Announced/Announced.doc';
import { DemoPage } from '../../DemoPage';

export const AnnouncedQuickActionsPage = (props: { isHeaderVisible: boolean }) => (
  <div>
    <DemoPage {...{ ...AnnouncedQuickActionsPageProps, ...props }} />
  </div>
);
