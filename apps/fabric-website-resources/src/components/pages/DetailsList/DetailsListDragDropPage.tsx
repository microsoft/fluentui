import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListDragDropPageProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.doc';

export const DetailsListDragDropPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListDragDropPageProps, ...props }} />
);
