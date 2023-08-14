import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { VerticalBarChartPageProps } from '@fluentui/react-examples/lib/react-charting/VerticalBarChart/VerticalBarChart.doc';

export const VerticalBarChartStandardPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/VerticalBarChart.page.json')}
    {...{ ...VerticalBarChartPageProps, ...props }}
  />
);
