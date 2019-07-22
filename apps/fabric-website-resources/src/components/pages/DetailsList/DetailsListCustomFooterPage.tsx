import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCustomFooterPageProps } from 'office-ui-fabric-react/lib/packages/react-data-views/components/DetailsList/DetailsList.doc';

export const DetailsListCustomFooterPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCustomFooterPageProps, ...props }} />
);
