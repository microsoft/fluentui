import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListSimpleGroupedPageProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.doc';

export const DetailsListSimpleGroupedPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListSimpleGroupedPageProps, ...props }} />
);
