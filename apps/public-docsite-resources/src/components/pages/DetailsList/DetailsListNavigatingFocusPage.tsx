import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListNavigatingFocusPageProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListNavigatingFocusPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListNavigatingFocusPageProps, ...props }} />
);
