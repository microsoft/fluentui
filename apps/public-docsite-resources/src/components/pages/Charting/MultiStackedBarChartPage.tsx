import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { MultiStackedBarChartPageProps } from '@fluentui/react-examples/lib/react-charting/MultiStackedBarChart/MultiStackedBarChart.doc';

export const MultiStackedBarChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/MultiStackedBarChart.page.json')}
    {...{ ...MultiStackedBarChartPageProps, ...props }}
  />
);
