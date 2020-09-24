import * as React from 'react';
import { AnnouncedSearchResultsPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/Announced/Announced.doc';
import { DemoPage } from '../../DemoPage';

export const AnnouncedSearchResultsPage = (props: { isHeaderVisible: boolean }) => (
  <div>
    <DemoPage {...{ ...AnnouncedSearchResultsPageProps, ...props }} />
  </div>
);
