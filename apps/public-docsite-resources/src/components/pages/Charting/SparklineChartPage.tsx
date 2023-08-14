import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { SparklineChartPageProps } from '@fluentui/react-examples/lib/react-charting/SparklineChart/SparklineChart.doc';

export const SparklineChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/Sparkline.page.json')}
    {...{ ...SparklineChartPageProps, ...props }}
  />
);
