import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCustomGroupHeadersPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListCustomGroupHeadersPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCustomGroupHeadersPageProps, ...props }} />
);
