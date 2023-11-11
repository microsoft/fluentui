import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { HorizontalBarChartPageProps } from '@fluentui/react-examples/lib/react-charting/HorizontalBarChart/HorizontalBarChart.doc';

export const HorizontalBarChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/HorizontalBarChart.page.json')}
    {...{ ...HorizontalBarChartPageProps, ...props }}
  />
);
