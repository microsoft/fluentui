import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCustomFooterPageProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListCustomFooterPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCustomFooterPageProps, ...props }} />
);
