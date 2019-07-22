import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCustomColumnsPageProps } from 'office-ui-fabric-react/lib/packages/react-data-views/components/DetailsList/DetailsList.doc';

export const DetailsListCustomColumnsPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCustomColumnsPageProps, ...props }} />
);
