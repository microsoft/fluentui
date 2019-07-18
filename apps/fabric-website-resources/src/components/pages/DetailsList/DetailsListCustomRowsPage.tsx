import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCustomRowsPageProps } from 'office-ui-fabric-react/lib/packages/react-data-views/components/DetailsList/DetailsList.doc';

export const DetailsListCustomRowsPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCustomRowsPageProps, ...props }} />
);
