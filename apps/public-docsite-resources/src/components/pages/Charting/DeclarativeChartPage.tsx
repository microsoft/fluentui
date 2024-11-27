import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { DeclarativeChartPageProps } from '@fluentui/react-examples/lib/react-charting/DeclarativeChart/DeclarativeChart.doc';

export const DeclarativeChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/DeclarativeChart.page.json')}
    {...{ ...DeclarativeChartPageProps, ...props }}
  />
);
