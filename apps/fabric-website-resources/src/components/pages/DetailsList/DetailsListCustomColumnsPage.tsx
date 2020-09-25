import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCustomColumnsPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListCustomColumnsPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCustomColumnsPageProps, ...props }} />
);
