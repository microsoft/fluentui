import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListShimmerPageProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListShimmerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListShimmerPageProps, ...props }} />
);
