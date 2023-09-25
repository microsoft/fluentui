import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { TreeChartPageProps } from '@fluentui/react-examples/lib/react-charting/TreeChart/TreeChart.doc';

export const TreeChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/TreeChart.page.json')}
    {...{ ...TreeChartPageProps, ...props }}
  />
);
