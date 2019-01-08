import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCustomHeaderPageProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.doc';

export const DetailsListCustomHeaderPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCustomHeaderPageProps, ...props }} />
);
