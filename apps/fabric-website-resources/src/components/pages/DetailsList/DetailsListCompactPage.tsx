import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListCompactPageProps } from 'office-ui-fabric-react/lib/packages/react-data-views/components/DetailsList/DetailsList.doc';

export const DetailsListCompactPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListCompactPageProps, ...props }} />
);
