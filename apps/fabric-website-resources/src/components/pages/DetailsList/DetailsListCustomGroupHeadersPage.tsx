import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCustomGroupHeadersPageProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.doc';

export const DetailsListCustomGroupHeadersPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCustomGroupHeadersPageProps, ...props }} />
);
