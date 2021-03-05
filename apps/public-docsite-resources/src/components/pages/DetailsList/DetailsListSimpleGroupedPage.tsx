import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListSimpleGroupedPageProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListSimpleGroupedPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListSimpleGroupedPageProps, ...props }} />
);
