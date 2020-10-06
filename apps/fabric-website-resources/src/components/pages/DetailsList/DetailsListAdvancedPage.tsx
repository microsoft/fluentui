import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListAdvancedPageProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListAdvancedPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListAdvancedPageProps, ...props }} />
);
