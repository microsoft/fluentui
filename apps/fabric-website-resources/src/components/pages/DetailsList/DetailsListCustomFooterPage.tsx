import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCustomFooterPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListCustomFooterPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCustomFooterPageProps, ...props }} />
);
