import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListBasicPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListBasicPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListBasicPageProps, ...props }} />
);
