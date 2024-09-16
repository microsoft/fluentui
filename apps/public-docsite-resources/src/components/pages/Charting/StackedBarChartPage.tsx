import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { StackedBarChartPageProps } from '@fluentui/react-examples/lib/react-charting/StackedBarChart/StackedBarChart.doc';

export const StackedBarChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/StackedBarChart.page.json')}
    {...{ ...StackedBarChartPageProps, ...props }}
  />
);
