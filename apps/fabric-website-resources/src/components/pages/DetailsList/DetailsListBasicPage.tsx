import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListBasicPageProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListBasicPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListBasicPageProps, ...props }} />
);
