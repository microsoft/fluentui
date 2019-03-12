import * as React from 'react';
import { AnnouncedPageProps } from 'office-ui-fabric-react/lib/components/Announced/Announced.doc';
import { DemoPage } from '../../DemoPage';

export const AnnouncedPage = (props: { isHeaderVisible: boolean }) => (
  <div>
    <DemoPage {...{ ...AnnouncedPageProps, ...props }} />
  </div>
);
