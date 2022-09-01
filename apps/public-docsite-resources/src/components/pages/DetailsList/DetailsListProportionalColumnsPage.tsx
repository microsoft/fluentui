import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListProportionalColumnsProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListProportionalColumnsPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListProportionalColumnsProps, ...props }} />
);
