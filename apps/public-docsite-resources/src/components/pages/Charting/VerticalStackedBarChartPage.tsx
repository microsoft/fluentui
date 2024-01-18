import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { VerticalStackedBarChartPageProps } from '@fluentui/react-examples/lib/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.doc';

export const VerticalStackedBarChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/VerticalStackedBarChart.page.json')}
    {...{ ...VerticalStackedBarChartPageProps, ...props }}
  />
);
