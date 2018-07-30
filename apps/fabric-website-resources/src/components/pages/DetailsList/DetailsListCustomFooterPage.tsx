import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCustomFooterPageProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.doc';

export const DetailsListCustomFooterPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCustomFooterPageProps, ...props }} />
);
