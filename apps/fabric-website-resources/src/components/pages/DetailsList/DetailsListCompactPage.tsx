import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCompactPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListCompactPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCompactPageProps, ...props }} />
);
