import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { HeatMapChartPageProps } from '@fluentui/react-examples/lib/react-charting/HeatMapChart/HeatMapChart.doc';

export const HeatMapChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/HeatMapChart.page.json')}
    {...{ ...HeatMapChartPageProps, ...props }}
  />
);
