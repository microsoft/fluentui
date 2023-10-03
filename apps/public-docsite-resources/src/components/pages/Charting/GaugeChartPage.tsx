import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { GaugeChartPageProps } from '@fluentui/react-examples/lib/react-charting/GaugeChart/GaugeChart.doc';

export const GaugeChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/GaugeChart.page.json')}
    {...{ ...GaugeChartPageProps, ...props }}
  />
);
