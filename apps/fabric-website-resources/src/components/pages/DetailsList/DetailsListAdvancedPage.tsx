import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListAdvancedPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListAdvancedPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListAdvancedPageProps, ...props }} />
);
