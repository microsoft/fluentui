import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { AreaChartPageProps } from '@fluentui/react-examples/lib/react-charting/AreaChart/AreaChart.doc';

export const AreaChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/AreaChart.page.json')}
    {...{ ...AreaChartPageProps, ...props }}
  />
);
