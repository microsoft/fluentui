import * as React from 'react';
import { AnnouncedSearchResultsPageProps } from 'office-ui-fabric-react/lib/packages/react-fundamentals/components/Announced/Announced.doc';
import { DemoPage } from '../../DemoPage';

export const AnnouncedSearchResultsPage = (props: { isHeaderVisible: boolean }) => (
  <div>
    <DemoPage {...{ ...AnnouncedSearchResultsPageProps, ...props }} />
  </div>
);
