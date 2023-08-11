import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { PieChartPageProps } from '@fluentui/react-examples/lib/react-charting/PieChart/PieChart.doc';

export const PieChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/PieChart.page.json')}
    {...{ ...PieChartPageProps, ...props }}
  />
);
