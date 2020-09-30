import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListDragDropPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListDragDropPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListDragDropPageProps, ...props }} />
);
