import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListShimmerPageProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.doc';

export const DetailsListShimmerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListShimmerPageProps, ...props }} />
);
