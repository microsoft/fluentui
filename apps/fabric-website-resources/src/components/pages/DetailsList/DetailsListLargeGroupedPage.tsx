import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListLargeGroupedPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListLargeGroupedPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListLargeGroupedPageProps, ...props }} />
);
