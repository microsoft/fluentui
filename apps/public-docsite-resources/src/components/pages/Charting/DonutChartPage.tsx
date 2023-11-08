import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { DonutChartPageProps } from '@fluentui/react-examples/lib/react-charting/DonutChart/DonutChart.doc';

export const DonutChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/DonutChart.page.json')}
    {...{ ...DonutChartPageProps, ...props }}
  />
);
