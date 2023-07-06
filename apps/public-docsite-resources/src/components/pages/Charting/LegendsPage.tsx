import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { LineChartPageProps } from '@fluentui/react-examples/lib/react-charting/LineChart/LineChart.doc';

export const LineChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/LineChart.page.json')}
    {...{ ...LineChartPageProps, ...props }}
  />
);
