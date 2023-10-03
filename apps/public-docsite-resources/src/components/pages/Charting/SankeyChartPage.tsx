import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { SankeyChartPageProps } from '@fluentui/react-examples/lib/react-charting/SankeyChart/SankeyChart.doc';

export const SankeyChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/SankeyChart.page.json')}
    {...{ ...SankeyChartPageProps, ...props }}
  />
);
