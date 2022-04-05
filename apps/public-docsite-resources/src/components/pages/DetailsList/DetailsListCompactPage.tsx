import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCompactPageProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListCompactPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCompactPageProps, ...props }} />
);
