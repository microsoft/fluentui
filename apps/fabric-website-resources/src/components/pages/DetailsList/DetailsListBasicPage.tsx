import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListBasicPageProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.doc';

export const DetailsListBasicPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListBasicPageProps, ...props }} />
);
