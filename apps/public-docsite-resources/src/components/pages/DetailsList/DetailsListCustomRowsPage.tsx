import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCustomRowsPageProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListCustomRowsPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCustomRowsPageProps, ...props }} />
);
